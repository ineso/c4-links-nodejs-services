// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const fs = require('fs-extra')
const p = require('path')

module.exports = class MockFileConnect {

  constructor(basedir) {
    this.basedir = basedir || `${__dirname}/testdata`
    this.logged = false
    this.currentId = 1
    this.data = new Map()
  }

  /**
   * Present client credentials to obtain an authorization token.
   * 
   * @async
   */
  async login () {
    const resp = await new Promise((resolve) => {
      console.log(`MockFileConnect: login`)
      this.logged = true
      resolve()
    })

    return resp
  }

  /**
   * Logout of the API and invalidate the current access token.
   * 
   * @async
   */
  async logout () {
    const resp = await new Promise((resolve) => {
      console.log(`MockFileConnect: logout`)
      this.logged = false
      resolve()
    })

    return resp
  }

  /**
   * Get information about all files in a specified folder Id.
   * 
   * @async
   * @param {string} parentId - The parent identifier.
   * @return {Promise<Object>} The files information and descriptions.
   */
  async getFiles (parentId) {
    const resp = await new Promise((resolve, reject) => {
      console.log(`MockFileConnect: getFiles(${parentId})`)
      if (!this.logged) {
        reject(new Error('not logged'))
      }
      resolve([...this.data.values()])
    })

    return resp
  }

  /**
   * Get the Root folder Identifier.
   * 
   * @async
   * @return {Promise<string>} The Root Identifier.
   */
  async getRootFolderId () {
    const resp = await new Promise((resolve, reject) => {
      if (!this.logged) {
        reject(new Error('not logged'))
      }
      resolve('tfVFl2p55EU')
    })

    return resp
  }

  /**
   * Get the file informations for the given Id.
   * 
   * @async
   * @param {string} itemId - The item identifier.
   * @return {Promise<Object>} The item information.
   */
  async getFile (itemId) {
    const resp = await new Promise((resolve, reject) => {
      console.log(`MockFileConnect: getFile(${itemId})`)
      if (!this.logged) {
        reject(new Error('not logged'))
      }
      if (!this.data.has(itemId)) {
        reject(new Error(`Cannot find item ${itemId}`))
      }
      resolve(this.data.get(itemId).data.toString())
    })

    return resp
  }

  /**
   * Create and upload a file.
   * 
   * @async
   * @param {string} localPath - The path to the local file to upload.
   * @param {string} remotePath - The remote path to create or overwrite.
   */
  async uploadFile (localPath, remotePath) {
    const resp = await new Promise((resolve, reject) => {
      console.log(`MockFileConnect: uploadFile(${localPath}, ${remotePath})`)
      if (!this.logged) {
        reject(new Error('not logged'))
      }
      fs.stat(`${localPath}`).then((stat) => {

        fs.readFile(localPath, (err, data) => {
          if (err) {
            throw err
          }
          const id = this.currentId++
          this.data.set(id, {
            id: id,
            name: p.basename(remotePath),
            creationDate: stat.ctime.toISOString(),
            lastModificationDate: stat.atime.toISOString(),
            path: remotePath,
            data: data,
            isMine: true,
            isDir: false,
            isInfected: false,
            isFavorite: false,
            isComplete: true
          })
          resolve()
        })
      })
    })

    return resp
  }

  /**
   * Download the content of a file.
   * 
   * @async
   * @param {string} itemId - The item identifier.
   * @return {Promise<string>} The downloaded content of the file.
   */
  async downloadFile (itemId) {
    const resp = await Promise((resolve, reject) => {
      console.log(`MockFileConnect: downloadFile(${itemId})`)
      if (!this.logged) {
        reject(new Error('not logged'))
      }
      if (!this.data.has(itemId)) {
        reject(new Error(`Cannot find item ${itemId}`))
      }
      resolve(this.data.get(itemId).data.toString())
    })

    return resp
  }

  /**
   * Delete a file.
   * 
   * @async
   * @param {string} itemId - The item identifier.
   */
  async deleteFile (itemId) {
    const resp = await new Promise((resolve, reject) => {
      console.log(`MockFileConnect: deleteFile(${itemId})`)
      if (!this.logged) {
        reject(new Error('not logged'))
      }
      if (!this.data.has(itemId)) {
        reject(new Error(`Cannot find item ${itemId}`))
      }
      this.data.delete(itemId)
      resolve()
    })

    return resp
  }
}
