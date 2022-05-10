// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const _ = require('lodash')
const p = require('path')
const fs = require('fs-extra')

module.exports = class MockStorage {

  constructor(projectId, bucket, basedir) {
    this.projectId = projectId || ''
    this.bucket = bucket || ''
    this.basedir = basedir || p.join(__dirname, 'testdata')
  }

  /**
   * list files in the bucket.
   * 
   * @async
   * @param {object} options - Query object for listing files.
   * @return {Promise<object[]>} The array of filenames.
   */
  async listFiles (options) {
    // let delimiter = _.get(options, 'delimiter') || ''
    let prefix = _.get(options, 'prefix') || ''
    let path = p.join(this.basedir, prefix) + p.sep
    const files = await fs.readdir(path)
    let results = await Promise.all(_.map(files, (file) => {
      return fs.stat(`${path}${file}`).then((stat) => {
        return {
          metadata: {
            kind: 'storage#object',
            id: `${path}${file}`,
            name: `${prefix}${file}`,
            bucket: this.bucket,
            size: stat.size,
            timeCreated: stat.ctime.toISOString(),
            updated: stat.atime.toISOString(),
          },
          id: `${path}${file}`,
          name: `${prefix}${file}`
        }
      })
    }))
    return results
  }

  /**
   * download a file from the bucket.
   * 
   * @async
   * @param {string} fileName - The source filename.
   * @param {string} destFileName - The destination filename.
   */
  async downloadFile (fileName, destFileName) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  /**
   * download the content of a file from the bucket.
   * 
   * @async
   * @param {string} fileName - The source filename.
   * @return {Promise<string>} The content of the file.
   */
  async getFile (fileName) {
    const resp = await new Promise((resolve, reject) => {
      fs.readFile(
        p.join(this.basedir, fileName),
        'utf8',
        (err, data) => {
          if (err) {
            reject(new Error(`Load file '${fileName}': ${err.message}`))
          }
          resolve(data)
        })
    })

    return resp
  }

  /**
   * upload a file to the bucket.
   * 
   * @async
   * @param {string} fileName - The source filename.
   * @param {string} destFileName - The destination filename.
   */
  async uploadFile (filePath, destFileName) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  /**
   * upload the content of a file to the bucket.
   * 
   * @async
   * @param {string} destFileName - The destination filename.
   * @param {string} data - The content data.
   */
  async putFile (destFileName, data) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  /**
   * delete a file in the bucket.
   * 
   * @async
   * @param {string} fileName - The filename to delete.
   */
  async deleteFile (fileName) {
    await new Promise((resolve) => {
      console.log(`MockStorage: delete '${fileName}'`)
      resolve()
    })
  }

  /**
   * move a file in the bucket.
   * 
   * @async
   * @param {string} srcFileName - The source filename to move.
   * @param {string} destFileName - The destination filename.
   */
  async moveFile (srcFileName, destFileName) {
    await new Promise((resolve) => {
      console.log(`MockStorage: move '${srcFileName}' to '${destFileName}'`)
      resolve()
    })
  }
}
