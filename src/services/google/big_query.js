// Copyright Carrefour(2021)
//

const { BigQuery } = require('@google-cloud/bigquery')
const Project = require('./project')

/** Class representing a Google Cloud Big Query.
 * @extends Project
 */
class GCBigQuery extends Project {
  /**
   * Create a Big Query Instance.
   * @param {string} projectId - The GCP project identifier.
   */
  constructor(projectId) {
    super(projectId)
    this.bigquery = new BigQuery()
  }

  throwError (err) {
    if (!err) {
      return
    }
    let msg = err.toString()
    if (err.message && typeof err.message === 'string') {
      msg = err.message
    }
    throw new Error(`GCBigQuery(${this.projectId}): ${msg}`)
  }

  // Dataset

  /**
   * Create a dataset.
   *
   * @async
   * @param {string} datasetId ID of the dataset to create.
   * @param {object} [options] A Dataset resource.
   * @return {Promise<Dataset>} The newly created dataset.
   */
  async createDataset (datasetId, options) {
    try {
      const [dataset] = await this.bigquery.createDataset(datasetId, options)
      return dataset
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Delete a dataset.
   *
   * @async
   * @param {string} datasetId ID of the dataset to delete.
   */
  async deleteDataset (datasetId) {
    try {
      const dataset = this.bigquery.dataset(datasetId)
      await dataset.delete({ force: true })
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Get the dataset if it exists.
   *
   * @async
   * @param {string} datasetId ID of the dataset to retrieve.
   * @return {Promise<Dataset>} The dataset.
   */
  async getDataset (datasetId) {
    try {
      const dataset = this.bigquery.dataset(datasetId)
      const [result] = await dataset.get()
      return result
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * List all datasets in your project.
   *
   * @async
   * @return {Promise<Dataset[]>} The list of datasets.
   */
  async listDatasets () {
    try {
      const [datasets] = await this.bigquery.getDatasets()
      return datasets
    } catch (err) {
      this.throwError(err)
    }
  }

  // Table

  /**
   * Create a Table given a tableId or configuration object.
   *
   * @async
   * @param {string} datasetId ID of the dataset.
   * @param {string} tableId Table id.
   * @param {object} [options] See a
   *  {@link https://cloud.google.com/bigquery/docs/reference/v2/tables#resource| Table resource}.
   * @return {Promise<Table>} The created table.
   */
  async createTable (datasetId, tableId, options) {
    try {
      const dataset = this.bigquery.dataset(datasetId)
      const [table] = await dataset.createTable(tableId, options)
      return table
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Delete a given Table.
   *
   * @async
   * @param {string} datasetId ID of the dataset.
   * @param {string} tableId Table id.
   */
  async deleteTable (datasetId, tableId) {
    try {
      const dataset = this.bigquery.dataset(datasetId)
      await dataset.table(tableId).delete()
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * List all Tables.
   *
   * @async
   * @param {string} datasetId ID of the dataset.
   * @return {Promise<Table[]>} The list of tables.
   */
  async listTables (datasetId) {
    try {
      const dataset = this.bigquery.dataset(datasetId)
      const [tables] = await dataset.getTables()
      return tables
    } catch (err) {
      this.throwError(err)
    }
  }

  // View

  /**
   * Create a view.
   *
   * @async
   * @param {string} datasetId ID of the dataset.
   * @param {string} tableId Table id.
   * @param {query} query The view query.
   * @return {Promise<Table>} The table.
   */
  async createView (datasetId, tableId, query) {
    try {
      const options = {
        view: query,
      }
      const dataset = this.bigquery.dataset(datasetId)
      const [view] = await dataset.createTable(tableId, options)
      return view
    } catch (err) {
      this.throwError(err)
    }
  }

  // Query

  /**
   * Execute a query.
   *
   * @async
   * @param {query} query The query.
   * @return {Promise<any[]>} The query results.
   */
  async query (query) {
    try {
      const options = {
        query: query,
        location: 'US',
      }
      const [job] = await this.bigquery.createQueryJob(options)
      const [rows] = await job.getQueryResults()

      return rows
    } catch (err) {
      this.throwError(err)
    }
  }

  /**
   * Insert a record in a table.
   *
   * @async
   * @param {string} datasetId ID of the dataset.
   * @param {string} tableId Table id.
   * @param {any} rows  The rows to insert into the table.
   */
  async insert (datasetId, tableId, rows) {
    try {
      await this.bigquery
        .dataset(datasetId)
        .table(tableId)
        .insert(rows)
    } catch (err) {
      this.throwError(err)
    }
  }
}

module.exports = GCBigQuery
