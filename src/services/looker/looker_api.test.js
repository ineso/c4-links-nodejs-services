// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const _ = require('lodash')
const LookerAPI = require('./looker_api')

const config = {
  instanceId: 'Carrefour',
  host: 'carrefour.cloud.looker.com',
  clientId: '2y8BM7pGQnh3VJh7wQZg',
  clientSecret: 'JWPDZJhBG5pSgJHxyXXrNnfy',
  embedHost: 'dev.looker.growth.carrefour.com',
  embedSecret: '553b23f084540b84fd7d16aa5395e696cc874063993388b59a35677c957cd2c8',
  signWithEndpoint: false,
  timeout: {
    connect: 60000,
    request: 300000
  },
  retries: 1,
  pingUrl: 'looks/163',
  defaultUserId: 79,
}

jest.setTimeout(30000)

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

test('login_logout', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  sleep(1000)
  await looker.login()
  await looker.logout()

  let cfg = Object.assign({}, config)
  cfg.clientSecret = 'xxxxxx'
  looker = new LookerAPI(cfg)
  await expect(
    looker.login()
  ).rejects.toBeDefined()
})

test('loginAsUser', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  sleep(500)

  const users = await looker.getEmbdedUsers(false)
  expect(users).toBeDefined()
  console.log('users=', users)
  expect(users.len).not.toEqual(0)
  const user_id = users[0].id

  let session = await looker.loginAsUser(user_id)
  expect(session).toBeDefined()
  console.log('session=', session)
  expect(looker.accessToken).not.toEqual(session.accessToken)
  sleep(500)

  session = await looker.loginAsUser(user_id)
  expect(session).toBeDefined()
  console.log('session=', session)
  expect(looker.accessToken).not.toEqual(session.accessToken)

  await looker.logout()
})

test('getSessionConfig', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getSessionConfig()
  expect(response).toBeDefined()
  expect(response).not.toEqual({})
  await looker.logout()
})

test('getPasswordConfig', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getPasswordConfig()
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  await looker.logout()
})

test('createSSOEmbedUrl', async () => {
  let looker = new LookerAPI(config)

  const params = {
    target_url: 'https://carrefour.cloud.looker.com/dashboards-next/259',
    session_length: 86400,
    force_logout_login: true,
    external_user_id: 'john_DOE',
    first_name: 'john',
    last_name: 'DOE',
    permissions: [],
    models: [],
    group_ids: [1, 6, 9],
    external_group_id: 'Nile',
    user_attributes: {
      first_name: "john",
      last_name: "DOE",
      email: "jdoe@mymail.com",
      name: "DOE john",
      supplier_holding: "Nile"
    }
  }

  await looker.login()
  let response = await looker.createSSOEmbedUrl(params)
  console.log(response)
  expect(response.url.length).not.toBe(0)

  await looker.logout()
})

test('getCurrentUser', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let response = await looker.getCurrentUser()
    console.log('response=', response)
    expect(response).toBeDefined()
    expect(response).not.toEqual({})
  } finally {
    await looker.logout()
  }
})

test('getAllUsers', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let response = await looker.getAllUsers()
    console.log('response=', _.map(response, (val) => {
      return {
        id: val.id,
        first_name: val.first_name,
        last_name: val.last_name,
        email: val.email
      }
    }))
    expect(response).toBeDefined()
  } finally {
    await looker.logout()
  }
})

test('getUser', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let user = await looker.getCurrentUser()
    let response = await looker.getUser(user.id)
    console.log('response=', response)

    expect(response).toBeDefined()
  } finally {
    await looker.logout()
  }
})

test('getEmbedUser', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let response = await looker.getEmbedUser('inbev_datashopper')
    console.log('response=', response)

    await expect(
      looker.getEmbedUser('xxxxxx')
    ).rejects.toBeDefined()

  } finally {
    await looker.logout()
  }
})

test('getEmbdedUsers', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let response = await looker.getEmbdedUsers()
    console.log('response=', response)
    expect(response).toBeDefined()

    response = await looker.getEmbdedUsers(false)
    console.log('response=', JSON.stringify(response))
    expect(response).toBeDefined()

    response = await looker.getEmbdedUsers(true)
    console.log('response=', JSON.stringify(response))
    expect(response).toBeDefined()
  } finally {
    await looker.logout()
  }
})

test('searchUsers', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let response = await looker.searchUsers('John', 'DOE')
    console.log('response=', response)
    expect(response).toBeDefined()
    expect(response.length).toEqual(1)
  } finally {
    await looker.logout()
  }
})

test('createUser', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    /*
    await looker.createUser({
      email: 'johndoe@mail.com',
      first_name: 'John',
      last_name: 'Doe',
      locale: 'fr_FR',
      display_name: 'John DOE',
      group_ids: [1],
      is_disabled: false,
      role_ids: [2],
      can: {
        show: true,
        index: true,
        show_details: true,
        index_details: true,
        sudo: true
      }
    })
    */
  } finally {
    await looker.logout()
  }
})

test('deleteUser', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    /*
    let response = await looker.getAllUsers()
    const user = _.find(response, { first_name: 'John', last_name: 'Doe', locale: 'fr_FR' })
    console.log('user=', user)
    expect(user).toBeDefined()
    await looker.deleteUser(user.id)
    */
  } finally {
    await looker.logout()
  }
})

