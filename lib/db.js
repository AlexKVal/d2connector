'use strict'

function normalize (sql) {
  return sql.replace(/\s+/g, ' ')
}

class DB {
  constructor (odbcOpenFunction, odbcString) {
    this.odbcOpenFunction = odbcOpenFunction
    this.odbcString = odbcString
  }

  odbcError (msg) {
    return `${msg}\nodbc> ${this.odbcString}`
  }

  exec (sql) {
    sql = normalize(sql)

    return new Promise((resolve, reject) => {
      this.odbcOpenFunction(this.odbcString, (err, db) => {
        if (err) return reject(this.odbcError(err.message))

        db.query(sql, (err, result) => {
          if (err) {
            return reject(`${err.message}\nsql> ${sql}`)
          } else {
            db.close()
            return resolve(result)
          }
        })
      })
    })
  }
}

module.exports = {
  DB
}
