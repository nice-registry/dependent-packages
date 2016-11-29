const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, '../data.db')
const exists = fs.existsSync(file)
const deps = require('require-dir')(path.join(__dirname, '/dependents'))
const devDeps = require('require-dir')(path.join(__dirname, '/devDependents'))

if (!exists) {
  console.log('Creating DB file.')
  fs.openSync(file, 'w')
}

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(file)

db.serialize(function () {
  if (!exists) {
    db.run('CREATE TABLE Dependencies (parent TEXT, child TEXT, type TEXT)')
    db.run('CREATE INDEX parent_index ON Dependencies parent');
    db.run('CREATE INDEX child_index ON Dependencies child');
    db.run('CREATE INDEX type_index ON Dependencies type');
  }

  var stmt = db.prepare('INSERT INTO Dependencies VALUES (?,?,?)')

  Object.keys(deps).forEach(parent => {
    deps[parent].forEach(child => {
      stmt.run(parent, child, 'd')
    })
  })

  Object.keys(devDeps).forEach(parent => {
    devDeps[parent].forEach(child => {
      stmt.run(parent, child, 'D')
    })
  })

  stmt.finalize()
  db.each('SELECT parent, child, type FROM Dependencies', function (err, row) {
    console.log(row)
  })
})

db.close()
