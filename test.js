const test = require('tape')
const dep = require('.')

test('dep', function (t) {
  t.comment('counts')
  t.ok(Array.isArray(dep.counts), 'is an array')
  t.ok(dep.counts.length > 30 * 1000, 'has hella entries')

  t.comment('dependentsOf()')
  t.ok(dep.dependentsOf('express').length > 10 * 1000, 'accepts a package name')
  t.ok(dep.dependentsOf('not-a-real-package-name-nope') === null, 'returns null for nonexistent packages')

  t.comment('devDependentsOf()')
  t.ok(dep.devDependentsOf('glob').length > 1000, 'accepts a package name')
  t.ok(dep.devDependentsOf('not-a-real-package-name-nope') === null, 'returns null for nonexistent packages')

  t.end()
})
