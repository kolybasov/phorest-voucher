import isEmail from 'phorest-voucher/utils/is-email';
import { module, test } from 'qunit';

module('Unit | Utility | is-email', function() {
  test('it detects emails', function(assert) {
    [
      { email: 'user@domain', valid: true },
      { email: 'user@domain.com', valid: true },
      { email: 'userdomain.com', valid: false },
      { email: '32902f', valid: false },
    ].forEach((rec) => {
      assert.equal(isEmail(rec.email), rec.valid);
    })
  });
});
