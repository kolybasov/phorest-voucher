import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | cut', function(hooks) {
  setupRenderingTest(hooks);

  test('it do not cut string if not needed', async function(assert) {
    this.set('str', 'Short string');

    await render(hbs`{{cut str}}`);

    assert.equal(this.element.textContent.trim(), 'Short string');
  });

  test('it cuts string and appends ellipsis', async function(assert) {
    this.set('str', 'Very long string');

    await render(hbs`{{cut str 9}}`);

    assert.equal(this.element.textContent.trim(), 'Very long…');
  });
});
