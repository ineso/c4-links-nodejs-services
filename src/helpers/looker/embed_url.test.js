// Copyright Carrefour(2021)
//

/* eslint-disable no-undef, no-console, no-undefined */

const LookerEmbedURL = require("./embed_url")

const config = {
  instanceId: 'Carrefour',
  embedHost: 'analytics.mycompany.com:8888',
  embedSecret: 'abcdcedfgh',
}

test('generateNonce', () => {
  // Nominal cases

  let length = LookerEmbedURL.generateNonce(16).length
  expect(length).toBe(16)

  length = LookerEmbedURL.generateNonce(20).length
  expect(length).toBe(20)
})

test('generateSignature', () => {
  let looker = new LookerEmbedURL(config)

  // Nominal cases
  let embed = '/login/embed/' + encodeURIComponent('/embed/dashboards/1')
  let params = {
    nonce: JSON.stringify('ABCDEFGHIJKL'),
    time: JSON.stringify(1631694936),
    session_length: JSON.stringify(86400),
    external_user_id: JSON.stringify('user-4'),
    permissions: JSON.stringify(['access_data', 'see_looks']),
    models: JSON.stringify(['model_one', 'model_two']),
    access_filters: JSON.stringify({}),
  }
  let expeted = "9ahvFLV0IvrSceAl0HplINp2eMI="
  expect(looker.generateSignature(embed, params)).toBe(expeted)

  embed = '/login/embed/' + encodeURIComponent('/embed/dashboards/2')
  params = {
    nonce: JSON.stringify('abc123'),
    time: JSON.stringify(1561486800),
    session_length: JSON.stringify(3600),
    external_user_id: JSON.stringify('user1'),
    permissions: JSON.stringify(['access_data', 'see_looks', 'see_user_dashboards']),
    models: JSON.stringify(['powered_by', 'thelook']),
    group_ids: JSON.stringify([1, 2, 3]),
    external_group_id: JSON.stringify('group1'),
    user_attributes: JSON.stringify({ 'locale': 'en_US' }),
    access_filters: JSON.stringify({ 'powered_by': { 'products.brand': 'Allegra K' } })
  }
  expeted = "wrk/oGvW23asS/cNTqp8lzO/qdc="
  expect(looker.generateSignature(embed, params)).toBe(expeted)

  // Error cases
  expect(() => {
    looker.generateSignature(null, params)
  }).toThrow("embed is mandatory")

  expect(() => {
    looker.generateSignature(embed, null)
  }).toThrow("params is mandatory")
})

test('buildURL', () => {
  // Nominal cases
  let looker = new LookerEmbedURL(config)
  let src = "/embed/dashboards-next/1"
  let user = {
    external_user_id: "user-4",
    first_name: "John",
    last_name: "Doe",
    session_length: 86400,
    force_logout_login: true,
    permissions: ['access_data', 'see_user_dashboards', 'see_looks'],
    models: ['model_one', 'model_two'],
    group_ids: [4, 3],
    external_group_id: "Accounting",
    user_attributes: { "locale": "fr_FR" },
    user_timezone: "Europe/Paris",
  }

  let url = looker.buildURL(src, user)

  expect(url).toContain('https://analytics.mycompany.com:8888/login/embed/')
  expect(url).toContain('/embed/%2Fembed%2Fdashboards-next%2F1')
  expect(url).toContain('session_length=86400')
  expect(url).toContain('external_user_id=%22user-4%22')
  expect(url).toContain('permissions=%5B%22access_data%22%2C' +
    '%22see_user_dashboards%22%2C' +
    '%22see_looks%22%5D')
  expect(url).toContain('models=%5B%22model_one%22%2C%22model_two%22%5D')
  expect(url).toContain('access_filters=%7B%7D')
  expect(url).toContain('force_logout_login=true')
  expect(url).toContain('group_ids=%5B4%2C3%5D')
  expect(url).toContain('external_group_id=%22Accounting%22')
  expect(url).toContain('user_timezone=%22Europe%2FParis%22')

  looker.buildURL(src, user)

  // Error cases
  expect(() => {
    looker.buildURL(null, user)
  }).toThrow("src is mandatory")

  expect(() => {
    looker.buildURL(src, null)
  }).toThrow("user is mandatory")
})

test('real', () => {
  let looker = new LookerEmbedURL({
    instanceId: 'Carrefour',
    embedHost: 'carrefour.cloud.looker.com',
    embedSecret: '553b23f084540b84fd7d16aa5395e696cc874063993388b59a35677c957cd2c8',
  })

  let src = '/embed/dashboards-next/259'
  let user = {
    external_user_id: "alexandre_costantini",
    first_name: "Alexandre",
    last_name: "Costantini",
    session_length: 86400,
    force_logout_login: true,
    permissions: [
      'access_data',
      'see_looks',
      'see_user_dashboards'
    ],
    models: ['powered_by', 'thelook', 'extension'],
    group_ids: [1, 4, 5],
    external_group_id: 'admin',
    user_attributes: {},
    user_timezone: 'Europe/Paris',
  }

  let url = looker.buildURL(src, user)

  console.log(url)
})
