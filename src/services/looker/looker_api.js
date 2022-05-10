// Copyright Carrefour(2021)
//
// https://docs.looker.com/reference/api-and-integration/api-reference/v4.0

const _ = require('lodash')
const keyv = require('keyv')
const got = require('got')

/** 
 * Class representing a Looker API.
 */
class LookerAPI {

  constructor(config) {
    this.instanceId = _.get(config, 'instanceId', '')
    this.host = _.get(config, 'host', '127.0.0.1')
    this.clientId = _.get(config, 'clientId', '')
    this.clientSecret = _.get(config, 'clientSecret', '')
    this.embedHost = _.get(config, 'embedHost', '127.0.0.1')
    this.embedSecret = _.get(config, 'embedSecret', '')
    this.signWithEndpoint = _.get(config, 'signWithEndpoint', false)
    this.timeout = _.get(config, 'timeout', 60000)  // 60 seconds
    this.retries = _.get(config, 'retries', 0)
    this.pingUrl = _.get(config, 'pingUrl', 'looks/163')
    this.defaultUserId = _.get(config, 'defaultUserId', 79)
    this.protocol = 'https'
    this.apiVersion = '4.0'
    this.userAgent = 'C4 Links'
    this.accessToken = null
    this.tokenType = null
    this.expiresAt = 0
    this.sessionDuration = 86400
    this.users = new keyv()
    this.sessions = new keyv()
  }

  throwError (err) {
    if (!err) {
      return
    }
    let msg = _.get(err, 'response.body.message') || err.message || err.toString()
    throw new Error(`LookerAPI(${this.instanceId}, ${this.host}): ${msg}`)
  }

  stringifyParameters (params) {
    const result = []
    for (const key in params) {
      const param = params[key]
      if (Array.isArray(param)) {
        result.push(`${key}=${encodeURIComponent(param.join(','))}`)
      } else if (
        typeof param === 'string' ||
        typeof param === 'boolean' ||
        typeof param === 'number'
      ) {
        result.push(`${key}=${encodeURIComponent(param)}`)
      }
    }
    return result.join('&')
  }

  options () {
    return {
      timeout: this.timeout,
      retries: this.retries,
      headers: {
        Accept: 'application/json',
        Authorization: `token ${this.accessToken}`,
        UserAgent: this.userAgent
      }
    }
  }

  url (endpoint) {
    return `${this.protocol}://${this.host}/api/${this.apiVersion}/${endpoint}`
  }

  async get (endpoint) {
    try {
      let response = await got(this.url(endpoint), this.options())
      return response.body
    } catch (err) {
      this.throwError(err)
    }
  }

  async post (endpoint, post) {
    try {
      let response = await got.post(this.url(endpoint), post)
      return response.body
    } catch (err) {
      this.throwError(err)
    }
  }

  async patch (endpoint, post) {
    try {
      let response = await got.patch(this.url(endpoint), post)
      return response.body
    } catch (err) {
      this.throwError(err)
    }
  }

  async delete (endpoint, post) {
    try {
      let response = await got.delete(this.url(endpoint), post)
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
      const now = Date.now() / 1000
      if (this.accessToken !== null && now < this.expiresAt) {
        return
      }
      const response = await got.post(this.url('login'),
        {
          form:
          {
            client_id: this.clientId,
            client_secret: this.clientSecret
          },
          responseType: 'json'
        }
      )

      let accessToken = _.get(response, 'body.access_token')
      if (!accessToken) {
        throw new Error(`LookerAPI(${this.instanceId}): Failed to retrieve Access Token`)
      }
      let expiresIn = _.get(response, 'body.expires_in')
      if (!expiresIn) {
        throw new Error(`LookerAPI(${this.instanceId}): Failed to retrieve Expires In`)
      }
      this.accessToken = accessToken
      this.tokenType = _.get(response, 'body.token_type')
      this.expiresAt = now + expiresIn - 60
    } catch (err) {
      this.accessToken = null
      this.tokenType = null
      this.expiresAt = 0
      this.throwError(err)
    }
  }

