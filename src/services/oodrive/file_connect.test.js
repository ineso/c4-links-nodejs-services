// Copyright Carrefour(2021)
//
// https://sharing.oodrive.com/share/ws/carrefourv5-testapi
//

const p = require('path')
const os = require('os')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const got = require('got')
const FileConnect = require("./file_connect")

jest.mock('got')

const config = {
  host: 'sharing.oodrive.com',
  workspace: 'carrefourv5-testapi',
  clientId: 'carrefourv5-testapi',
  clientSecret: 'xyxyxyxyxyxyx',
  username: 'api',
  password: 'xxxxxxxxxxxxx',
  timeout: 1000,
  retries: 1
}

function mockLoginNominal () {
  got.post.mockResolvedValueOnce({
    body: {
      access_token: 'bfc0e441-5151-47dc-8566-318750523970',
      token_type: 'bearer',
      refresh_token: '5e96ae6d-32bb-41c9-803a-398a90574c70',
      expires_in: 43066,
      scope: 'read write'
    }
  })
}

function mockLoginWrong1 () {
  got.post.mockResolvedValueOnce({
    body: {
      token_type: 'bearer',
      refresh_token: '5e96ae6d-32bb-41c9-803a-398a90574c70',
      expires_in: 43066,
      scope: 'read write'
    }
  })
}

function mockLoginWrong2 () {
  got.post.mockResolvedValueOnce({
    body: {
      access_token: 'bfc0e441-5151-47dc-8566-318750523970',
      token_type: 'bearer',
      refresh_token: '5e96ae6d-32bb-41c9-803a-398a90574c70',
      scope: 'read write'
    }
  })
}

function mockLoginError () {
  got.post.mockRejectedValueOnce(new Error('HTTPError: Response code 401 (Unauthorized)'))
}

function mockRootFolder (id) {
  got.mockResolvedValueOnce({
    body: JSON.stringify({
      '$collection': [
        {
          id: '_V2kJHlKoWo',
          name: 'BIN',
          creationDate: '2021-03-03T13:16:37Z',
          lastModificationDate: '2021-12-21T14:06:29Z',
          contentType: 'application/vnd.oodrive.folder.bin',
          childFileCount: 1,
          childFolderCount: 6,
          permissions: ['READ', 'PRINT', 'WRITE'],
          actions: [],
          allowedSharingTypes: [],
          memoCount: 0,
          ownerId: '36bbb5e6-cd05-4cc8-b852-9330388ecfc3',
          creatorId: '36bbb5e6-cd05-4cc8-b852-9330388ecfc3',
          isMine: true,
          isDir: true,
          isInfected: false,
          isFavorite: false,
          isComplete: true,
          isOwnedByMe: true
        },
        {
          id: id,
          name: 'Fichiers',
          creationDate: '2021-03-03T13:16:37Z',
          lastModificationDate: '2022-02-25T10:31:21Z',
          contentType: 'application/vnd.oodrive.folder.myFiles',
          childFileCount: 0,
          childFolderCount: 1,
          permissions: ['READ', 'PRINT', 'WRITE'],
          actions: ['CREATE_FOLDER', 'UPLOAD', 'DOWNLOAD', 'MOVE_TARGET'],
          allowedSharingTypes: [],
          memoCount: 0,
          ownerId: '36bbb5e6-cd05-4cc8-b852-9330388ecfc3',
          creatorId: '36bbb5e6-cd05-4cc8-b852-9330388ecfc3',
          isMine: true,
          isDir: true,
          isInfected: false,
          isFavorite: false,
          isComplete: true,
          isOwnedByMe: true
        }
      ],
      '@=rootItems': '/api/v1/items/{id}'
    })
  })
}

test('login(sucess)', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()

  await fileConnect.login()

  await fileConnect.login()
})

test('login(fail)', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginWrong1()

  await expect(
    fileConnect.login()
  ).rejects.toBeDefined()

  mockLoginWrong2()

  await expect(
    fileConnect.login()
  ).rejects.toBeDefined()

  mockLoginError()

  await expect(
    fileConnect.login()
  ).rejects.toBeDefined()
})

test('logout', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()
  got.delete.mockResolvedValueOnce({})

  await fileConnect.login()

  await fileConnect.logout()
})

