// Copyright Carrefour(2021)
//

/* eslint-disable no-undef, no-console, no-undefined */

const GCBigQuery = require("./big_query")


const projectId = '11044440778'

test('createDataset', async () => {
  const bq = new GCBigQuery(projectId)
  await bq.createDataset('dataset_test')
})

test('getDataset', async () => {
  const bq = new GCBigQuery(projectId)
  await bq.getDataset('dataset_test')
})

test('listDatasets', async () => {
  const bq = new GCBigQuery(projectId)
  await bq.listDatasets()
})

test('deleteDataset', async () => {
  const bq = new GCBigQuery(projectId)
  await bq.deleteDataset('dataset_test')
})

test('createTable', async () => {
  // TODO
})

test('deleteTable', async () => {
  // TODO
})

test('listTables', async () => {
  // TODO
})

test('createView', async () => {
  // TODO
})

test('query', async () => {
  // TODO
})

test('insert', async () => {
  // TODO
})
