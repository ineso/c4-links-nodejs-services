# Carrefour Links NodeJS Services

## Description

This project contains common NodeJS modules for Carrefour Links projects.

- services
  - google
    - big_query
    - logger
    - secret_manager
    - storage
  - looker
    - looker_api
  - mail
    - mail
  - oodrive
    - file_connect
  - webserver
    - web_server

## Classes

<dl>
<dt><a href="#GCBigQuery">GCBigQuery</a> ⇐ <code><a href="#Project">Project</a></code></dt>
<dd><p>Class representing a Google Cloud Big Query.</p>
</dd>
<dt><a href="#GCCachedStorage">GCCachedStorage</a> ⇐ <code><a href="#Project">Project</a></code></dt>
<dd><p>Class representing a Cached Google Cloud Storage.</p>
</dd>
<dt><a href="#GCLogger">GCLogger</a> ⇐ <code><a href="#Project">Project</a></code></dt>
<dd><p>Class representing a Google Cloud Logger.</p>
</dd>
<dt><a href="#Project">Project</a></dt>
<dd><p>Class representing a Project.</p>
</dd>
<dt><a href="#GCSecretManager">GCSecretManager</a> ⇐ <code><a href="#Project">Project</a></code></dt>
<dd><p>Class representing a Google Cloud Secret Manager.</p>
</dd>
<dt><a href="#GCStorage">GCStorage</a> ⇐ <code><a href="#Project">Project</a></code></dt>
<dd><p>Class representing a Google Cloud Storage.</p>
</dd>
<dt><a href="#LookerAPI">LookerAPI</a></dt>
<dd><p>Class representing a Looker API.</p>
</dd>
<dt><a href="#Mail">Mail</a></dt>
<dd><p>Class for sending emails.</p>
</dd>
<dt><a href="#FileConnect">FileConnect</a></dt>
<dd><p>Class representing a FileConnect to the OODrive API.</p>
</dd>
<dt><a href="#WebServer">WebServer</a></dt>
<dd><p>Class representing a Web Server Application.</p>
</dd>
<dt><a href="#WebStatistics">WebStatistics</a></dt>
<dd><p>Class representing Web Statistics.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#forceUnicodeEncoding">forceUnicodeEncoding(val)</a> ⇒ <code>string</code></dt>
<dd><p>Force a string to be UnicodeEncoding</p>
</dd>
<dt><a href="#stringifyParameters">stringifyParameters(params, signature)</a> ⇒ <code>string</code></dt>
<dd><p>Build and concatenate the parameters in an URI parameter string.</p>
</dd>
</dl>

<a name="GCBigQuery"></a>

## GCBigQuery ⇐ [<code>Project</code>](#Project)

Class representing a Google Cloud Big Query.

