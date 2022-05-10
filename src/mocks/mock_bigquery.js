// Copyright Carrefour(2021)
//

/* eslint-disable no-shadow, no-console */


module.exports = class MockBigQuery {

  // Dataset

  async createDataset (datasetId, options) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  async deleteDataset (datasetId) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  async getDataset (datasetId) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  async listDatasets () {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  // Table

  async createTable (datasetId, tableId, options) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  async deleteTable (datasetId, tableId) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  async listTables (datasetId) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  // View

  async createView (datasetId, tableId, query) {
    // NOT IMPLEMENTED
    await Promise.reject(new Error('Not implemented yet !'))
  }

  // Query

  async query (query) {
    await new Promise((resolve) => {
      console.log(`MockBigQuery: ${query}`)
      resolve()
    })
  }

  async insert (datasetId, tableId, rows) {
    await new Promise((resolve) => {
      console.log(`MockBigQuery: ${datasetId}: ${tableId}: ${rows}`)
      resolve()
    })
  }
}
