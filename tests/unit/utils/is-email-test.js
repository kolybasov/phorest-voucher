import isEmail from 'phorest-voucher/utils/is-email';
import { module, test } from 'qunit';

module('Unit | Utility | is-email', function(hooks) {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = isEmail();
    assert.ok(result);
  });
});
