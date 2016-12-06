const test = require('tape')
const dep = require('.')

test('dep', function (t) {
  t.comment('directDeps()')
  t.ok(dep.directDeps('express').length > 10 * 1000, 'accepts a package name')
  t.deepEqual(dep.directDeps('not-a-real-package-name-nope'), [], 'returns an empty array for nonexistent packages')

  t.comment('directDevDeps()')
  t.ok(dep.directDevDeps('glob').length > 1000, 'accepts a package name')
  t.deepEqual(dep.directDevDeps('not-a-real-package-name-nope'), [], 'returns an empty array for nonexistent packages')

  t.comment('transitiveDeps()')
  var globDeps = dep.transitiveDeps('glob')
  console.log(globDeps.length)
  t.ok(globDeps.length > 1000, 'accepts a package name')
  t.deepEqual(dep.transitiveDeps('not-a-real-package-name-nope'), [], 'returns an empty for nonexistent packages')

  t.end()
})
