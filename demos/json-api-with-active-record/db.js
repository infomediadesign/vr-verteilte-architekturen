
'use strict'

const sqlite3 = require('sqlite3')
const dbsource = 'db.sqlite'

let db = new sqlite3.Database(dbsource, (err) => {
    if (err)
        throw err
})

module.exports = db