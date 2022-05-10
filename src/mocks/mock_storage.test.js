// Copyright Carrefour(2021)
//

/* eslint-disable  no-console */

const p = require('path')
const MockStorage = require('../mocks/mock_storage')

test('listFiles', async () => {
  const st = new MockStorage('myproject', 'mybucket', p.join(__dirname, 'testdata'))
  const files = await st.listFiles()
  expect(files).toBeDefined()
  expect(files.length).not.toBe(0)
  expect(files[0].id).toEqual(expect.stringContaining('lorem.txt'))
  expect(files[0].name).toEqual(expect.stringContaining('lorem.txt'))
  expect(files[0].metadata.name).toEqual(expect.stringContaining('lorem.txt'))
  expect(files[0].metadata.bucket).toEqual('mybucket')
  expect(files[0].metadata.size).toBeGreaterThan(900)
})

test('getFile', async () => {
  const st = new MockStorage('myproject', 'mybucket', p.join(__dirname, 'testdata'))
  const filename = 'lorem.txt'

  let data = await st.getFile(filename)

  expect(data).toBeDefined()
  expect(data.length).toBeGreaterThan(900)
})
