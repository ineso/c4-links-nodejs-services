// Copyright Carrefour(2021)
//

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
const Project = require('./project')

/** Class representing a Google Cloud Secret Manager. 
 * @extends Project
 */
class GCSecretManager extends Project {
  /**
   * Create a Logger.
   * @param {string} id - The GCP project identifier.
   */
  constructor(projectId) {
    super(projectId)
    this.client = new SecretManagerServiceClient()
  }

  throwError (err) {
    if (!err) {
      return
    }
    let msg = err.toString()
    if (err.message && typeof err.message === 'string') {
      msg = err.message
    }
    throw new Error(`GCSecretManager(${this.projectId}): ${msg}`)
  }

  /**
   * Add a secret.
   * 
   * @async
   * @param {string} secretId the secret ID.
   */
  async addSecret (secretId) {
    try {
      const [secret] = await this.client.createSecret({
        parent: 'projects/' + this.projectId,
        secretId: secretId,
        secret: {
          replication: {
            automatic: {},
          },
        },
      })

      return secret
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Delete a secretId.
   * 
   * @async
   * @param {string} secretId the secret ID.
   */
  async deleteSecret (secretId) {
    try {
      await this.client.deleteSecret({
        name: 'projects/' + this.projectId +
          '/secrets/' + secretId,
      })
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * List all secrets.
   * 
   * @async
   * @return {Promise<google.cloud.secretmanager.v1.ISecret[]>} list of secrets
   */
  async listSecrets () {
    try {
      const [secrets] = await this.client.listSecrets({
        parent: 'projects/' + this.projectId,
      })

      return secrets
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get secret details.
   * 
   * @async
   * @param {string} secretId the secret ID.
   * @return {Promise<google.cloud.secretmanager.v1.ISecret>} the secret
   */
  async getSecret (secretId) {
    try {
      const [secret] = await this.client.getSecret({
        name: 'projects/' + this.projectId +
          '/secrets/' + secretId,
      })

      return secret
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get secret value for a given version.
   * 
   * @async
   * @param {string} secretId the secret ID.
   * @param {string} version the version default is 'latest'.
   * @return {Promise<string>} payload.
   */
  async getSecretValue (secretId, version = 'latest') {
    try {
      const [ver] = await this.client.accessSecretVersion({
        name: 'projects/' + this.projectId +
          '/secrets/' + secretId
          + '/versions/' + version,

      })
      const payload = ver.payload.data.toString()

      return payload
    } catch (err) {
      this.throwError(err)
    }
  }
}

module.exports = GCSecretManager