test('getUserAttributeValues', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let user = await looker.getCurrentUser()
    let response = await looker.getUserAttributeValues(user.id)
    console.log('response=', response)
    expect(response).toBeDefined()
  } finally {
    await looker.logout()
  }
})

test('getUserRoles', async () => {
  let looker = new LookerAPI(config)

  try {
    await looker.login()
    let user = await looker.getCurrentUser()
    let response = await looker.getUserRoles(user.id)
    console.log('response=', response)
    expect(response).toBeDefined()
  } finally {
    await looker.logout()
  }
})

test('getFolder', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getFolder('91')
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  await expect(
    looker.getFolder('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getAllFolders', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getAllFolders()
  expect(response).toBeDefined()
  expect(response).not.toEqual([])
  await looker.logout()
})

test('getFolderChildren', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getFolderChildren('91')
  expect(response).toBeDefined()
  expect(response).toEqual([])

  await expect(
    looker.getFolderChildren('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getFolderParent', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getFolderParent('91')
  expect(response).toBeDefined()
  expect(response).not.toEqual([])

  await expect(
    looker.getFolderParent('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getFolderAncestors', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getFolderAncestors('91')
  expect(response).toBeDefined()
  expect(response).not.toEqual([])

  await expect(
    looker.getFolderAncestors('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getFolderLooks', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getFolderLooks('91')
  expect(response).toBeDefined()
  expect(response).toEqual([])

  await expect(
    looker.getFolderLooks('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getFolderDashboards', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getFolderDashboards('91')
  expect(response).toBeDefined()
  expect(response).toEqual([])

  await expect(
    looker.getFolderDashboards('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getAllDashboards', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getAllDashboards()
  expect(response).toBeDefined()
  expect(response).not.toEqual([])
  await looker.logout()
})

test('getDashboard', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getDashboard('249')
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  await expect(
    looker.getDashboard('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getAllDashboardFilters', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getAllDashboardFilters('249')
  expect(response).toBeDefined()
  expect(response).not.toEqual([])

  await looker.logout()
})

test('getDashboardFilter', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getDashboardFilter('2948')
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  await expect(
    looker.getDashboardFilter('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('getAllLooks', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getAllLooks()
  expect(response).toBeDefined()
  expect(response).not.toEqual([])
  await looker.logout()
})


test('getLook', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getLook('307')
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  await expect(
    looker.getLook('xxx')
  ).rejects.toBeDefined()

  await looker.logout()
})

test('runLook', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.runLook('307', 'json_detail')
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  response = await looker.runLook('307', 'json_detail', { limit: '100000' })
  expect(response).toBeDefined()
  expect(response).not.toEqual({})

  await expect(
    looker.runLook('xxx', 'json_detail')
  ).rejects.toBeDefined()

  response = await looker.runLook(316, 'json',
    {
      limit: '100000',
      filters: {
        'sbs_source_weekly.supplier_holding_key': ['670']
      }
    })
  expect(response).toBeDefined()
  console.log(response)

  await looker.logout()
})

test('fetchLookAndRunQuery', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.fetchLookAndRunQuery(316, 'json', '100000', {
    'sbs_source_weekly.supplier_holding_key': '170'
  })
  expect(response).toBeDefined()
  console.log(response)
  expect(response).not.toEqual([])
})

test('runInlineQuery', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.runInlineQuery({
    view: 'sbs_source_weekly',
    model: 'sbs',
    limit: '100000',
    fields: [
      'sbs_source_weekly.supplier_holding_key',
      'sbs_source_weekly.supplier_holding_desc'
    ],
    filters: { 'sbs_source_weekly.supplier_holding_key': '170' },
    query_timezone: 'Europe/Paris'
  }, 'json')
  expect(response).toBeDefined()
  console.log(response)
  expect(response).not.toEqual([])
})

test('getAllRunningQueries', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  let response = await looker.getAllRunningQueries()
  expect(response).toBeDefined()
  await looker.logout()
})

test('getQuery', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  const response = await looker.getQuery('169377')
  expect(response).toBeDefined()
  console.log(response)
  expect(response).not.toEqual({})
  await looker.logout()
})

test('runQuery', async () => {
  let looker = new LookerAPI(config)

  await looker.login()
  const response = await looker.runQuery('169377', 'json', {
    limit: '100'
  })
  expect(response).toBeDefined()
  console.log(response)
  expect(response).not.toEqual([])
  await looker.logout()
})

test('getOrCreateEmbedUser', async () => {
  const looker = new LookerAPI(config)

  const source = {
    profile: {
      email: "jdoe@mymail.com",
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
      supplier_department: "",
      store_type: "",
      brand: "",
      supplier_country: "'Argentina','Belgium','France','Italy'",
      can_access_competition: "Yes",
      can_access_custom_category: "Yes",
      can_access_store: "Yes",
      can_send_to_sftp: "Yes"
    }
  }

  await looker.login()
  let response = await looker.getOrCreateEmbedUser('john_DOE', source)
  console.log(response)
  expect(response).toBeDefined()

  response = await looker.getOrCreateEmbedUser('john_DOE', source)
  console.log(response)
  expect(response).toBeDefined()

  response = await looker.getOrCreateEmbedUser('john_DOE', source, true)
  console.log(response)
  expect(response).toBeDefined()

  await looker.logout()
})
