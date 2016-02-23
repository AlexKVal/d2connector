import test from 'blue-tape'
import {DB} from '../lib/db'

test('DB.select() select returns rows', (t) => {
  const testOdbcString = 'DSN=D2Main.NET'
  const testSql = 'sql * from 1'

  const odbcMock = {
    openSync (odbc) {
      t.equal(odbc, testOdbcString)
    },

    closeSync () {
      t.pass()
    },

    query (sql, cb) {
      t.equal(sql, testSql)
      cb(null, ['row1', 'row2'])
    }
  }

  return new DB(odbcMock, testOdbcString)
    .select(testSql)
    .then((rows) => {
      t.deepEqual(rows, ['row1', 'row2'])
    })
})

test('DB.select() returns error with a wrong odbc connection string', (t) => {
  const testOdbcString = 'a wrong string'

  const odbcMock = {
    openSync (odbc) { throw Error('[odbc] Error') }
  }

  return new DB(odbcMock, testOdbcString)
    .select('does not matter')
    .catch((err) => {
      t.equal(err, '[odbc] Error\nodbc> a wrong string')
    })
})

test('DB.select() returns error with a wrong sql', (t) => {
  const testOdbcString = 'DSN=D2Main.NET'

  const odbcMock = {
    openSync (odbc) {
      t.equal(odbc, testOdbcString)
    },

    query (sql, cb) {
      cb(Error('[odbc] Error sql'))
    }
  }

  return new DB(odbcMock, testOdbcString)
    .select('a wrong sql')
    .catch((err) => {
      t.equal(err, '[odbc] Error sql\nsql> a wrong sql')
    })
})
