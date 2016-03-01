'use strict'

const getDatabase = require('./index').getDatabase

let db = getDatabase('DSN=D2Main.NET')

db
  .select('select PosID from sPOSs')
  .then((rows) => {
    rows.forEach((row) => console.log(`PosID: ${row.PosID}`))
  })
  .catch((err) => {
    console.log(err)
  })

db
  .select('select ShortName from frMenu')
  .then((rows) => {
    rows.forEach((row) => console.log(`ShortName: ${row.ShortName}`))
  })
  .catch((err) => {
    console.log(err)
  })
