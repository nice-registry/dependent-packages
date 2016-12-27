const path = require('path')
const fs = require('fs')

module.exports = {
  counts: require('./counts.json'),

  directDependents: (packageName) => {
    const file = path.join(__dirname, 'dependents', `${packageName}.json`)
    return fs.existsSync(file) ? require(file) : []
  },

  directDevDependents: (packageName) => {
    const file = path.join(__dirname, 'devDependents', `${packageName}.json`)
    return fs.existsSync(file) ? require(file) : []
  }
}
