// Copyright Carrefour(2021)
//

// https://docs.looker.com/reference/embedding/sso-embed
// eslint-disable-next-line max-len
// https://github.com/looker-open-source/embed-sdk/blob/279f3c02fe325801a008a0dc0a2b2bc6841f17aa/server_utils/auth_utils.py
// eslint-disable-next-line max-len
// https://github.com/looker-open-source/embed-sdk/blob/279f3c02fe325801a008a0dc0a2b2bc6841f17aa/server_utils/auth_utils.ts
//

const crypto = require('crypto')

/**
 * Force a string to be UnicodeEncoding
 * @param {string} val The string the encode/decode.
 * @return {string} The encoded/decoded result.
 */
function forceUnicodeEncoding (val) {
  return decodeURIComponent(encodeURIComponent(val))
}

/**
 * Build and concatenate the parameters in an URI parameter string.
 * 
 * @param {object} params The parameters.
 * @param {string} signature The signature string to add at the end.
 * @return {string} The concatenated string.
 */
function stringifyParameters (params, signature) {
  const result = []
  for (const key in params) {
    const param = params[key]
    if (typeof param === 'string') {
      result.push(`${key}=${encodeURIComponent(param)}`)
    }
  }
  result.push('signature=' + encodeURIComponent(signature))

  return result.join('&')
}

module.exports = class LookerEmbedURL {

  constructor(config) {
    this.instanceId = config.instanceId
    this.host = config.embedHost
    this.secret = config.embedSecret
  }

  /**
   * Generate a random nonce string of the given length.
   * 
   * @param {number} len The desirated lentgh.
   * @return {string} The generated nonce string.
   */
  static generateNonce (len) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''

    for (let i = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  }

  /**
   * Build the parameters object from the user object.
   * 
   * @param {object} user The object containing the user properties.
   * @return {object} The paramaters object.
   */
  buildParameters (user) {
    const access_filters = {}
    let nonce_value = LookerEmbedURL.generateNonce(16)
    let time_value = Math.floor(new Date().getTime() / 1000)

    let params = {
      nonce: JSON.stringify(nonce_value),
      time: JSON.stringify(time_value),
      session_length: JSON.stringify(user.session_length),
      external_user_id: JSON.stringify(user.external_user_id),
      permissions: JSON.stringify(user.permissions),
      models: JSON.stringify(user.models),
      access_filters: JSON.stringify(access_filters),
      force_logout_login: JSON.stringify(user.force_logout_login),
    }
    if (user.first_name && user.first_name.length > 0) {
      Object.assign(params, { first_name: JSON.stringify(user.first_name) })
    }
    if (user.last_name && user.last_name.length > 0) {
      Object.assign(params, { last_name: JSON.stringify(user.last_name) })
    }
    if (user.group_ids) {
      Object.assign(params, { group_ids: JSON.stringify(user.group_ids) })
    }
    if (user.external_group_id) {
      Object.assign(params, { external_group_id: JSON.stringify(user.external_group_id) })
    }
    if (user.user_attributes) {
      Object.assign(params, { user_attributes: JSON.stringify(user.user_attributes) })
    }
    if (user.user_timezone && user.user_timezone.length > 0) {
      Object.assign(params, { user_timezone: JSON.stringify(user.user_timezone) })
    }

    return params
  }

  /**
   * Generate the signature from the secret key and paramaeters.
   * 
   * @param {string} embed The embed URL path.
   * @param {object} params The parameters.
   * @return {string} The generated secret passphrase.
   */
  generateSignature (embed, params) {
    if (!embed) {
      throw new Error("embed is mandatory")
    }
    if (!params) {
      throw new Error("params is mandatory")
    }

    let fields = [
      this.host,
      embed,
      params.nonce,
      params.time,
      params.session_length,
      params.external_user_id,
      params.permissions,
      params.models
    ]
    if (params.group_ids) {
      fields.push(params.group_ids)
    }
    if (params.external_group_id) {
      fields.push(params.external_group_id)
    }
    if (params.user_attributes) {
      fields.push(params.user_attributes)
    }
    fields.push(params.access_filters)

    let data = forceUnicodeEncoding(fields.join("\n"))

    return crypto.createHmac('sha1', this.secret).update(data).digest('base64').trim()
  }

  /**
   * Build the SSO embed URL from src and user.
   * 
   * @param {string} src The source embed URL.
   * @param {object} user The object containing the user properties.
   * @return {string} The generated SSO URL for embed resource.
   */
  buildURL (src, user) {
    if (!src) {
      throw new Error("src is mandatory")
    }
    if (!user) {
      throw new Error("user is mandatory")
    }

    let embed_path = '/login/embed/' + encodeURIComponent(src)
    let parameters = this.buildParameters(user)
    let signature = this.generateSignature(embed_path, parameters)
    let params = stringifyParameters(parameters, signature)
    let sso_url = new URL('https://' + this.host + embed_path + '?' + params)

    return sso_url.toString()
  }
}
