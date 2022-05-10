// Copyright Carrefour(2021)
//

/* eslint-disable no-undef */

const _ = require('lodash')

/** 
 * Class representing Web Statistics.
 */
class WebStatistics {

  constructor() {
    this.started_at = new Date()
    this.urls = new Map()
    this.ips = new Map()
    this.nbhits = 0
    this.totalduration = 0
    this.minduration = 1e9
    this.maxduration = 0
  }

  elapsed_duration () {
    return Date.now() - this.started_at.getTime()
  }

  average_duration () {
    if (this.nbhits === 0) {
      return 0
    }
    return this.totalduration / this.nbhits
  }

  register (req, duration) {
    this.nbhits++
    this.totalduration += duration
    this.minduration = Math.min(this.minduration, duration)
    this.maxduration = Math.max(this.maxduration, duration)

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '-'
    let url = req.originalUrl || req.url || '-'
    if (_.get(req, 'route.path')) {
      url = _.get(req, 'route.path')
    }
    if (this.urls.has(url)) {
      let entry = this.urls.get(url)
      entry.nbhits++
      entry.totalduration += duration
      entry.minduration = Math.min(entry.minduration, duration)
      entry.maxduration = Math.max(entry.maxduration, duration)
    } else {
      this.urls.set(url, {
        nbhits: 1,
        totalduration: duration,
        minduration: duration,
        maxduration: duration,
      })
    }
    if (this.ips.has(ip)) {
      let entry = this.ips.get(ip)
      entry.nbhits++
      entry.totalduration += duration
      entry.minduration = Math.min(entry.minduration, duration)
      entry.maxduration = Math.max(entry.maxduration, duration)
    } else {
      this.ips.set(ip, {
        nbhits: 1,
        totalduration: duration,
        minduration: duration,
        maxduration: duration,
      })
    }
  }

  handler (req, res) {
    let urls = `<div>
            <span>URL</span>
            <span>Total Nb Hits</span>
            <span>Average Duration</span>
            <span>Maximum Duration</span>
            <span>Minimum Duration</span>
        </div>`
    this.urls.forEach((value, key) => {
      urls += `<div>
                <span>${key}</span>
                <span>${value.nbhits}</span>
                <span>${value.nbhits > 0 ? value.totalduration / value.nbhits : 0}</span>
                <span>${value.minduration}</span>
                <span>${value.maxduration}</span>
            </div>`
    })

    let ips = `<div>
            <span>URL</span>
            <span>Total Nb Hits</span>
            <span>Average Duration</span>
            <span>Maximum Duration</span>
            <span>Minimum Duration</span>
        </div>`
    this.ips.forEach((value, key) => {
      ips += `<div>
                <span>${key}</span>
                <span>${value.nbhits}</span>
                <span>${value.nbhits > 0 ? value.totalduration / value.nbhits : 0}</span>
                <span>${value.minduration}</span>
                <span>${value.maxduration}</span>
            </div>`
    })

    res.status(200).send(`<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Carrefour Links Web Statistics</title>
            </head>
            <body>
                <h1>Web Statistics</h1>
                <h2>Global</h2>
                <div>
                    <span>Stated At:</span><span>${this.started_at.toGMTString()}</span>
                </div>
                <div>
                    <span>Elapsed Duration:</span><span>${this.elapsed_duration()}ms</span>
                </div>
                <div>
                    <span>Total Nb Hits:</span><span>${this.nbhits}</span>
                </div>
                <div>
                    <span>Average Duration:</span><span>${this.average_duration()}</span>
                </div>
                <div>
                    <span>Maximum Duration:</span><span>${this.maxduration}</span>
                </div>
                <div>
                    <span>Minimum Duration:</span><span>${this.minduration}</span>
                </div>
                <h2>URLs</h2>
                ${urls}
                <h2>IPs</h2>
                ${ips}
            </body>
        </html>`)
  }
}

module.exports = WebStatistics
