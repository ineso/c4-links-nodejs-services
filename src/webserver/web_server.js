// Copyright Carrefour(2021)
//

const _ = require('lodash')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const WebStatistics = require('./web_statistics')

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

/** 
 * Class representing a Web Server Application.
 */
class WebServer {

  constructor(config, logger) {
    this.webstats = new WebStatistics()
    this.config = config
    this.logger = logger

    this.app = express()
    if (config.helmet && config.helmet.enable) {
      this.app.use(helmet())
    }
    if (config.compression && config.compression.enable) {
      this.app.use(compression())
    }
    if (config.cors && config.cors.enable) {
      this.app.use(cors())
    }
    this.app.use(cookieParser())
    this.app.disable('x-powered-by')
    this.app.set('trust proxy', function (ip) {
      if (ip === '127.0.0.1') {
        return true // trusted IPs
      }
      return false
    })
    this.app.use(express.static(config.static || 'public'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use((req, res, next) => {
      this.setDefaultHeaders(res)
      this.log(req, res)
      next()
    })
    if (config.statistics && config.statistics.enable) {
      this.app.get('/basic_stats', (req, res) => { this.webstats.handler(req, res) })
    }
  }

  setDefaultHeaders (res) {
    res.setHeader('Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
  }

  getApp () {
    return this.app
  }

  use (...handlers) {
    return this.app.use(...handlers)
  }

  get (path, ...handlers) {
    return this.app.get(path, ...handlers)
  }

  log (req, res) {
    const startAt = process.hrtime()
    const durations = getDurationInMilliseconds(startAt)
    res.on('finish', () => {
      if (this.config.log && this.config.log.enable && this.logger) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '-'
        let method = req.method || '-'
        let url = req.originalUrl || req.url || '-'
        let status = res.statusCode || '-'
        let size = '-'
        if (_.get(res, '_contentLength')) {
          size = `${res['_contentLength']}byte(s)`
        } else if (res.hasHeader('content-length')) {
          size = `${res.getHeader('content-length') || '0'}byte(s)`
        }
        let duration = `${durations}ms`
        let agent = req.get('User-Agent') || '-'
        this.logger.info(`${ip} ${method} ${url} ${status} ${size} ${duration} ${agent}`)
      }
      if (this.config.statistics && this.config.statistics.enable) {
        this.webstats.register(req, durations)
      }
    })
  }

  fly () {
    const port = this.config.http.port || 8080
    const host = this.config.http.host || '0.0.0.0'
    const hostname = this.config.http.hostname || '127.0.0.1'

    this.app.use(function (req, res) {
      res.status(404).send('Not Found')
    })

    this.server = this.app.listen(port, host, () => {
      if (this.logger) {
        this.logger.info(`Listening at http://${hostname}:${port}`)
      }
    })
  }

  stop () {
    if (this.server) {
      this.server.close()
    }
  }
}

module.exports = WebServer