  /**
   * Create a cloned session for the given user Id.
   * 
   * @async
   * @param {string} user_id - Id of user.
   * @return {Promise<LookerAPI>} The newly created LookerAPI object session.
   */
  async loginAsUser (user_id) {
    try {
      const now = Date.now() / 1000
      const clone = Object.create(this)

      const cached = await this.sessions.get(user_id)
      if (cached && cached.accessToken !== null && now < cached.expiresAt) {
        clone.accessToken = cached.accessToken
        clone.expiresAt = cached.expiresAt
        return clone
      }

      const response = await got.post(this.url(`login/${user_id}`),
        {
          ...this.options(),
          responseType: 'json'
        })
      let accessToken = _.get(response, 'body.access_token')
      if (!accessToken) {
        throw new Error(`LookerAPI(${this.instanceId}): Failed to retrieve Access Token`)
      }
      let expiresIn = _.get(response, 'body.expires_in')
      if (!expiresIn) {
        throw new Error(`LookerAPI(${this.instanceId}): Failed to retrieve Expires In`)
      }
      clone.accessToken = accessToken
      clone.tokenType = _.get(response, 'body.token_type')
      clone.expiresAt = now + expiresIn - 60

      await this.sessions.set(user_id,
        {
          accessToken: clone.accessToken,
          tokenType: clone.tokenType,
          expiresAt: clone.expiresAt
        },
        expiresIn * 1000
      )

      return clone
    } catch (err) {
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
    } catch (err) {
      // Ignore error
    } finally {
      this.accessToken = null
      this.expiresAt = 0
    }
  }

