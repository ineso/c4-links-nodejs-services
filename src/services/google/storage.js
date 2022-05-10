// Copyright Carrefour(2021)
//
// https://googleapis.dev/nodejs/storage/latest/
//

const { Storage } = require('@google-cloud/storage')
const Stream = require('stream')
const Project = require('./project')

/** Class representing a Google Cloud Storage.
 * @extends Project
 */
class GCStorage extends Project {
  /**
   * Create a Storage.
   * @param {string} projectId - The GCP project identifier.
   * @param {string} bucketName - The name of the bucket to use.
   */
  constructor(projectId, bucketName) {
    super(projectId)
    this.bucketName = bucketName
    this.storage = new Storage({
      projectId: projectId,
    })
  }

  throwError (err) {
    if (!err) {
      return
    }
    let msg = err.toString()
    if (err.message && typeof err.message === 'string') {
      msg = err.message
    }
    throw new Error(`GCStorage(${this.projectId}, ${this.bucketName}): ${msg}`)
  }

  /**
   * List files in the bucket.
   * 
   * @async
   * @param {object} options - Query object for listing files.
   * @return {Promise<object[]>} The array of filenames.
   */
  async listFiles (options) {
    try {
      const bucket = this.storage.bucket(this.bucketName)
      const [files] = await bucket.getFiles(options)

      return files
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Download a file from the bucket.
   * 
   * @async
   * @param {string} fileName - The source filename.
   * @param {string} destFileName - The destination filename.
   */
  async downloadFile (fileName, destFileName) {
    try {
      const options = {
        destination: destFileName,
      }
      const bucket = this.storage.bucket(this.bucketName)

      await bucket.file(fileName).download(options)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Download the content of a file from the bucket.
   * 
   * @param {string} fileName - The source filename.
   * @return {Promise<string>} The content of the file.
   */
  async getFile (fileName) {
    let buffer = Buffer.from('')
    try {
      let bucket = this.storage.bucket(this.bucketName)
      let stream = bucket.file(fileName).createReadStream()
      const resp = await new Promise((resolve, reject) => {
        stream
          .on('error', (err) => {
            reject(err)
          })
          .on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk])
          })
          .on('end', () => {
            resolve(buffer)
          })
      })

      return resp
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Upload a file to the bucket.
   * 
   * @async
   * @param {string} fileName - The source filename.
   * @param {string} destFileName - The destination filename.
   */
  async uploadFile (filePath, destFileName) {
    try {
      const bucket = this.storage.bucket(this.bucketName)

      await bucket.upload(
        filePath,
        {
          destination: destFileName,
        })
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Upload the content of a file to the bucket.
   * 
   * @param {string} destFileName - The destination filename.
   * @param {string} data - The content data.
   */
  async putFile (destFileName, data) {
    try {
      const bucket = this.storage.bucket(this.bucketName)
      const file = bucket.file(destFileName)
      const stream = new Stream.PassThrough()
      stream.write(data)
      stream.end()

      const resp = await new Promise((resolve, reject) => {
        stream.pipe(file.createWriteStream())
          .on('error', (err) => {
            reject(err)
          })
          .on('finish', () => {
            resolve()
          })
      })

      return resp
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Delete a file in the bucket.
   * 
   * @async
   * @param {string} fileName - The filename to delete.
   */
  async deleteFile (fileName) {
    try {
      const bucket = this.storage.bucket(this.bucketName)
      await bucket.file(fileName).delete()
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Move a file in the bucket.
   * 
   * @async
   * @param {string} srcFileName - The source filename to move.
   * @param {string} destFileName - The destination filename.
   */
  async moveFile (srcFileName, destFileName) {
    try {
      const bucket = this.storage.bucket(this.bucketName)
      await bucket.file(srcFileName).move(destFileName)
    } catch (err) {
      this.throwError(err)
    }
  }
}

module.exports = GCStorage
