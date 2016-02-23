import {Database} from 'odbc'
import {DB} from './db'

function dbConnect (odbcString) {
  return new DB(new Database(), odbcString) // inject odbc driver
}

export {
  dbConnect
}
