// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const SecretManager = require("./secret_manager")

const projectId = '11044440778'

jest.setTimeout(30000)

test('adddeleteSecret', async () => {
  const sm = new SecretManager(projectId)
  const secretId = 'test'

  try {
    await sm.deleteSecret(secretId)
  } catch (err) {
    console.log(err)
  }

  const secret = await sm.addSecret(secretId)
  console.log(secret)
  expect(secret).toBeDefined()

  await sm.deleteSecret(secretId)
})

test('listSecrets', async () => {
  const sm = new SecretManager(projectId)

  try {
    const secrets = await sm.listSecrets()
    console.log(secrets)
    expect(secrets).toBeDefined()
    expect(secrets.length).not.toBe(0)
  } catch (err) {
    console.error(err)
    throw err
  }
})

test('getSecret', async () => {
  const sm = new SecretManager(projectId)
  const secretId = 'sso-client-secret'

  const secret = await sm.getSecret(secretId)
  console.log(secret)
  expect(secret).toBeDefined()
})

test('getSecretValue', async () => {
  const sm = new SecretManager(projectId)
  const secretId = 'sso-client-secret'

  const value = await sm.getSecretValue(secretId)
  console.log(value)
  expect(value).toBe('K5eghBHw_r_LtQi6fd')
})
