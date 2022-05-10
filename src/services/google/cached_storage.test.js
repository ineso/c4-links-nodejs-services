// Copyright Carrefour(2021)
//

/* eslint-disable no-undef, no-console, no-undefined */

const GCStorage = require("./cached_storage")

const projectId = '11044440778'
const bucketName = 'c4-datashopper-supplier-access-bd25d5a2'

test('getFile', () => {
  const st = new GCStorage(projectId, bucketName, 300000)
  const filename = 'access.csv'

  return Promise.resolve()
    .then(() => {
      return st.getFile(filename)
        .then(data => {
          //console.log(data)
          expect(data).not.toBe(undefined)
          expect(data.length).not.toBe(0)
        })
    })
    .then(() => {
      return st.getFile(filename)
        .then(data => {
          //console.log(data)
          expect(data).not.toBe(undefined)
          expect(data.length).not.toBe(0)
        })
    })
})
