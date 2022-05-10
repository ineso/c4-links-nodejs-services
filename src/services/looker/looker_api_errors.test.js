// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const got = require('got')
const LookerAPI = require('./looker_api')

jest.mock('got')

test('login_logout', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.post.mockResolvedValueOnce({
    body: {}
  })

  await expect(
    looker.login()
  ).rejects.toBeDefined()

  got.post.mockResolvedValueOnce({
    body: {
      access_token: '2ZRfwvvPgXt7cYJT2CBXXrV4fsvmNczNPP3YNj9c',
    }
  })

  await expect(
    looker.login()
  ).rejects.toBeDefined()

  got.post.mockRejectedValueOnce(new Error('401 - Unauthorized'))

  await expect(
    looker.login()
  ).rejects.toBeDefined()

  got.post.mockResolvedValueOnce({
    body: {
      access_token: '2ZRfwvvPgXt7cYJT2CBXXrV4fsvmNczNPP3YNj9c',
      token_type: 'Bearer',
      expires_in: 3599,
      refresh_token: null
    }
  })
  await looker.login()
})

test('loginAsUser', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.post.mockRejectedValueOnce(new Error('401 - Unauthorized'))

  await expect(
    looker.loginAsUser(42)
  ).rejects.toBeDefined()
})

test('getSessionConfig', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getSessionConfig()
  ).rejects.toBeDefined()
})

test('getPasswordConfig', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getPasswordConfig()
  ).rejects.toBeDefined()
})

test('createSSOEmbedUrl', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.post.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.createSSOEmbedUrl({})
  ).rejects.toBeDefined()
})

test('getCurrentUser', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getCurrentUser()
  ).rejects.toBeDefined()
})

test('getAllUsers', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getAllUsers()
  ).rejects.toBeDefined()
})

test('getUser', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getUser(42)
  ).rejects.toBeDefined()
})

test('getEmbedUser', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getEmbedUser(42)
  ).rejects.toBeDefined()
})

test('getEmbdedUsers', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getEmbdedUsers()
  ).rejects.toBeDefined()
})

test('searchUsers', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.searchUsers('John', 'DOE')
  ).rejects.toBeDefined()
})

test('getUserAttributeValues', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getUserAttributeValues(42)
  ).rejects.toBeDefined()
})

test('getUserRoles', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getUserRoles(42)
  ).rejects.toBeDefined()
})

test('getFolder', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getFolder('91')
  ).rejects.toBeDefined()
})

test('getAllFolders', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getAllFolders()
  ).rejects.toBeDefined()
})

test('getFolderChildren', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getFolderChildren('91')
  ).rejects.toBeDefined()
})

test('getFolderParent', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getFolderParent('91')
  ).rejects.toBeDefined()
})

test('getFolderAncestors', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getFolderAncestors('91')
  ).rejects.toBeDefined()
})

test('getFolderLooks', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getFolderLooks('91')
  ).rejects.toBeDefined()
})

test('getFolderDashboards', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getFolderDashboards('91')
  ).rejects.toBeDefined()
})

test('getAllDashboards', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getAllDashboards()
  ).rejects.toBeDefined()
})

test('getDashboard', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getDashboard('249')
  ).rejects.toBeDefined()
})

test('getAllDashboardFilters', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getAllDashboardFilters('249')
  ).rejects.toBeDefined()
})

test('getDashboardFilter', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getDashboardFilter('2948')
  ).rejects.toBeDefined()
})

test('getAllLooks', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getAllLooks()
  ).rejects.toBeDefined()
})

test('getLook', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.getLook('307')
  ).rejects.toBeDefined()
})

test('runLook', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.runLook('307', 'json_detail')
  ).rejects.toBeDefined()
})

test('runInlineQuery', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  got.post.mockResolvedValueOnce({
    body: 'xxxxxxxxxxxxxxxxxxx'
  })

  await expect(
    looker.runInlineQuery({})
  ).rejects.toBeDefined()
})

test('getOrCreateEmbedUser', async () => {
  let looker = new LookerAPI({ instanceId: 'Carrefour' })

  const source = {
    profile: {
      first_name: 'john',
      last_name: 'DOE',
      external_group_id: 'AB INBEV',
      group_ids: [1, 6, 9, 18, 21]
    },
    attributes: {
      first_name: "john",
      last_name: "DOE",
      email: "jdoe@mymail.com",
      name: "DOE john",
      supplier_holding: "AB INBEV",
    }
  }

  got.post.mockResolvedValueOnce({
    body: '{"url":"https://carrefour.cloud.looker.com/login/embed"}'
  })
  got.extend.mockReturnValueOnce({
    get: (url) => {
      throw new Error('404 - Not Found')
    }
  })

  await expect(
    looker.getOrCreateEmbedUser('john_DOE', source)
  ).rejects.toBeDefined()
})
