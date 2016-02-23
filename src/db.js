export class DB {
  constructor (odbcDb, odbcString) {
    this.odbcDb = odbcDb
    this.odbcString = odbcString
  }

  select (sql) {
    try {
      this.odbcDb.openSync(this.odbcString)
    } catch (err) {
      return Promise.reject(`${err.message}\nodbc> ${this.odbcString}`)
    }

    return new Promise((resolve, reject) => {
      this.odbcDb.query(sql, (err, result) => {
        if (err) {
          reject(`${err.message}\nsql> ${sql}`)
        } else {
          this.odbcDb.closeSync()
          resolve(result)
        }
      })
    })
  }
}
