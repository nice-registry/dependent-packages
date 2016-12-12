const test = require('tape')
const dep = require('.')

test('dep', function (t) {
  t.comment('directDependents()')
  t.ok(dep.directDependents('express').length > 10 * 1000, 'accepts a package name')
  t.deepEqual(dep.directDependents('not-a-real-package-name-nope'), [], 'returns an empty array for nonexistent packages')

  t.comment('directDevDependents()')
  t.ok(dep.directDevDependents('glob').length > 1000, 'accepts a package name')
  t.deepEqual(dep.directDevDependents('not-a-real-package-name-nope'), [], 'returns an empty for nonexistent packages')

  t.end()
})
