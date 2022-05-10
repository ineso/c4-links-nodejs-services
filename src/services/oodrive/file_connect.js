// Copyright Carrefour(2021)
//
// https://github.com/oodrive/front-technical-test
//

const _ = require('lodash')
const p = require('path')
const fs = require('fs-extra')
const got = require('got')

/** 
 * Class representing a FileConnect to the OODrive API.
 */
class FileConnect {

  constructor(config) {
    this.host = _.get(config, 'host', '127.0.0.1')
    this.workspace = _.get(config, 'workspace', '')
    this.clientId = _.get(config, 'clientId', '')
    this.clientSecret = _.get(config, 'clientSecret', '')
    this.username = _.get(config, 'username', 'api')
    this.password = _.get(config, 'password', '')
    this.timeout = _.get(config, 'timeout', 15000) // 15 seconds
    this.retries = _.get(config, 'retries', 0)
    this.protocol = 'https'
    this.apiVersion = 'v1'
    this.AccessToken = null
    this.ExpiresAt = 0
  }

  throwError (err) {
    if (!err) {
      return
    }
    let msg = _.get(err, 'response.body.message') || err.message || err.toString()
    throw new Error(`FileConnect(${this.workspace}, ${this.host}): ${msg}`)
  }

  options () {
    return {
      timeout: this.timeout,
      retries: this.retries,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.AccessToken}`
      }
    }
  }

  url (endpoint) {
    return `${this.protocol}://${this.host}/share/api/${this.apiVersion}/${endpoint}`
  }

  async get (endpoint) {
    try {
      let response = await got(this.url(endpoint), this.options())
      return response.body
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Present client credentials to obtain an authorization token.
   * 
   * @async
   */
  async login () {
    try {
      if (this.AccessToken !== null && (Date.now() / 1000) < this.ExpiresAt) {
        return
      }
      const response = await got.post(
        `${this.protocol}://${this.host}/auth/oauth/token?` +
        `workspace=${encodeURIComponent(this.workspace)}`,
        {
          headers: {
            Authorization: 'Basic ' + Buffer.from([
              this.clientId,
              this.clientSecret
            ].join(':')).toString('base64')
          },
          form: {
            username: this.username,
            password: this.password,
            grant_type: 'password'
          },
          responseType: 'json'
        })
      let accessToken = _.get(response, 'body.access_token')
      if (!accessToken) {
        throw new Error(`FileConnect(${this.workspace}): Failed to retrieve Access Token`)
      }
      let expiresIn = _.get(response, 'body.expires_in')
      if (!expiresIn) {
        throw new Error(`FileConnect(${this.workspace}): Failed to retrieve Expires In`)
      }
      this.AccessToken = accessToken
      this.ExpiresAt = (Date.now() / 1000) + expiresIn - 30
    } catch (err) {
      this.AccessToken = null
      this.ExpiresAt = 0
      this.throwError(err)
    }
  }

  /**
   * Logout of the API and invalidate the current access token.
   * 
   * @async
   */
  async logout () {
    try {
      await got.delete('logout', this.options())
      this.AccessToken = null
      this.ExpiresAt = 0
    } catch (err) {
      // Ignore error
    }
  }

  /**
   * Get information about all files in a specified folder Id.
   * 
   * @async
   * @param {string} parentId - The parent identifier.
   * @return {Promise<Object>} The files information and descriptions.
   */
  async getFiles (parentId) {
    let entry = 'items?type=ROOTS'
    if (parentId) {
      entry = `items/${encodeURIComponent(parentId)}/children`
    }
    let response = await this.get(entry)
    return JSON.parse(response)
  }

  /**
   * Get the Root folder Identifier.
   * 
   * @async
   * @return {Promise<string>} The Root Identifier.
   */
  async getRootFolderId () {
    const data = await this.getFiles()
    const id = (_.find(
      _.get(data, ['$collection'], []),
      { name: 'Fichiers' }) || {}
    ).id
    return id
  }

  /**
   * Get the file informations for the given Id.
   * 
   * @async
   * @param {string} itemId - The item identifier.
   * @return {Promise<Object>} The item information.
   */
  async getFile (itemId) {
    let response = await this.get(`items/${encodeURIComponent(itemId)}`)
    return JSON.parse(response)
  }

  /**
   * Create and upload a file.
   * 
   * @async
   * @param {string} localPath - The path to the local file to upload.
   * @param {string} remotePath - The remote path to create or overwrite.
   */
  async uploadFile (localPath, remotePath) {
    const pathPath = remotePath.split(p.sep)
    const filename = _.last(pathPath)
    const rootFolderId = await this.getRootFolderId()

    if (!fs.existsSync(localPath)) {
      this.throwError(`Local file '${localPath}' does not exist`)
    }
    const stat = await fs.stat(localPath)
    let fileId
    try {
      const file = await got.post(this.url(`items/${rootFolderId}`),
        {
          ...this.options(),
          responseType: 'json',
          json: {
            name: filename,
            isDir: false,
            path: _.initial(pathPath).join(p.sep)
          }
        })
      fileId = _.last(_.get(file, ['body', '$collection'])).id
    } catch (err) {
      this.throwError(err)
    }
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(localPath)
      const req = got.stream.put(this.url(`io/items/${fileId}`), {
        headers: {
          Authorization: `Bearer ${this.AccessToken}`,
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment;filename=${filename}`,
          'Content-Length': stat.size
        },
        timeout: this.timeout,
        retries: this.retries,
        responseType: 'json'
      })
        .on('response', resp => {
          resolve()
        })
        .on('error', err => {
          stream.close()
          reject(err)
        })
      stream.pipe(req)
    })
  }

  /**
   * Download the content of a file.
   * 
   * @async
   * @param {string} itemId - The item identifier.
   * @return {Promise<string>} The downloaded content of the file.
   */
  async downloadFile (itemId) {
    let url = `${this.protocol}://${this.host}/share/api/items/${encodeURIComponent(itemId)}`
    try {
      let response = await got.get(url,
        {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${this.AccessToken}`
          },
          timeout: this.timeout,
          retries: this.retries
        }
      )
      return response.body
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Delete a file.
   * 
   * @async
   * @param {string} itemId - The item identifier.
   */
  async deleteFile (itemId) {
    try {
      await got.delete(
        this.url(`items/${encodeURIComponent(itemId)}`),
        this.options()
      )
    } catch (err) {
      this.throwError(err)
    }
  }
}

module.exports = FileConnect
