// Copyright Carrefour(2021)
//

const MockLogger = require("./mock_logger")

/* eslint-disable  no-console */

let log

beforeAll(() => {
  log = new MockLogger('debug')
})

test('all', async () => {
  await log.debug('this is a debug message')

  await log.info('this is a info message')

  await log.warn('this is a warn message')

  await log.error('this is a error message')

  await log.fatal('this is a fatal message')

  await log.http('GET', 'http://www.google.com', 200, 'my-user-agent/1.0.0', 192, 'test')
})

test('list', async () => {
  let fromdate = new Date(Date.now() - 3600000)
  let entries = await log.list(fromdate, 'error')
  console.log(entries)
  expect(entries).toBeDefined()

  fromdate = new Date(Date.now() - 3600000)
  entries = await log.list(fromdate, 'info', 100)
  console.log(entries)
  expect(entries).toBeDefined()

  // Error cases

  fromdate = new Date(Date.now() - 3600000)
  await expect(
    log.list(fromdate, 'test', 100)
  ).rejects.toBeDefined()

  fromdate = new Date(Date.now() - 3600000)
  await expect(
    log.list(fromdate, 'info', 100000)
  ).rejects.toBeDefined()
})
