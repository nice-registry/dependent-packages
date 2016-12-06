const path = require('path')
const pathExists = require('path-exists').sync

module.exports = {
  counts: require('./counts.json'),

  directDeps: (packageName) => {
    const file = path.join(__dirname, 'dependents', `${packageName}.json`)
    return pathExists(file) ? require(file) : []
  },

  directDevDeps: (packageName) => {
    const file = path.join(__dirname, 'devDependents', `${packageName}.json`)
    return pathExists(file) ? require(file) : []
  }
}
