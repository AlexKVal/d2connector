'use strict'

class DB {
  constructor (odbcOpenFunction, odbcString) {
    this.odbcOpenFunction = odbcOpenFunction
    this.odbcString = odbcString
  }

  select (sql) {
    return new Promise((resolve, reject) => {
      this.odbcOpenFunction(this.odbcString, (err, db) => {
        if (err) return reject(`${err.message}\nodbc> ${this.odbcString}`)

        db.query(sql, (err, result) => {
          if (err) {
            return reject(`${err.message}\nsql> ${sql}`)
          } else {
            db.closeSync()
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
