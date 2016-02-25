/**
 * 'odbc' package isn't added to the 'dependencies'
 * because its building is unnecessary burden for a CI
 * all tests are not dependent on 'odbc'
 */
import {open} from 'odbc'
import {DB} from './db'

function getDatabase (odbcString) {
  return new DB(open, odbcString) // inject odbc driver
}

export {
  getDatabase
}
