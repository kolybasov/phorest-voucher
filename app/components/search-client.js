import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { set, get } from '@ember/object';
import isEmail from 'phorest-voucher/utils/is-email';

const SEARCH_DEBOUNCE = 300;

export default Component.extend({
  tagName: '',

  query: '',
  'on-search'() {},

  clients: null,

  init() {
    this._super(...arguments);

    set(this, 'clients', []);
  },

  searchTask: task(function *(event) {
    event.preventDefault();

    yield timeout(SEARCH_DEBOUNCE);

    let onSearch = get(this, 'on-search');
    let query = get(this, 'query').trim();
    let queryType = isEmail(query) ? 'email' : 'phone';

    try {
      let clients = yield onSearch({ [queryType]: query });
      set(this, 'clients', clients);
    } catch (err) {
      console.warn('report error', err);
      throw err;
    }
  }).restartable()
});
