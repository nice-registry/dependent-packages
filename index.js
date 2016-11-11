const path = require('path')
const pathExists = require('path-exists').sync

module.exports = {
  counts: require('./counts.json'),

  dependentsOf: (packageNames) => {
    if (typeof packageNames === 'string') {
      return requireDependent(packageNames)
    } else {
      return packageNames.map(name => requireDependent(name))
    }
  },

  devDependentsOf: (packageNames) => {
    if (typeof packageNames === 'string') {
      return requireDevDependent(packageNames)
    } else {
      return packageNames.map(name => requireDevDependent(name))
    }
  }
}

function requireDependent (packageName) {
  const file = path.join(__dirname, 'dependents', `${packageName}.json`)
  return pathExists(file) ? require(file) : null
}

function requireDevDependent (packageName) {
  const file = path.join(__dirname, 'devDependents', `${packageName}.json`)
  return pathExists(file) ? require(file) : null
}
