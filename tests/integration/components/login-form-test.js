import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it allows to sign in', async function(assert) {
    assert.expect(2);

    this.set('check', ({ username, password }) => {
      assert.equal(username, 'user');
      assert.equal(password, 'pass');
    });

    await render(hbs`
      {{login-form
        on-login=(action check)}}
    `);

    await fillIn('#username-input', 'user');
    await fillIn('#password-input', 'pass');
    await click('button[type="submit"]');
  });
});
