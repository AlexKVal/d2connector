"use strict"

const db = require("odbc")()

const odbcString = "DSN=D2Main.NET"

try {
  db.openSync(odbcString)
} catch (e) {
  console.log(`${err.message}\odbc> ${odbcString}`)
}
console.log('opened')

const dbClose = function dbClose() {
  db.closeSync()
  console.log('closed')
}

const select = function select(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(`${err.message}\nsql> ${sql}`)
      else resolve(result)
    })
  })
}

const printPosIDs = result => result.forEach(row => console.log(`PosID: ${row.PosID}`))
select("select PosID from sPOSs").then(printPosIDs)

const printShortNames = result => result.forEach(row => console.log(`ShortName: ${row.ShortName}`))
select("select ShortName from frMenu").then(printShortNames)
.then(dbClose)

// -----------------------------
