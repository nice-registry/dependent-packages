const path = require('path')
const requireDir = require('require-dir')
const dependents = requireDir(path.join(__dirname, '..', 'dependents'))
const devDependents = requireDir(path.join(__dirname, '..', 'devDependents'))
var counts = []

Object.keys(dependents).forEach(packageName => {
  counts.push({
    name: packageName,
    dependents: dependents[packageName].length,
    devDependents: 0
  })
  process.stderr.write('.')
})

Object.keys(devDependents).forEach(packageName => {
  var count = counts.find(count => count.name === packageName)

  if (count) {
    count.devDependents = devDependents[packageName].length
  } else {
    counts.push({
      name: packageName,
      dependents: 0,
      devDependents: devDependents[packageName].length
    })
  }
  process.stderr.write('*')
})

counts = counts.sort((a, b) => (b.dependents) - (a.dependents))

process.stdout.write(JSON.stringify(counts, null, 2))
