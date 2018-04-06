import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | client-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it allows to create voucher', async function(assert) {
    this.set('client', { id: 1, fullName: 'Mykola Basov' });

    await render(hbs`
      {{client-card
        client=client}}
    `);

    assert.ok(/Mykola Basov/.test(this.element.textContent.trim()));

    await click('.pv-button');

    assert.ok(/Create voucher for/.test(this.element.textContent.trim()));
  });
});
