const deps = require('..')
const fs = require('fs')
const path = require('path')
const pathExists = require('path-exists').sync
const uniq = require('lodash.uniq')
const async = require('async')
const d = fs.readdirSync(path.join(__dirname, '../dependents'))
const dd = fs.readdirSync(path.join(__dirname, '../dependents'))
const names = uniq(d.concat(dd))
  .map(filename => path.basename(filename, '.json'))
  .filter(name => name.length)

async.each(names, doCount, finish)

function doCount (name, callback) {
  process.stderr.write(`\n${name}`)

  // Skip if count file already exists
  if (pathExists(countFile(name))) return callback(null)

  // Skip this if it's taking too long
  var timer = setTimeout(function() {
    process.stderr.write(` (aborted)`)
    return callback(null)
  }.bind(this), 1000)

  const counts = [
    deps.directDeps(name).length,
    deps.directDevDeps(name).length,
    transitiveDepCountUsingCache(name)
  ]
  clearInterval(timer)

  fs.writeFileSync(countFile(name), JSON.stringify(counts))
  process.stderr.write(` ${counts}`)
  return callback(null)
}

function finish(err) {
  if (err) throw err
  console.error('finished!')
}

// process.stdout.write(JSON.stringify(counts, null, 2))

function countFile (packageName) {
  return path.join(__dirname, `../counts/${packageName}.json`)
}

function transitiveDepCountUsingCache(name) {
  if (pathExists(countFile(name))) {
    return require(countFile(name)[2])
  }

  return deps.transitiveDeps(name)
}