**Kind**: global class  
**Extends**: [<code>Project</code>](#Project)  

- [GCBigQuery](#GCBigQuery) ⇐ [<code>Project</code>](#Project)
  - [new GCBigQuery(projectId)](#new_GCBigQuery_new)
  - [.id](#Project+id) ⇒ <code>string</code>
  - [.createDataset(datasetId, [options])](#GCBigQuery+createDataset) ⇒ <code>Dataset</code>
  - [.deleteDataset(datasetId)](#GCBigQuery+deleteDataset)
  - [.getDataset(datasetId)](#GCBigQuery+getDataset) ⇒ <code>Dataset</code>
  - [.listDatasets()](#GCBigQuery+listDatasets) ⇒ <code>Array.&lt;Dataset&gt;</code>
  - [.createTable(datasetId, tableId, [options])](#GCBigQuery+createTable) ⇒ <code>Table</code>
  - [.deleteTable(datasetId, tableId)](#GCBigQuery+deleteTable)
  - [.listTables(datasetId)](#GCBigQuery+listTables) ⇒ <code>Array.&lt;Table&gt;</code>
  - [.createView(datasetId, tableId, query)](#GCBigQuery+createView) ⇒ <code>Table</code>
  - [.query(query)](#GCBigQuery+query) ⇒ <code>Array.&lt;any&gt;</code>
  - [.insert(datasetId, tableId, rows)](#GCBigQuery+insert)
  - [.getDetails()](#Project+getDetails) ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

<a name="new_GCBigQuery_new"></a>

### new GCBigQuery(projectId)

Create a Big Query Instance.

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>string</code> | The GCP project identifier. |

<a name="Project+id"></a>

### GCBigQuery.id ⇒ <code>string</code>

Get the GCP project identifier.

**Kind**: instance property of [<code>GCBigQuery</code>](#GCBigQuery)  
**Overrides**: [<code>id</code>](#Project+id)  
**Returns**: <code>string</code> - The GCP project identifier.  
<a name="GCBigQuery+createDataset"></a>

### GCBigQuery.createDataset(datasetId, [options]) ⇒ <code>Dataset</code>

Create a dataset.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Dataset</code> - The newly created dataset.  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset to create. |
| [options] | <code>object</code> | A Dataset resource. |

<a name="GCBigQuery+deleteDataset"></a>

### GCBigQuery.deleteDataset(datasetId)

Delete a dataset.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset to delete. |

<a name="GCBigQuery+getDataset"></a>

### GCBigQuery.getDataset(datasetId) ⇒ <code>Dataset</code>

Get the dataset if it exists.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Dataset</code> - The dataset.  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset to retrieve. |

<a name="GCBigQuery+listDatasets"></a>

### GCBigQuery.listDatasets() ⇒ <code>Array.&lt;Dataset&gt;</code>

List all datasets in your project.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Array.&lt;Dataset&gt;</code> - The list of datasets.  
<a name="GCBigQuery+createTable"></a>

### GCBigQuery.createTable(datasetId, tableId, [options]) ⇒ <code>Table</code>

Create a Table given a tableId or configuration object.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Table</code> - The created table.  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset. |
| tableId | <code>string</code> | Table id. |
| [options] | <code>object</code> | See a  [Table resource](https://cloud.google.com/bigquery/docs/reference/v2/tables#resource). |

<a name="GCBigQuery+deleteTable"></a>

### GCBigQuery.deleteTable(datasetId, tableId)

Delete a given Table.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset. |
| tableId | <code>string</code> | Table id. |

<a name="GCBigQuery+listTables"></a>

### GCBigQuery.listTables(datasetId) ⇒ <code>Array.&lt;Table&gt;</code>

List all Tables.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Array.&lt;Table&gt;</code> - The list of tables.  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset. |

<a name="GCBigQuery+createView"></a>

### GCBigQuery.createView(datasetId, tableId, query) ⇒ <code>Table</code>

Create a view.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Table</code> - The table.  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset. |
| tableId | <code>string</code> | Table id. |
| query | <code>query</code> | The view query. |

<a name="GCBigQuery+query"></a>

### GCBigQuery.query(query) ⇒ <code>Array.&lt;any&gt;</code>

Execute a query.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Returns**: <code>Array.&lt;any&gt;</code> - The query results.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>query</code> | The query. |

<a name="GCBigQuery+insert"></a>

### GCBigQuery.insert(datasetId, tableId, rows)

Insert a record in a table.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  

| Param | Type | Description |
| --- | --- | --- |
| datasetId | <code>string</code> | ID of the dataset. |
| tableId | <code>string</code> | Table id. |
| rows | <code>any</code> | The rows to insert into the table. |

<a name="Project+getDetails"></a>

### GCBigQuery.getDetails() ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

Retrieve project details.

**Kind**: instance method of [<code>GCBigQuery</code>](#GCBigQuery)  
**Overrides**: [<code>getDetails</code>](#Project+getDetails)  
<a name="GCCachedStorage"></a>

## GCCachedStorage ⇐ [<code>Project</code>](#Project)

Class representing a Cached Google Cloud Storage.

**Kind**: global class  
**Extends**: [<code>Project</code>](#Project)  

- [GCCachedStorage](#GCCachedStorage) ⇐ [<code>Project</code>](#Project)
  - [new GCCachedStorage(projectId, bucketName, ttl)](#new_GCCachedStorage_new)
  - [.id](#Project+id) ⇒ <code>string</code>
  - [.getFile(fileName)](#GCCachedStorage+getFile) ⇒ <code>string</code>
  - [.getDetails()](#Project+getDetails) ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

<a name="new_GCCachedStorage_new"></a>

### new GCCachedStorage(projectId, bucketName, ttl)

Create a Cached Storage.

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>string</code> | The GCP project identifier. |
| bucketName | <code>string</code> | The name of the bucket to use. |
| ttl | <code>string</code> | Time to live in milliseconds. |

<a name="Project+id"></a>

### GCCachedStorage.id ⇒ <code>string</code>

Get the GCP project identifier.

**Kind**: instance property of [<code>GCCachedStorage</code>](#GCCachedStorage)  
**Overrides**: [<code>id</code>](#Project+id)  
**Returns**: <code>string</code> - The GCP project identifier.  
<a name="GCCachedStorage+getFile"></a>

### GCCachedStorage.getFile(fileName) ⇒ <code>string</code>

List files in the bucket.

**Kind**: instance method of [<code>GCCachedStorage</code>](#GCCachedStorage)  
**Returns**: <code>string</code> - The content of the file.  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | The source filename. |

<a name="Project+getDetails"></a>

### GCCachedStorage.getDetails() ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

Retrieve project details.

**Kind**: instance method of [<code>GCCachedStorage</code>](#GCCachedStorage)  
**Overrides**: [<code>getDetails</code>](#Project+getDetails)  
<a name="GCLogger"></a>

## GCLogger ⇐ [<code>Project</code>](#Project)

Class representing a Google Cloud Logger.

**Kind**: global class  
**Extends**: [<code>Project</code>](#Project)  

- [GCLogger](#GCLogger) ⇐ [<code>Project</code>](#Project)
  - [new GCLogger(projectId, logName, level)](#new_GCLogger_new)
  - [.id](#Project+id) ⇒ <code>string</code>
  - [.list(fromdate, severity, maxsize)](#GCLogger+list) ⇒ <code>Array.&lt;Object&gt;</code>
  - [.debug(message)](#GCLogger+debug)
  - [.info(message)](#GCLogger+info)
  - [.warn(message)](#GCLogger+warn)
  - [.error(message)](#GCLogger+error)
  - [.fatal(message)](#GCLogger+fatal)
  - [.http(method, url, status, agent, size, message)](#GCLogger+http)
  - [.getDetails()](#Project+getDetails) ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

<a name="new_GCLogger_new"></a>

### new GCLogger(projectId, logName, level)

Create a Logger.

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>string</code> | The GCP project identifier. |
| logName | <code>string</code> | The log name. |
| level | <code>string</code> | The minimum log level. |

<a name="Project+id"></a>

### GCLogger.id ⇒ <code>string</code>

Get the GCP project identifier.

**Kind**: instance property of [<code>GCLogger</code>](#GCLogger)  
**Overrides**: [<code>id</code>](#Project+id)  
**Returns**: <code>string</code> - The GCP project identifier.  
<a name="GCLogger+list"></a>

### GCLogger.list(fromdate, severity, maxsize) ⇒ <code>Array.&lt;Object&gt;</code>

Query logs from a given date with a given level of severity.

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  
**Returns**: <code>Array.&lt;Object&gt;</code> - log results  

| Param | Type |
| --- | --- |
| fromdate | <code>Date</code> |
| severity | <code>string</code> |
| maxsize | <code>number</code> |

<a name="GCLogger+debug"></a>

### GCLogger.debug(message)

Add a debug message

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  

| Param | Type |
| --- | --- |
| message | <code>string</code> |

<a name="GCLogger+info"></a>

### GCLogger.info(message)

Add an info message

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  

| Param | Type |
| --- | --- |
| message | <code>string</code> |

<a name="GCLogger+warn"></a>

### GCLogger.warn(message)

Add an warning message

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  

| Param | Type |
| --- | --- |
| message | <code>string</code> |

<a name="GCLogger+error"></a>

### GCLogger.error(message)

Add an error message

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  

| Param | Type |
| --- | --- |
| message | <code>string</code> |

<a name="GCLogger+fatal"></a>

### GCLogger.fatal(message)

Add an fatal message

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  

| Param | Type |
| --- | --- |
| message | <code>string</code> |

<a name="GCLogger+http"></a>

### GCLogger.http(method, url, status, agent, size, message)

Add an http log message

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  

| Param | Type |
| --- | --- |
| method | <code>string</code> |
| url | <code>string</code> |
| status | <code>string</code> |
| agent | <code>string</code> |
| size | <code>string</code> |
| message | <code>string</code> |

<a name="Project+getDetails"></a>

### GCLogger.getDetails() ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

Retrieve project details.

**Kind**: instance method of [<code>GCLogger</code>](#GCLogger)  
**Overrides**: [<code>getDetails</code>](#Project+getDetails)  
<a name="Project"></a>

## Project

Class representing a Project.

**Kind**: global class  

- [Project](#Project)
  - [new Project(projectId)](#new_Project_new)
  - _instance_
    - [.id](#Project+id) ⇒ <code>string</code>
    - [.getDetails()](#Project+getDetails) ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>
  - _static_
    - [.listAllProjects()](#Project.listAllProjects) ⇒ <code>Array.&lt;google.cloud.resourcemanager.v3.IProject&gt;</code>

<a name="new_Project_new"></a>

### new Project(projectId)

Create a Project.

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>string</code> | The GCP project identifier. |

<a name="Project+id"></a>

### Project.id ⇒ <code>string</code>

Get the GCP project identifier.

**Kind**: instance property of [<code>Project</code>](#Project)  
**Returns**: <code>string</code> - The GCP project identifier.  
<a name="Project+getDetails"></a>

### Project.getDetails() ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

Retrieve project details.

**Kind**: instance method of [<code>Project</code>](#Project)  
<a name="Project.listAllProjects"></a>

### Project.listAllProjects() ⇒ <code>Array.&lt;google.cloud.resourcemanager.v3.IProject&gt;</code>

list all projects.

**Kind**: static method of [<code>Project</code>](#Project)  
<a name="GCSecretManager"></a>

## GCSecretManager ⇐ [<code>Project</code>](#Project)

Class representing a Google Cloud Secret Manager.

**Kind**: global class  
**Extends**: [<code>Project</code>](#Project)  

- [GCSecretManager](#GCSecretManager) ⇐ [<code>Project</code>](#Project)
  - [new GCSecretManager(id)](#new_GCSecretManager_new)
  - [.id](#Project+id) ⇒ <code>string</code>
  - [.addSecret(secretId)](#GCSecretManager+addSecret)
  - [.deleteSecret(secretId)](#GCSecretManager+deleteSecret)
  - [.listSecrets()](#GCSecretManager+listSecrets) ⇒ <code>Array.&lt;google.cloud.secretmanager.v1.ISecret&gt;</code>
  - [.getSecret(secretId)](#GCSecretManager+getSecret) ⇒ <code>google.cloud.secretmanager.v1.ISecret</code>
  - [.getSecretValue(secretId, version)](#GCSecretManager+getSecretValue) ⇒ <code>string</code>
  - [.getDetails()](#Project+getDetails) ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

<a name="new_GCSecretManager_new"></a>

### new GCSecretManager(id)

Create a Logger.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The GCP project identifier. |

<a name="Project+id"></a>

### GCSecretManager.id ⇒ <code>string</code>

Get the GCP project identifier.

**Kind**: instance property of [<code>GCSecretManager</code>](#GCSecretManager)  
**Overrides**: [<code>id</code>](#Project+id)  
**Returns**: <code>string</code> - The GCP project identifier.  
<a name="GCSecretManager+addSecret"></a>

### GCSecretManager.addSecret(secretId)

Add a secret.

**Kind**: instance method of [<code>GCSecretManager</code>](#GCSecretManager)  

| Param | Type | Description |
| --- | --- | --- |
| secretId | <code>string</code> | the secret ID. |

<a name="GCSecretManager+deleteSecret"></a>

### GCSecretManager.deleteSecret(secretId)

Delete a secretId.

**Kind**: instance method of [<code>GCSecretManager</code>](#GCSecretManager)  

| Param | Type | Description |
| --- | --- | --- |
| secretId | <code>string</code> | the secret ID. |

<a name="GCSecretManager+listSecrets"></a>

### GCSecretManager.listSecrets() ⇒ <code>Array.&lt;google.cloud.secretmanager.v1.ISecret&gt;</code>

List all secrets.

**Kind**: instance method of [<code>GCSecretManager</code>](#GCSecretManager)  
**Returns**: <code>Array.&lt;google.cloud.secretmanager.v1.ISecret&gt;</code> - list of secrets  
<a name="GCSecretManager+getSecret"></a>

### GCSecretManager.getSecret(secretId) ⇒ <code>google.cloud.secretmanager.v1.ISecret</code>

Get secret details.

**Kind**: instance method of [<code>GCSecretManager</code>](#GCSecretManager)  
**Returns**: <code>google.cloud.secretmanager.v1.ISecret</code> - the secret  

| Param | Type | Description |
| --- | --- | --- |
| secretId | <code>string</code> | the secret ID. |

<a name="GCSecretManager+getSecretValue"></a>

### GCSecretManager.getSecretValue(secretId, version) ⇒ <code>string</code>

Get secret value for a given version.

**Kind**: instance method of [<code>GCSecretManager</code>](#GCSecretManager)  
**Returns**: <code>string</code> - payload.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| secretId | <code>string</code> |  | the secret ID. |
| version | <code>string</code> | <code>&quot;latest&quot;</code> | the version default is 'latest'. |

<a name="Project+getDetails"></a>

### GCSecretManager.getDetails() ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

Retrieve project details.

**Kind**: instance method of [<code>GCSecretManager</code>](#GCSecretManager)  
**Overrides**: [<code>getDetails</code>](#Project+getDetails)  
<a name="GCStorage"></a>

## GCStorage ⇐ [<code>Project</code>](#Project)

Class representing a Google Cloud Storage.

**Kind**: global class  
**Extends**: [<code>Project</code>](#Project)  

- [GCStorage](#GCStorage) ⇐ [<code>Project</code>](#Project)
  - [new GCStorage(projectId, bucketName)](#new_GCStorage_new)
  - [.id](#Project+id) ⇒ <code>string</code>
  - [.listFiles(options)](#GCStorage+listFiles) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
  - [.downloadFile(fileName, destFileName)](#GCStorage+downloadFile)
  - [.getFile(fileName)](#GCStorage+getFile) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.uploadFile(fileName, destFileName)](#GCStorage+uploadFile)
  - [.putFile(destFileName, data)](#GCStorage+putFile)
  - [.deleteFile(fileName)](#GCStorage+deleteFile)
  - [.moveFile(srcFileName, destFileName)](#GCStorage+moveFile)
  - [.getDetails()](#Project+getDetails) ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

<a name="new_GCStorage_new"></a>

### new GCStorage(projectId, bucketName)

Create a Storage.

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>string</code> | The GCP project identifier. |
| bucketName | <code>string</code> | The name of the bucket to use. |

<a name="Project+id"></a>

### GCStorage.id ⇒ <code>string</code>

Get the GCP project identifier.

**Kind**: instance property of [<code>GCStorage</code>](#GCStorage)  
**Overrides**: [<code>id</code>](#Project+id)  
**Returns**: <code>string</code> - The GCP project identifier.  
<a name="GCStorage+listFiles"></a>

### GCStorage.listFiles(options) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>

List files in the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - The array of filenames.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Query object for listing files. |

<a name="GCStorage+downloadFile"></a>

### GCStorage.downloadFile(fileName, destFileName)

Download a file from the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | The source filename. |
| destFileName | <code>string</code> | The destination filename. |

<a name="GCStorage+getFile"></a>

### GCStorage.getFile(fileName) ⇒ <code>Promise.&lt;string&gt;</code>

Download the content of a file from the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The content of the file.  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | The source filename. |

<a name="GCStorage+uploadFile"></a>

### GCStorage.uploadFile(fileName, destFileName)

Upload a file to the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | The source filename. |
| destFileName | <code>string</code> | The destination filename. |

<a name="GCStorage+putFile"></a>

### GCStorage.putFile(destFileName, data)

Upload the content of a file to the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  

| Param | Type | Description |
| --- | --- | --- |
| destFileName | <code>string</code> | The destination filename. |
| data | <code>string</code> | The content data. |

<a name="GCStorage+deleteFile"></a>

### GCStorage.deleteFile(fileName)

Delete a file in the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | The filename to delete. |

<a name="GCStorage+moveFile"></a>

### GCStorage.moveFile(srcFileName, destFileName)

Move a file in the bucket.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  

| Param | Type | Description |
| --- | --- | --- |
| srcFileName | <code>string</code> | The source filename to move. |
| destFileName | <code>string</code> | The destination filename. |

<a name="Project+getDetails"></a>

### GCStorage.getDetails() ⇒ <code>google.cloud.resourcemanager.v3.IProject</code>

Retrieve project details.

**Kind**: instance method of [<code>GCStorage</code>](#GCStorage)  
**Overrides**: [<code>getDetails</code>](#Project+getDetails)  
<a name="LookerAPI"></a>

## LookerAPI

Class representing a Looker API.

**Kind**: global class  

- [LookerAPI](#LookerAPI)
  - [.login()](#LookerAPI+login)
  - [.loginAsUser(user_id)](#LookerAPI+loginAsUser) ⇒ [<code>Promise.&lt;LookerAPI&gt;</code>](#LookerAPI)
  - [.logout()](#LookerAPI+logout)
  - [.getSessionConfig()](#LookerAPI+getSessionConfig) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getPasswordConfig()](#LookerAPI+getPasswordConfig) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.createSSOEmbedUrl(params)](#LookerAPI+createSSOEmbedUrl) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getCurrentUser()](#LookerAPI+getCurrentUser) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getAllUsers()](#LookerAPI+getAllUsers) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getUser(id)](#LookerAPI+getUser) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getEmbedUser(externalId)](#LookerAPI+getEmbedUser) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.searchUsers(first_name, last_name)](#LookerAPI+searchUsers) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getEmbdedUsers(disabled)](#LookerAPI+getEmbdedUsers) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.createUser(user)](#LookerAPI+createUser)
  - [.updateUser(user)](#LookerAPI+updateUser)
  - [.deleteUser(userId)](#LookerAPI+deleteUser)
  - [.getUserAttributeValues(userId)](#LookerAPI+getUserAttributeValues) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.setUserAttributeValue(userId, attributeId, attributeValue)](#LookerAPI+setUserAttributeValue) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.deleteUserAttribute(userId, attributeId)](#LookerAPI+deleteUserAttribute)
  - [.getUserRoles(userId)](#LookerAPI+getUserRoles) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getFolder(id)](#LookerAPI+getFolder) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getAllFolders()](#LookerAPI+getAllFolders) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getFolderChildren(id)](#LookerAPI+getFolderChildren) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getFolderParent(id)](#LookerAPI+getFolderParent) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getFolderAncestors(id)](#LookerAPI+getFolderAncestors) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getFolderLooks(id)](#LookerAPI+getFolderLooks) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getFolderDashboards(id)](#LookerAPI+getFolderDashboards) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getAllDashboards()](#LookerAPI+getAllDashboards) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getDashboard(id)](#LookerAPI+getDashboard) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getAllDashboardFilters(id)](#LookerAPI+getAllDashboardFilters) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getDashboardFilter(id)](#LookerAPI+getDashboardFilter) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getAllLooks()](#LookerAPI+getAllLooks) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getLook(id)](#LookerAPI+getLook) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.runLook(id, format, options)](#LookerAPI+runLook) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.fetchLookAndRunQuery(id, format, limit, filters)](#LookerAPI+fetchLookAndRunQuery) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getAllRunningQueries()](#LookerAPI+getAllRunningQueries) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.killRunningQuery(id)](#LookerAPI+killRunningQuery)
  - [.getQuery(id)](#LookerAPI+getQuery) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.runQuery(id, format, options)](#LookerAPI+runQuery) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.runInlineQuery(query, format, options)](#LookerAPI+runInlineQuery) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
  - [.getOrCreateEmbedUser(externalId, source, refresh)](#LookerAPI+getOrCreateEmbedUser) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="LookerAPI+login"></a>

### LookerAPI.login()

Present client credentials to obtain an authorization token.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
<a name="LookerAPI+loginAsUser"></a>

### LookerAPI.loginAsUser(user_id) ⇒ [<code>Promise.&lt;LookerAPI&gt;</code>](#LookerAPI)

Create a cloned session for the given user Id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: [<code>Promise.&lt;LookerAPI&gt;</code>](#LookerAPI) - The newly created LookerAPI object session.  

| Param | Type | Description |
| --- | --- | --- |
| user_id | <code>string</code> | Id of user. |

<a name="LookerAPI+logout"></a>

### LookerAPI.logout()

Logout of the API and invalidate the current access token.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
<a name="LookerAPI+getSessionConfig"></a>

### LookerAPI.getSessionConfig() ⇒ <code>Promise.&lt;Object&gt;</code>

Get session config.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The session configuration.  
<a name="LookerAPI+getPasswordConfig"></a>

### LookerAPI.getPasswordConfig() ⇒ <code>Promise.&lt;Object&gt;</code>

Get password config.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The password configuration.  
<a name="LookerAPI+createSSOEmbedUrl"></a>

### LookerAPI.createSSOEmbedUrl(params) ⇒ <code>Promise.&lt;Object&gt;</code>

Create SSO Embed URL.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The sso url.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | The object params. |

<a name="LookerAPI+getCurrentUser"></a>

### LookerAPI.getCurrentUser() ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about the current user; the user account currently calling the API.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The user information.  
<a name="LookerAPI+getAllUsers"></a>

### LookerAPI.getAllUsers() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get information about all users.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The list of users.  
<a name="LookerAPI+getUser"></a>

### LookerAPI.getUser(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about the user with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The list of users.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the user to retrieve. |

<a name="LookerAPI+getEmbedUser"></a>

### LookerAPI.getEmbedUser(externalId) ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about an embed user with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The list of users.  

| Param | Type | Description |
| --- | --- | --- |
| externalId | <code>string</code> | The external id of the user to retrieve. |

<a name="LookerAPI+searchUsers"></a>

### LookerAPI.searchUsers(first_name, last_name) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Returns all- user records that match the given search criteria.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The list of users.  

| Param | Type | Description |
| --- | --- | --- |
| first_name | <code>string</code> | The firstname. |
| last_name | <code>string</code> | The lastname. |

<a name="LookerAPI+getEmbdedUsers"></a>

### LookerAPI.getEmbdedUsers(disabled) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Returns all embed user records (can filter with disabled or not).

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The list of users.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | <code>boolean</code> | <code></code> | if defined select disabled user or not. |

<a name="LookerAPI+createUser"></a>

### LookerAPI.createUser(user)

Create a user with the specified information.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Promise.&lt;Object&gt;</code> | The user to create. |

<a name="LookerAPI+updateUser"></a>

### LookerAPI.updateUser(user)

Update information about the user.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The user to update. |

<a name="LookerAPI+deleteUser"></a>

### LookerAPI.deleteUser(userId)

Delete the user with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The user to delete. |

<a name="LookerAPI+getUserAttributeValues"></a>

### LookerAPI.getUserAttributeValues(userId) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get user attribute values for a given user.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - the user attribute values.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The user to use. |

<a name="LookerAPI+setUserAttributeValue"></a>

### LookerAPI.setUserAttributeValue(userId, attributeId, attributeValue) ⇒ <code>Promise.&lt;Object&gt;</code>

Store a custom value for a user attribute in a userÔÇÖs account settings.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The attribute value.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The user to use. |
| attributeId | <code>string</code> | The attribute id to store. |
| attributeValue | <code>Object</code> | The attribute value to store. |

<a name="LookerAPI+deleteUserAttribute"></a>

### LookerAPI.deleteUserAttribute(userId, attributeId)

Delete a user attribute value from a userÔÇÖs account settings.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The user to delete. |
| attributeId | <code>string</code> | The attribute id to store. |

<a name="LookerAPI+getUserRoles"></a>

### LookerAPI.getUserRoles(userId) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get user roles for a given user.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - the user roles.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The user to use. |

<a name="LookerAPI+getFolder"></a>

### LookerAPI.getFolder(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about the folder with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The Folder information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the folder. |

<a name="LookerAPI+getAllFolders"></a>

### LookerAPI.getAllFolders() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get information about all folders.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Folders information.  
<a name="LookerAPI+getFolderChildren"></a>

### LookerAPI.getFolderChildren(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get the children of a folder.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Folders information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the folder. |

<a name="LookerAPI+getFolderParent"></a>

### LookerAPI.getFolderParent(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Get the parent of a folder.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The Folders information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the folder. |

<a name="LookerAPI+getFolderAncestors"></a>

### LookerAPI.getFolderAncestors(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get the ancestors of a folder.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Folders information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the folder. |

<a name="LookerAPI+getFolderLooks"></a>

### LookerAPI.getFolderLooks(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get all looks in a folder.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Folders information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the folder. |

<a name="LookerAPI+getFolderDashboards"></a>

### LookerAPI.getFolderDashboards(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get the dashboards in a folder.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Dashboards information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the folder. |

<a name="LookerAPI+getAllDashboards"></a>

### LookerAPI.getAllDashboards() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get information about all active dashboards.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Dashboards information.  
<a name="LookerAPI+getDashboard"></a>

### LookerAPI.getDashboard(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about a dashboard.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The Dashboard information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the dashboard. |

<a name="LookerAPI+getAllDashboardFilters"></a>

### LookerAPI.getAllDashboardFilters(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get information about all the dashboard filters on a dashboard with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Filters information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the dashboard. |

<a name="LookerAPI+getDashboardFilter"></a>

### LookerAPI.getDashboardFilter(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about the dashboard filters with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The Filter information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the filter. |

<a name="LookerAPI+getAllLooks"></a>

### LookerAPI.getAllLooks() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Get information about all active Looks.
Returns an array of abbreviated Look objects describing all the looks that the
caller has access to.
Soft-deleted Looks are not included.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The Looks information.  
<a name="LookerAPI+getLook"></a>

### LookerAPI.getLook(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Returns detailed information about a Look and its associated Query.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The Look information.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the Look. |

<a name="LookerAPI+runLook"></a>

### LookerAPI.runLook(id, format, options) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Runs a given lookÔÇÖs query and returns the results in the requested format.
Supported formats are:
json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The result of the query.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the Look. |
| format | <code>string</code> | The result format (json, json_detail, csv, txt, ...). |
| options | <code>Object</code> | the optional parameters. |

<a name="LookerAPI+fetchLookAndRunQuery"></a>

### LookerAPI.fetchLookAndRunQuery(id, format, limit, filters) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Runs a given lookÔÇÖs query and returns the results in the requested format.
Supported formats are:
json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The result of the query.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the Look. |
| format | <code>string</code> | The result format (json, json_detail, csv, txt, ...). |
| limit | <code>string</code> | The Row limit (may override the limit in the saved query). |
| filters | <code>Object</code> | the filters parameters to overwrite. |

<a name="LookerAPI+getAllRunningQueries"></a>

### LookerAPI.getAllRunningQueries() ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about all running queries.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
<a name="LookerAPI+killRunningQuery"></a>

### LookerAPI.killRunningQuery(id)

Kill a query with a specific id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the query. |

<a name="LookerAPI+getQuery"></a>

### LookerAPI.getQuery(id) ⇒ <code>Promise.&lt;Object&gt;</code>

Get a previously created query by id.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The result of the query.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the query. |

<a name="LookerAPI+runQuery"></a>

### LookerAPI.runQuery(id, format, options) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Run a saved query.
Supported formats are:
json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The result of the query.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the query. |
| format | <code>string</code> | The result format (json, json_detail, csv, txt, ...). |
| options | <code>Object</code> | the optional parameters. |

<a name="LookerAPI+runInlineQuery"></a>

### LookerAPI.runInlineQuery(query, format, options) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

Run the query that is specified inline in the posted body.
Supported formats are:
json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - The result of the query.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | the query to execute. |
| format | <code>string</code> | The result format (json, json_detail, csv, txt, ...). |
| options | <code>Object</code> | the optional parameters. |

<a name="LookerAPI+getOrCreateEmbedUser"></a>

### LookerAPI.getOrCreateEmbedUser(externalId, source, refresh) ⇒ <code>Promise.&lt;Object&gt;</code>

Create if not exists the user profile and return its looker profile
with its attributes.

**Kind**: instance method of [<code>LookerAPI</code>](#LookerAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The result of the query.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| externalId | <code>string</code> |  | the externalId of the external user. |
| source | <code>Object</code> |  | the source user profile with attibutes  in order to create it if not already created. |
| refresh | <code>boolean</code> | <code>false</code> | the refresh optional parameter to force  to refresh information (disable cache), default is false if omited. |

<a name="Mail"></a>

## Mail

Class for sending emails.

**Kind**: global class  

- [Mail](#Mail)
  - [new Mail(transport)](#new_Mail_new)
  - [.setTitle(t)](#Mail+setTitle)
  - [.setFrom(f)](#Mail+setFrom)
  - [.setGreeting(g)](#Mail+setGreeting)
  - [.setClosing(c)](#Mail+setClosing)
  - [.clearNotes()](#Mail+clearNotes)
  - [.addNote(n)](#Mail+addNote)
  - [.send(to, subject, text)](#Mail+send)

<a name="new_Mail_new"></a>

### new Mail(transport)

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>Object</code> | the transport configuration. |

<a name="Mail+setTitle"></a>

### Mail.setTitle(t)

Set the title

**Kind**: instance method of [<code>Mail</code>](#Mail)  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>string</code> | the new title. |

<a name="Mail+setFrom"></a>

### Mail.setFrom(f)

Set the from

**Kind**: instance method of [<code>Mail</code>](#Mail)  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>string</code> | the new sender. |

<a name="Mail+setGreeting"></a>

### Mail.setGreeting(g)

Set the greeting phrase.

**Kind**: instance method of [<code>Mail</code>](#Mail)  

| Param | Type |
| --- | --- |
| g | <code>string</code> |

<a name="Mail+setClosing"></a>

### Mail.setClosing(c)

Set the closing phrase.

**Kind**: instance method of [<code>Mail</code>](#Mail)  

| Param | Type |
| --- | --- |
| c | <code>string</code> |

<a name="Mail+clearNotes"></a>

### Mail.clearNotes()

Empty the notes list.

**Kind**: instance method of [<code>Mail</code>](#Mail)  
<a name="Mail+addNote"></a>

### Mail.addNote(n)

Add a note in the notes list.

**Kind**: instance method of [<code>Mail</code>](#Mail)  

| Param | Type |
| --- | --- |
| n | <code>string</code> |

<a name="Mail+send"></a>

### Mail.send(to, subject, text)

Send an email.

**Kind**: instance method of [<code>Mail</code>](#Mail)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | recipents of the email. |
| subject | <code>string</code> | subject of the email. |
| text | <code>string</code> | body text of the email. |

<a name="FileConnect"></a>

## FileConnect

Class representing a FileConnect to the OODrive API.

**Kind**: global class  

- [FileConnect](#FileConnect)
  - [.login()](#FileConnect+login)
  - [.logout()](#FileConnect+logout)
  - [.getFiles(parentId)](#FileConnect+getFiles) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.getRootFolderId()](#FileConnect+getRootFolderId) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.getFile(itemId)](#FileConnect+getFile) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.uploadFile(localPath, remotePath)](#FileConnect+uploadFile)
  - [.downloadFile(itemId)](#FileConnect+downloadFile) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.deleteFile(itemId)](#FileConnect+deleteFile)

<a name="FileConnect+login"></a>

### fileConnect.login()

Present client credentials to obtain an authorization token.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  
<a name="FileConnect+logout"></a>

### fileConnect.logout()

Logout of the API and invalidate the current access token.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  
<a name="FileConnect+getFiles"></a>

### fileConnect.getFiles(parentId) ⇒ <code>Promise.&lt;Object&gt;</code>

Get information about all files in a specified folder Id.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The files information and descriptions.  

| Param | Type | Description |
| --- | --- | --- |
| parentId | <code>string</code> | The parent identifier. |

<a name="FileConnect+getRootFolderId"></a>

### fileConnect.getRootFolderId() ⇒ <code>Promise.&lt;string&gt;</code>

Get the Root folder Identifier.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The Root Identifier.  
<a name="FileConnect+getFile"></a>

### fileConnect.getFile(itemId) ⇒ <code>Promise.&lt;Object&gt;</code>

Get the file informations for the given Id.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The item information.  

| Param | Type | Description |
| --- | --- | --- |
| itemId | <code>string</code> | The item identifier. |

<a name="FileConnect+uploadFile"></a>

### fileConnect.uploadFile(localPath, remotePath)

Create and upload a file.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  

| Param | Type | Description |
| --- | --- | --- |
| localPath | <code>string</code> | The path to the local file to upload. |
| remotePath | <code>string</code> | The remote path to create or overwrite. |

<a name="FileConnect+downloadFile"></a>

### fileConnect.downloadFile(itemId) ⇒ <code>Promise.&lt;string&gt;</code>

Download the content of a file.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The downloaded content of the file.  

| Param | Type | Description |
| --- | --- | --- |
| itemId | <code>string</code> | The item identifier. |

<a name="FileConnect+deleteFile"></a>

### fileConnect.deleteFile(itemId)

Delete a file.

**Kind**: instance method of [<code>FileConnect</code>](#FileConnect)  

| Param | Type | Description |
| --- | --- | --- |
| itemId | <code>string</code> | The item identifier. |

<a name="WebServer"></a>

## WebServer

Class representing a Web Server Application.

**Kind**: global class  
<a name="WebStatistics"></a>

## WebStatistics

Class representing Web Statistics.

**Kind**: global class  
<a name="forceUnicodeEncoding"></a>

## forceUnicodeEncoding(val) ⇒ <code>string</code>

Force a string to be UnicodeEncoding

**Kind**: global function  
**Returns**: <code>string</code> - The encoded/decoded result.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | The string the encode/decode. |

<a name="stringifyParameters"></a>

## stringifyParameters(params, signature) ⇒ <code>string</code>

Build and concatenate the parameters in an URI parameter string.

**Kind**: global function  
**Returns**: <code>string</code> - The concatenated string.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | The parameters. |
| signature | <code>string</code> | The signature string to add at the end. |

## License

Copyrights(c) Carrefour 2022
