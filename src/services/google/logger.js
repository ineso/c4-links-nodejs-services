// Copyright Carrefour(2021)
//

/* eslint-disable  no-console, no-unused-vars, no-await-in-loop */

const _ = require('lodash')
const Project = require('./project')
const { Logging } = require('@google-cloud/logging')

const Levels = ['debug', 'info', 'warn', 'error', 'fatal']

/** Class representing a Google Cloud Logger.
 * @extends Project
 */
class GCLogger extends Project {

  /**
   * Create a Logger.
   * @param {string} projectId - The GCP project identifier.
   * @param {string} logName - The log name.
   * @param {string} level - The minimum log level.
   */
  constructor(projectId, logName, level) {
    super(projectId)
    this.logging = new Logging({ projectId })
    this.log = this.logging.log(logName)
    this.level = level || 'info'
    this.currentLevel = Levels.indexOf(level)
  }

  static convertLevel (lvl) {
    switch (lvl) {
      case 'debug':
        return 'DEBUG'
      case 'info':
        return 'INFO'
      case 'warn':
        return 'WARNING'
      case 'error':
        return 'ERROR'
      case 'fatal':
        return 'ALERT'
      default:
        throw new Error(`INVALID_ARGUMENT: Invalid level '${lvl}'`)
    }
  }

  setLevel (lvl) {
    this.level = lvl || 'info'
    this.currentLevel = Levels.indexOf(this.level)
  }

  isLevelAt (lvl) {
    const idx = Levels.indexOf(lvl)
    return idx >= this.currentLevel
  }

  /**
   * Query logs from a given date with a given level of severity.
   * 
   * @async
   * @param {Date} fromdate
   * @param {string} severity
   * @param {number} maxsize
   * @returns {Promise<Object[]>} log results
   */
  async list (fromdate, severity, maxsize) {
    const timestamp = fromdate || new Date(Date.now() - 3600000)
    const lvl = severity || this.level
    const level = GCLogger.convertLevel(lvl)
    const pageSize = 1000

    if (maxsize > 10000 || maxsize < 0) {
      throw new Error('Invalid maxsize, must be in range 0 - 10000')
    }
    let filter = _.join(
      [
        `timestamp >= "${timestamp.toISOString()}"`,
        `severity >= ${level.toUpperCase()}`,
        'textPayload != ""'
      ],
      ' AND ')
    const request = {
      orderBy: "timestamp desc",
      pageSize: pageSize,
      log: this.log.name,
      filter: filter,
      autoPaginate: false
    }

    const [output, _req, resp] = await this.logging.getEntries(request)
    let nextPage = _.get(resp, 'nextPageToken')
    while (nextPage && output.length < maxsize) {
      const [entries, _req2, resp2] = await this.logging.getEntries({
        ...request,
        pageToken: nextPage
      })
      output.push(entries)
      nextPage = _.get(resp2, 'nextPageToken')
    }

    return _.compact(_.map(_.reverse(_.take(output, maxsize)), v => {
      if (!v.metadata) {
        return null
      }
      return {
        timestamp: _.get(v, 'metadata.timestamp'),
        severity: _.get(v, 'metadata.severity', '').toLowerCase(),
        text: _.get(v, 'metadata.textPayload', '')
      }
    }))
  }

  /**
   * Add a debug message
   * 
   * @async
   * @param {string} message
   */
  async debug (message) {
    if (this.isLevelAt('debug')) {
      await this.write('debug', message)
    }
  }

  /**
   * Add an info message
   * 
   * @async
   * @param {string} message
   */
  async info (message) {
    if (this.isLevelAt('info')) {
      await this.write('info', message)
    }
  }

  /**
   * Add an warning message
   * 
   * @async
   * @param {string} message
   */
  async warn (message) {
    if (this.isLevelAt('warn')) {
      await this.write('warn', message)
    }
  }

  /**
   * Add an error message
   * 
   * @async
   * @param {string} message
   */
  async error (message) {
    if (this.isLevelAt('error')) {
      await this.write('error', message)
    }
  }

  /**
   * Add an fatal message
   * 
   * @async
   * @param  {string} message
   */
  async fatal (message) {
    if (this.isLevelAt('fatal')) {
      await this.write('fatal', message)
    }
  }

  /**
   * Add an http log message
   * 
   * @async
   * @param {string} method
   * @param {string} url
   * @param {string} status
   * @param {string} agent
   * @param {string} size
   * @param {string} message
   */
  async http (method, url, status, agent, size, message) {
    const metadata = {
      severity: 'INFO',
      resource: { type: 'global' },
      httpRequest: {
        requestMethod: method,
        requestUrl: url,
        status: status,
        userAgent: agent,
        requestSize: size,
      },
    }
    try {
      const entry = this.log.entry(metadata, message)
      await this.log.write(entry)
    } catch (err) {
      let msg = err.details || err.toString()
      console.error(msg)
      console.log(`INFO ${message}`)
    }
  }


  async write (lvl, message) {
    const severity = GCLogger.convertLevel(lvl)
    const metadata = {
      severity: severity,
      resource: {
        type: 'global',
      },
    }
    try {
      const entry = this.log.entry(metadata, message)
      await this.log.write(entry)
    } catch (err) {
      let msg = err.details || err.toString()
      console.error(msg)
      console.log(`${severity} ${message}`)
    }
  }
}

module.exports = GCLogger
