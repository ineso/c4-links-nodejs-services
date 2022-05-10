// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const GCStorage = require("./storage")

const projectId = '11044440778'
const bucketName = 'c4-datashopper-supplier-access-bd25d5a2'

test('listFiles', async () => {
  const st = new GCStorage(projectId, bucketName)
  const files = await st.listFiles()

  expect(files).toBeDefined()
  expect(files.length).not.toBe(0)
})

test('getFile', () => {
  const st = new GCStorage(projectId, bucketName)
  const filename = 'access.csv'

  return st.getFile(filename)
    .then(data => {
      expect(data).toBeDefined()
      expect(data.length).not.toBe(0)
    })
})

test('putFile', () => {
  const st = new GCStorage(projectId, bucketName)
  const filename = 'test.csv'

  return st.putFile(filename, 'test')
})

test('moveFile', async () => {
  const st = new GCStorage(projectId, bucketName)
  const src = 'test.csv'
  const dest = 'test2.csv'

  await st.moveFile(src, dest)
  await st.moveFile(dest, src)
})

test('deleteFile', () => {
  const st = new GCStorage(projectId, bucketName)
  const filename = 'test.csv'

  return st.deleteFile(filename)
})
