'use strict'

/**
 * 'odbc' package isn't added to the 'dependencies'
 * because its building is unnecessary burden for a CI
 * all tests are not dependent on 'odbc'
 */
const open = require('odbc').open
const DB = require('./db').DB

function getDatabase (odbcString) {
  return new DB(open, odbcString) // inject odbc driver
}

module.exports = {
  getDatabase
}
