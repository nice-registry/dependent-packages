const path = require('path')
const pathExists = require('path-exists').sync
const uniq = require('lodash.uniq')

function directDeps (packageName) {
  const file = path.join(__dirname, 'dependents', `${packageName}.json`)
  return pathExists(file) ? require(file) : []
}

function directDevDeps (packageName) {
  const file = path.join(__dirname, 'devDependents', `${packageName}.json`)
  return pathExists(file) ? require(file) : []
}

function transitiveDeps (packageName, results) {
  results = results || []

  directDeps(packageName).forEach(name => {
    if (results.includes(name)) return
    results.push(name)
    transitiveDeps(name, results)
  })

  directDevDeps(packageName).forEach(name => {
    if (results.includes(name)) return
    results.push(name)
    transitiveDeps(name, results)
  })

  return uniq(results)
}

module.exports = {
  directDeps: directDeps,
  directDevDeps: directDevDeps,
  transitiveDeps: transitiveDeps
}
