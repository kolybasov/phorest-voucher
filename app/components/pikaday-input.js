import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  tagName: 'input',
  attributeBindings: ['selected:value', 'readonly'],

  readonly: true,
  selected: null,
  _instance: null,

  'on-select'() {},

  didInsertElement() {
    this._super(...arguments);

    let field = this.element;
    let onSelect = get(this, 'on-select').bind(this);

    let instance = new window.Pikaday({
      field,
      onSelect
    });

    set(this, '_instance', instance);
  },

  willDestroyElement() {
    let instance = get(this, '_instance');
    if (instance) { instance.destroy(); }

    this._super(...arguments);
  }
});
