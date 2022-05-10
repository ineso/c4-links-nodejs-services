// Copyright Carrefour(2021)
//

const _ = require('lodash')
const SimpleLogger = require('simple-node-logger')

const Levels = ['debug', 'info', 'warn', 'error', 'fatal']

module.exports = class MockLogger {

  constructor(level) {
    this.log = SimpleLogger.createSimpleLogger({
      timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
      levels: Levels,
      level: level || 'debug'
    })
    this.entries = []
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
  async list (fromdate, severity, maxsize = 1000) {
    if (maxsize > 10000 || maxsize < 0) {
      throw new Error('Invalid maxsize, must be in range 0 - 10000')
    }
    if (!_.includes(Levels, severity)) {
      throw new Error(`Invalid level '${severity}'`)
    }
    const entries = await new Promise((resolve) => {
      resolve(
        _.compact(
          _.map(
            _.filter(this.entries, (entry) => {
              return (entry.timestamp.getTime() >= fromdate.getTime())
                &&
                (Levels.indexOf(entry.severity) >= Levels.indexOf(severity))
            })
          ), (entry) => {
            return {
              timestamp: entry.timestamp.toISOString(),
              severity: entry.severity === 'warn' ? 'warning' : entry.severity,
              text: entry.text
            }
          }
        )
      )
    })
    return _.drop(entries,
      Math.max(0, entries.length > maxsize ? entries.length - maxsize : 0)
    )
  }

  add (severity, arr) {
    const timestamp = new Date()
    this.entries.push({
      timestamp: timestamp,
      severity: severity,
      text: Array.isArray(arr) ? arr.join(' ') : arr
    })
  }

  /**
   * Add a debug message
   * 
   * @async
   * @param {string} message
   */
  async debug (...arr) {
    await new Promise((resolve) => {
      this.add('debug', arr)
      this.log.debug(...arr)
      resolve()
    })
  }

  /**
   * Add an info message
   * 
   * @async
   * @param {string} message
   */
  async info (...arr) {
    await new Promise((resolve) => {
      this.add('info', arr)
      this.log.info(...arr)
      resolve()
    })
  }

  /**
   * Add an warning message
   * 
   * @async
   * @param {string} message
   */
  async warn (...arr) {
    await new Promise((resolve) => {
      this.add('warn', arr)
      this.log.warn(...arr)
      resolve()
    })
  }

  /**
   * Add an error message
   * 
   * @async
   * @param {string} message
   */
  async error (...arr) {
    await new Promise((resolve) => {
      this.add('error', arr)
      this.log.error(...arr)
      resolve()
    })
  }

  /**
   * Add an fatal message
   * 
   * @async
   * @param  {string} message
   */
  async fatal (...arr) {
    await new Promise((resolve) => {
      this.add('fatal', arr)
      this.log.fatal(...arr)
      resolve()
    })
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
    await new Promise((resolve) => {
      const msg = `${method} ${url} ${status} ${agent} ${size} ${message}`
      this.add('info', msg)
      this.log.info(msg)
      resolve()
    })
  }
}
