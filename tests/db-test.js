'use strict'

const test = require('blue-tape')
const DB = require('../lib/db').DB

test('DB.exec() of select query returns rows', (t) => {
  const testOdbcString = 'DSN=D2Main.NET'
  const testSql = 'sql * from 1'

  const openFunctionMock = function openFunctionMock (connectionString, cb) {
    const odbcMock = {
      close () {
        t.pass()
      },

      query (sql, cb) {
        t.equal(sql, testSql)
        cb(null, ['row1', 'row2'])
      }
    }

    cb(null, odbcMock)
  }

  return new DB(openFunctionMock, testOdbcString)
    .exec(testSql)
    .then((rows) => {
      t.deepEqual(rows, ['row1', 'row2'])
    })
})

test('DB.exec() returns error with a wrong odbc connection string', (t) => {
  const testOdbcString = 'a wrong string'

  const openFunctionMock = function openFunctionMock (connectionString, cb) {
    cb(Error('[odbc] Error'))
  }

  return new DB(openFunctionMock, testOdbcString)
    .exec('does not matter')
    .catch((err) => {
      t.equal(err, '[odbc] Error\nodbc> a wrong string')
    })
})

test('DB.exec() returns error with a wrong sql', (t) => {
  const testOdbcString = 'DSN=D2Main.NET'

  const openFunctionMock = function openFunctionMock (connectionString, cb) {
    const odbcMock = {
      query (sql, cb) { cb(Error('[odbc] Error sql')) }
    }

    cb(null, odbcMock)
  }

  return new DB(openFunctionMock, testOdbcString)
    .exec('a wrong sql')
    .catch((err) => {
      t.equal(err, '[odbc] Error sql\nsql> a wrong sql')
    })
})
