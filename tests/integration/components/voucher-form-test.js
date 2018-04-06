import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | voucher-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it allows to create voucher', async function(assert) {
    assert.expect(1);

    this.set('client', { fullName: 'Mykola Basov' });

    this.set('onCreate', (voucher) => {
      assert.equal(voucher.get('originalBalance'), 10);
    });

    this.set('onCancel', () => {});

    await render(hbs`
      {{voucher-form
        client=client
        on-create=(action onCreate)
        on-cancel=(action onCancel)}}
    `);

    await click('button[type="submit"]');
  });
});