test('getFiles', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()
  await fileConnect.login()

  mockRootFolder('tfVFl2p55EU')
  let response = await fileConnect.getFiles()
  expect(response).not.toEqual([])

  await fileConnect.logout()
})

test('getRootFolderId', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()
  await fileConnect.login()

  const rootFolderId = 'tfVFl2p55EU'

  mockRootFolder(rootFolderId)
  const resp = await fileConnect.getRootFolderId()
  expect(resp).toEqual(rootFolderId)
})

test('getFile', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()
  await fileConnect.login()

  const file = {
    id: 'tfVFl2p55EU',
    name: 'Fichiers',
    creationDate: '2021-03-03T13:16:37Z',
    lastModificationDate: '2022-02-25T10:31:21Z',
    contentType: 'application/vnd.oodrive.folder.myFiles',
    childFileCount: 0,
    childFolderCount: 1,
    permissions: ['READ', 'PRINT', 'WRITE'],
    actions: ['CREATE_FOLDER', 'UPLOAD', 'DOWNLOAD', 'MOVE_TARGET'],
    allowedSharingTypes: [],
    memoCount: 0,
    ownerId: '36bbb5e6-cd05-4cc8-b852-9330388ecfc3',
    creatorId: '36bbb5e6-cd05-4cc8-b852-9330388ecfc3',
    isOwnedByMe: true,
    isMine: true,
    isDir: true,
    isInfected: false,
    isFavorite: false,
    isComplete: true
  }
  got.mockResolvedValueOnce({
    body: JSON.stringify(file)
  })
  let response = await fileConnect.getFile(file.id)

  expect(response).toEqual(file)
})

test('uploadFile', async () => {
  let fileConnect = new FileConnect(config)

  // create a test file in a temporary directory
  const tempDir = path.join(os.tmpdir(), uuid.v4())
  fs.mkdirSync(tempDir)
  fs.writeFileSync(path.join(tempDir, 'lorem.txt'), "Lorem ipsum dolor sit amet.")

  try {
    mockLoginNominal()
    await fileConnect.login()

    mockRootFolder('tfVFl2p55EU')

    got.post.mockResolvedValueOnce({
      body: {
        '$collection': [
          { id: 'abcdefghijk' }
        ]
      }
    })
    got.stream.put.mockReturnValueOnce({
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation(function (event, handler) {
        handler()
        // eslint-disable-next-line no-invalid-this
        return this
      }),
    })

    // upload a test file
    await fileConnect.uploadFile(path.join(tempDir, 'lorem.txt'), 'lorem.txt')

    mockRootFolder('tfVFl2p55EU')

    // upload a file that doesn't exist
    await expect(
      fileConnect.uploadFile(p.join(tempDir, 'xxxxx.txt'), 'lorem.txt')
    ).rejects.toBeDefined()

    mockRootFolder('tfVFl2p55EU')

    // an error occured during transfer
    got.post.mockRejectedValueOnce(new Error('Unexpected Error'))

    await expect(
      fileConnect.uploadFile(p.join(path.join(tempDir, 'lorem.txt')), 'lorem.txt')
    ).rejects.toBeDefined()
  } finally {
    fs.rmdirSync(tempDir, { recursive: true, force: true })
  }
})

test('downloadFile', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()
  await fileConnect.login()

  const id = 'abcdefghijk'

  got.get.mockResolvedValueOnce({
    body: 'Lorem ipsum dolor sit amet.'
  })

  const response = await fileConnect.downloadFile(id)

  expect(response).toEqual('Lorem ipsum dolor sit amet.')

  // download a file that doesn't exist
  got.get.mockRejectedValueOnce(new Error('HTTPError: Response code 404 (Not Found)'))

  await expect(
    fileConnect.downloadFile('xxxx')
  ).rejects.toBeDefined()
})

test('deleteFile', async () => {
  let fileConnect = new FileConnect(config)

  mockLoginNominal()
  await fileConnect.login()

  const id = 'abcdefghijk'

  got.delete.mockResolvedValueOnce({})

  await fileConnect.deleteFile(id)

  // delete a file that doesn't exist
  got.delete.mockRejectedValueOnce(new Error('HTTPError: Response code 404 (Not Found)'))

  await expect(
    fileConnect.deleteFile('xxxx')
  ).rejects.toBeDefined()
})
