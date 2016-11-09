const path = require('path')
const requireDir = require('require-dir')
const dependents = requireDir(path.join(__dirname, 'dependents'))
const devDependents = requireDir(path.join(__dirname, 'devDependents'))
var counts = []

Object.keys(dependents).forEach(packageName => {
  counts.push({
    name: packageName,
    dependents: dependents[packageName].length,
  })
})

Object.keys(devDependents).forEach(packageName => {
  var count = counts.find(count => count.name === packageName)

  if (count) {
    count.devDependents = devDependents[packageName].length
  } else {
    counts.push({
      name: packageName,
      devDependents: devDependents[packageName].length
    })
  }
})

process.stdout.write(JSON.stringify(counts, null, 2))
