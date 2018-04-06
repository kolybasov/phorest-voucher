import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search-client', function(hooks) {
  setupRenderingTest(hooks);

  test('it can search and render clients', async function(assert) {
    assert.expect(2);

    this.set('onSearch', (query) => {
      assert.deepEqual({ email: 'test@email.com', page: 0 }, query);
      return [
        { id: 1, fullName: 'Mykola Basov' }
      ];
    });

    await render(hbs`
      {{search-client
        on-search=(action onSearch)}}
    `);

    await fillIn('#search-input', 'test@email.com');
    await click('.search-client-form > button[type="submit"]');

    assert.ok(/Mykola Basov/.test(this.element.textContent.trim()));
  });
});
