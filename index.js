const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, 'test.db'))
const pify = require('pify')

function dependentsOf (packageName, callback) {
  db.serialize(function () {
    const rows = []
    db.each(`SELECT child FROM Dependencies where parent='${packageName}' and type='d'`,
      function (err, row) { rows.push(row) },
      function complete (err, rowCount) {
        return err ? callback(err) : db.close() && callback(null, rows)
      }
    )
  })
}

function devDependentsOf (packageName, callback) {
  db.serialize(function () {
    const rows = []
    db.each(`SELECT child FROM Dependencies where parent='${packageName}' and type='D'`,
      function (err, row) { rows.push(row) },
      function complete (err, rowCount) {
        return err ? callback(err) : db.close() && callback(null, rows)
      }
    )
  })
}

module.exports = {
  dependentsOf: pify(dependentsOf),
  devDependentsOf: pify(devDependentsOf)
}
