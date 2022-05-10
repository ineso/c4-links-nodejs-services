// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const Logger = require("./logger")

const projectId = '11044440778'
const logName = 'test'

jest.setTimeout(20000)

test('all', async () => {
  const log = new Logger(projectId, logName)

  await log.debug('this is a debug message')

  await log.info('this is a info message')

  await log.warn('this is a warn message')

  await log.error('this is a error message')

  await log.fatal('this is a fatal message')

  await log.http('GET', 'http://www.google.com', 200, 'my-user-agent/1.0.0', 192, 'test')
})

test('list', async () => {
  const log = new Logger(projectId, logName)

  let fromdate = new Date(Date.now() - 3600000)
  let entries = await log.list(fromdate, 'error')
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
