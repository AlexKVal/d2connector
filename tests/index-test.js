import test from 'blue-tape'
import hello from '../lib/index'

test('Tests run', (assert) => {
  assert.pass(hello('gg'))
  assert.end()
})
