// Copyright Carrefour(2021)
//

const keyv = require('keyv')
const GCStorage = require("./storage")

/** Class representing a Cached Google Cloud Storage.
 * @extends Project
 */
class GCCachedStorage extends GCStorage {
  /**
   * Create a Cached Storage.
   * 
   * @param {string} projectId - The GCP project identifier.
   * @param {string} bucketName - The name of the bucket to use.
   * @param {string} ttl - Time to live in milliseconds.
   */
  constructor(projectId, bucketName, ttl) {
    super(projectId, bucketName)
    this.cache = new keyv()
    this.ttl = ttl
  }

  /**
   * List files in the bucket.
   * 
   * @param {string} fileName - The source filename.
   * @return {Promise<string>} The content of the file.
   */
  async getFile (fileName) {
    try {
      const cached = await this.cache.get(fileName)
      if (cached) {
        return cached
      }
      const data = await super.getFile(fileName)
      await this.cache.set(fileName, data, this.ttl)

      return data
    } catch (err) {
      this.throwError(err)
    }
  }
}

module.exports = GCCachedStorage