  /**
   * Get session config.
   * 
   * @async
   * @return {Promise<Object>} The session configuration.
   */
  async getSessionConfig () {
    let response = await this.get(`session_config`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get password config.
   * 
   * @async
   * @return {Promise<Object>} The password configuration.
   */
  async getPasswordConfig () {
    let response = await this.get(`password_config`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Create SSO Embed URL.
   * 
   * @async
   * @param {Object} params - The object params.
   * @return {Promise<Object>} The sso url.
   */
  async createSSOEmbedUrl (params) {
    let p = Object.assign({}, params)
    if (this.signWithEndpoint) {
      p.secret_id = this.embedSecret
    }
    let post = {
      ...this.options(),
      json: p
    }
    let response = await this.post(`embed/sso_url`, post)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  // Users
  // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/user

  /**
   * Get information about the current user; the user account currently calling the API.
   * 
   * @async
   * @return {Promise<Object>}  The user information.
   */
  async getCurrentUser () {
    let response = await this.get(`user`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Get information about all users.
    * 
    * @async
    * @return {Promise<Object[]>} The list of users.
    */
  async getAllUsers () {
    let response = await this.get(`users`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Get information about the user with a specific id.
    * 
    * @async
    * @param {string} id The id of the user to retrieve.
    * @return {Promise<Object>} The list of users.
    */
  async getUser (id) {
    let response = await this.get(`users/${id}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Get information about an embed user with a specific id.
    * 
    * @async
    * @param {string} externalId The external id of the user to retrieve.
    * @return {Promise<Object>} The list of users.
    */
  async getEmbedUser (externalId) {
    let response = await this.get(`users/credential/embed/${externalId}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Returns all* user records that match the given search criteria.
    * 
    * @async
    * @param {string} first_name The firstname.
    * @param {string} last_name The lastname.
    * @return {Promise<Object[]>} The list of users.
    */
  async searchUsers (first_name, last_name) {
    const queryParams = `?${this.stringifyParameters({
      first_name,
      last_name
    })}`
    let response = await this.get(`users/search${queryParams}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Returns all embed user records (can filter with disabled or not).
    * 
    * @async
    * @param {boolean} disabled if defined select disabled user or not.
    * @return {Promise<Object[]>} The list of users.
    */
  async getEmbdedUsers (disabled = null) {
    const params = {
      embed_user: true,
      filter_or: false,
      limit: 1000,
    }
    if (disabled !== null) {
      params.is_disabled = disabled
    }
    const queryParams = `?${this.stringifyParameters(params)}`
    let response = await this.get(`users/search${queryParams}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Create a user with the specified information.
    * 
    * @async
    * @param {Promise<Object>} user The user to create.
    */
  async createUser (user) {
    let post = {
      ...this.options(),
      json: user
    }
    await this.post(`users`, post)
  }

  /**
    * Update information about the user.
    * 
    * @async
    * @param {Object} user The user to update.
    */
  async updateUser (user) {
    let post = {
      ...this.options(),
      json: user
    }
    await this.patch(`users/${user.id}`, post)
  }

  /**
    * Delete the user with a specific id.
    * 
    * @async
    * @param {string} userId The user to delete.
    */
  async deleteUser (userId) {
    await this.delete(`users/${userId}`)
  }

  /**
    * Get user attribute values for a given user.
    * 
    * @async
    * @param {string} userId The user to use.
    * @return {Promise<Object[]>} the user attribute values.
    */
  async getUserAttributeValues (userId, unset = false) {
    let response = await this.get(`users/${userId}/attribute_values?include_unset=${unset}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Store a custom value for a user attribute in a user’s account settings.
    * 
    * @async
    * @param {string} userId The user to use.
    * @param {string} attributeId The attribute id to store.
    * @param {Object} attributeValue The attribute value to store.
    * @return {Promise<Object>} The attribute value.
    */
  async setUserAttributeValue (userId, attributeId, attributeValue) {
    let post = {
      ...this.options(),
      json: attributeValue
    }
    let response = await this.post(`users/${userId}/attribute_values/${attributeId}`, post)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
    * Delete a user attribute value from a user’s account settings.
    * 
    * @async
    * @param {string} userId The user to delete.
    * @param {string} attributeId The attribute id to store.
    */
  async deleteUserAttribute (userId, attributeId) {
    await this.delete(`users/${userId}/attribute_values/${attributeId}`)
  }

  /**
     * Get user roles for a given user.
     * 
     * @async
     * @param {string} userId The user to use.
     * @return {Promise<Object[]>} the user roles.
     */
  async getUserRoles (userId) {
    let response = await this.get(`users/${userId}/roles`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  // Folders
  // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/folder

  /**
   * Get information about the folder with a specific id.
   * 
   * @async
   * @param {string} id - Id of the folder.
   * @return {Promise<Object>} The Folder information.
   */
  async getFolder (id) {
    let response = await this.get(`folders/${id}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get information about all folders.
   * 
   * @async
   * @return {Promise<Object[]>} The Folders information.
   */
  async getAllFolders () {
    let response = await this.get(`folders`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get the children of a folder.
   * 
   * @async
   * @param {string} id - Id of the folder.
   * @return {Promise<Object[]>} The Folders information.
   */
  async getFolderChildren (id) {
    let response = await this.get(`folders/${id}/children`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get the parent of a folder.
   * 
   * @async
   * @param {string} id - Id of the folder.
   * @return {Promise<Object>} The Folders information.
   */
  async getFolderParent (id) {
    let response = await this.get(`folders/${id}/parent`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get the ancestors of a folder.
   * 
   * @async
   * @param {string} id - Id of the folder.
   * @return {Promise<Object[]>} The Folders information.
   */
  async getFolderAncestors (id) {
    let response = await this.get(`folders/${id}/ancestors`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get all looks in a folder.
   * 
   * @async
   * @param {string} id - Id of the folder.
   * @return {Promise<Object[]>} The Folders information.
   */
  async getFolderLooks (id) {
    let response = await this.get(`folders/${id}/looks`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get the dashboards in a folder.
   * 
   * @async
   * @param {string} id - Id of the folder.
   * @return {Promise<Object[]>} The Dashboards information.
   */
  async getFolderDashboards (id) {
    let response = await this.get(`folders/${id}/dashboards`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  // Dashboards
  // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/dashboard

  /**
   * Get information about all active dashboards.
   * 
   * @async
   * @return {Promise<Object[]>} The Dashboards information.
   */
  async getAllDashboards () {
    let response = await this.get(`dashboards`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get information about a dashboard.
   * 
   * @async
   * @param {string} id - Id of the dashboard.
   * @return {Promise<Object>} The Dashboard information.
   */
  async getDashboard (id) {
    let response = await this.get(`dashboards/${id}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get information about all the dashboard filters on a dashboard with a specific id.
   * 
   * @async
   * @param {string} id - Id of the dashboard.
   * @return {Promise<Object[]>} The Filters information.
   */
  async getAllDashboardFilters (id) {
    let response = await this.get(`dashboards/${id}/dashboard_filters`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get information about the dashboard filters with a specific id.
   * 
   * @async
   * @param {string} id - Id of the filter.
   * @return {Promise<Object>} The Filter information.
   */
  async getDashboardFilter (id) {
    let response = await this.get(`dashboard_filters/${id}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  // Looks
  // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/look

  /**
   * Get information about all active Looks.
   * Returns an array of abbreviated Look objects describing all the looks that the 
   * caller has access to. 
   * Soft-deleted Looks are not included.
   * 
   * @async
   * @return {Promise<Object[]>} The Looks information.
   */
  async getAllLooks () {
    let response = await this.get(`looks`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Returns detailed information about a Look and its associated Query.
   * 
   * @async
   * @param {string} id - Id of the Look.
   * @return {Promise<Object>} The Look information.
   */
  async getLook (id) {
    let response = await this.get(`looks/${id}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Runs a given look’s query and returns the results in the requested format.
   * Supported formats are:
   * json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.
   * 
   * @async
   * @param {string} id - Id of the Look.
   * @param {string} format - The result format (json, json_detail, csv, txt, ...).
   * @param {Object} options - the optional parameters.
   * @return {Promise<Object[]>} The result of the query.
   */
  async runLook (id, format, options) {
    let queryParams = ''
    if (options) {
      queryParams = `?${this.stringifyParameters(options)}`
    }
    let response = await this.get(`looks/${id}/run/${format}${queryParams}`)
    try {
      let res = JSON.parse(response)
      if (res && !Array.isArray(res)) {
        return [res]
      } else {
        return res
      }
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Runs a given look’s query and returns the results in the requested format.
   * Supported formats are:
   * json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.
   * 
   * @async
   * @param {string} id - Id of the Look.
   * @param {string} format - The result format (json, json_detail, csv, txt, ...).
   * @param {string} limit - The Row limit (may override the limit in the saved query).
   * @param {Object} filters - the filters parameters to overwrite.
   * @return {Promise<Object[]>} The result of the query.
   */
  async fetchLookAndRunQuery (id, format, limit, filters) {
    let look = await this.getLook(id)

    let query = {
      can: look.query.can,
      model: look.query.model,
      view: look.query.view,
      fields: look.query.fields,
      pivots: look.query.pivots,
      fill_fields: look.query.fill_fields,
      filter_config: look.query.filter_config,
      filter_expression: look.query.filter_expression,
      sorts: look.query.sorts,
      column_limit: look.query.column_limit,
      dynamic_fields: look.query.dynamic_fields,
      query_timezone: look.query.query_timezone,
      limit: look.query.limit,
      filters: look.query.filters,
    }

    if (limit) {
      query.limit = limit
    }
    if (filters) {
      query.filters = filters
    }
    let res = await this.runInlineQuery(query, format)
    return res
  }

  // Query
  // https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/query

  /**
   * Get information about all running queries.
   * 
   * @async
   * @returns {Promise<Object>}
   */
  async getAllRunningQueries () {
    let response = await this.get(`running_queries`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Kill a query with a specific id.
   * 
   * @async
   * @param {string} id - Id of the query.
   */
  async killRunningQuery (id) {
    await this.delete(`running_queries/${id}`)
  }

  /**
   * Get a previously created query by id.
   * 
   * @async
   * @param {string} id - Id of the query.
   * @return {Promise<Object>} The result of the query.
   */
  async getQuery (id) {
    let response = await this.get(`queries/${id}`)
    try {
      return JSON.parse(response)
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Run a saved query.
   * Supported formats are:
   * json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.
   * 
   * @async
   * @param {string} id - Id of the query.
   * @param {string} format - The result format (json, json_detail, csv, txt, ...).
   * @param {Object} options - the optional parameters.
   * @return {Promise<Object[]>} The result of the query.
   */
  async runQuery (id, format, options) {
    let queryParams = ''
    if (options) {
      queryParams = `?${this.stringifyParameters(options)}`
    }
    let response = await this.get(`queries/${id}/run/${format}${queryParams}`)
    try {
      let res = JSON.parse(response)
      if (res && !Array.isArray(res)) {
        return [res]
      } else {
        return res
      }
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Run the query that is specified inline in the posted body.
   * Supported formats are:
   * json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.
   * 
   * @async
   * @param {Object} query - the query to execute.
   * @param {string} format - The result format (json, json_detail, csv, txt, ...).
   * @param {Object} options - the optional parameters.
   * @return {Promise<Object[]>} The result of the query.
   */
  async runInlineQuery (query, format, options) {
    let queryParams = ''
    if (options) {
      queryParams = `?${this.stringifyParameters(options)}`
    }
    let post = {
      ...this.options(),
      json: query
    }
    let response = await this.post(`queries/run/${format}${queryParams}`, post)
    try {
      let res = JSON.parse(response)
      if (res && !Array.isArray(res)) {
        return [res]
      } else {
        return res
      }
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Create if not exists the user profile and return its looker profile 
   * with its attributes.
   * 
   * @async
   * @param {string} externalId - the externalId of the external user.
   * @param {Object} source - the source user profile with attibutes 
   * in order to create it if not already created.
   * @param {boolean} refresh - the refresh optional parameter to force 
   * to refresh information (disable cache), default is false if omited.
   * @return {Promise<Object>} The result of the query.
   */
  async getOrCreateEmbedUser (externalId, source, refresh = false) {
    const cached = await this.users.get(externalId)

    if (cached && !refresh) {
      return cached
    }

    const params = {
      target_url: `https://${this.embedHost}/embed/${this.pingUrl}`,
      host: this.embedHost,
      force_logout_login: true,
      session_length: this.sessionDuration,
      external_user_id: externalId,
      permissions: [],
      models: [],
      access_filters: {},
      ...source.profile,
      user_attributes: source.attributes
    }
    if (Array.isArray(source.attributes)) {
      params.user_attributes = {}
      source.attributes.forEach(a => {
        params.user_attributes[a.name] = a.value
      })
    }
    let response = await this.createSSOEmbedUrl(params)

    const url = response.url
    try {
      const client = got.extend({
        hooks: {
          afterResponse: [
            (resp) => {
              // fix the Unauthorized issue
              if (resp.statusCode === 401) {
                resp.statusCode = 200
              }
              return resp
            }
          ],
        },
        timeout: this.timeout,
        retries: this.retries,
        https: {
          rejectUnauthorized: false
        },
        headers: {
          Accept: 'application/json, text/plain, */*',
          UserAgent: this.userAgent
        }
      })
      await client.get(url)
    } catch (err) {
      this.throwError(err)
    }

    response = await this.getEmbedUser(externalId)
    // Keep users in cache for 1 hour maximum.
    await this.users.set(externalId, response, 3600000)
    return response
  }
}

module.exports = LookerAPI
