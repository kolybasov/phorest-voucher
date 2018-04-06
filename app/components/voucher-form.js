import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  tagName: '',

  client: null,
  voucher: null,
  createError: false,

  'on-create'() {},

  init() {
    this._super(...arguments);

    let client = get(this, 'client');
    let voucher = get(this, 'store').createRecord('voucher');
    set(voucher, 'client', client);
    set(this, 'voucher', voucher);
  },

  willDestroyElement() {
    let voucher = get(this, 'voucher');
    let isNew = get(voucher, 'isNew');
    if (isNew) {
      voucher.rollbackAttributes();
    }

    this._super(...arguments);
  },

  createVoucherTask: task(function *(event) {
    event.preventDefault();
    set(this, 'createError', false);

    let onCreate = get(this, 'on-create');
    let voucher = get(this, 'voucher');

    try {
      yield onCreate(voucher);
    } catch (err) {
      set(this, 'createError', err.message);
      throw err;
    }
  }).drop()
});
