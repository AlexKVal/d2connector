/**
 * 'odbc' package isn't added to the 'dependencies'
 * because its building is unnecessary burden for a CI
 * all tests are not dependent on 'odbc'
 */
import {Database} from 'odbc'
import {DB} from './db'

function dbConnect (odbcString) {
  return new DB(new Database(), odbcString) // inject odbc driver
}

export {
  dbConnect
}
