// Copyright Carrefour(2021)
//

/* eslint-disable  no-console */

const path = require('path')
const MockFileConnect = require('./mock_file_connect')

test('all', async () => {
  const st = new MockFileConnect()
  const filename = 'lorem.txt'

  await st.login()

  const rootId = await st.getRootFolderId()
  expect(rootId).toEqual('tfVFl2p55EU')

  const localPath = path.join(__dirname, 'testdata', filename)
  await st.uploadFile(localPath, filename)

  let list = await st.getFiles(rootId)
  console.log(list)
  expect(list).toBeDefined()
  expect(list.length).toBe(1)

  const id = list[0].id
  expect(id).toEqual(1)

  const data = await st.getFile(id)
  console.log(data)

  await st.deleteFile(id)
  list = await st.getFiles(rootId)
  console.log(list)
  expect(list).toBeDefined()
  expect(list.length).toBe(0)

  await st.logout()
})
