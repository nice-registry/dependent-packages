const test = require('tape')
const dep = require('.')

test('dep', function (t) {
  t.comment('counts')
  t.ok(Array.isArray(dep.counts), 'is an array')
  t.ok(dep.counts.length > 30 * 1000, 'has hella entries')

  t.comment('dependentsOf()')
  t.ok(dep.dependentsOf('express').length > 10 * 1000, 'accepts a package name')
  t.deepEqual(dep.dependentsOf('not-a-real-package-name-nope'), [], 'returns an empty array for nonexistent packages')

  t.comment('devDependentsOf()')
  t.ok(dep.devDependentsOf('glob').length > 1000, 'accepts a package name')
  t.deepEqual(dep.devDependentsOf('not-a-real-package-name-nope'), [], 'returns an empty for nonexistent packages')

  t.end()
})
