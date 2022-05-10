// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const got = require('got')
const SimpleLogger = require('simple-node-logger')
const WebServer = require('./web_server')

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const config = {
  apiPrefix: '/api',
  cors: {
    enable: true
  },
  compression: {
    enable: true
  },
  helmet: {
    enable: true
  },
  statistics: {
    enable: true
  },
  log: {
    enable: true
  },
  http: {
    enable: true,
    port: 8081,
    host: "127.0.0.1"
  }
}

test('WebServer', async () => {
  const logger = SimpleLogger.createSimpleLogger()
  const webserver = new WebServer(config, logger)

  try {
    webserver.get('/', (req, res) => {
      res.status(200).send('It Works')
    })
    new Promise(() => {
      webserver.fly()
    }).finally(
      webserver.stop()
    )
    sleep(500)

    let response = await got('http://127.0.0.1:8081/')
    expect(response.statusCode).toBe(200)

    response = await got('http://127.0.0.1:8081/basic_stats')
    expect(response.statusCode).toBe(200)

    response = await got('http://127.0.0.1:8081/basic_stats')
    expect(response.statusCode).toBe(200)

    await expect(
      got('http://127.0.0.1:8081/xxxxxxxxxxx')
    ).rejects.toBeDefined()

    sleep(500)
  } finally {
    webserver.stop()
  }
})
