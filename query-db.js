const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, 'test.db'))

db.serialize(function () {
  const rows = []
  db.each('SELECT child FROM Dependencies where parent=\'lodash\'',
    function (err, row) {
      rows.push(row)
    },
    function complete (err, rowCount) {
      console.log(rows)
    }
  )
})

db.close()
