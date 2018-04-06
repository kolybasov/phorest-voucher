import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | show-next', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows next', async function(assert) {
    this.set('page', 2);
    this.set('total', 9);

    await render(hbs`{{show-next page total}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it doesn\'t show next', async function(assert) {
    this.set('page', 8);
    this.set('total', 9);

    await render(hbs`{{show-next page total}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });
});
