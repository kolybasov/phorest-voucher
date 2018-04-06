import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { set, get, computed } from '@ember/object';
import isEmail from 'phorest-voucher/utils/is-email';
import { isPresent } from '@ember/utils';

const SEARCH_DEBOUNCE = 300;
const QUERY_TYPES = [
  { name: 'phone', icon: 'phone' },
  { name: 'email', icon: 'mail' }
];

export default Component.extend({
  tagName: '',

  query: '',
  clients: null,
  queryTypes: null,
  _queryType: null,
  notFound: false,
  searchError: false,
  currentPage: 0,

  'on-search'() {},

  queryType: computed('query', {
    get() {
      let queryType = get(this, '_queryType');
      if (queryType) {
        return queryType;
      }

      let query = get(this, 'query');
      let queryTypeName = isEmail(query) ? 'email' : 'phone';
      return QUERY_TYPES.findBy('name', queryTypeName);
    },
    set(key, queryType) {
      return set(this, '_queryType', queryType);
    }
  }),

  init() {
    this._super(...arguments);

    set(this, 'clients', []);
    set(this, 'queryTypes', QUERY_TYPES);
  },

  searchTask: task(function *(event) {
    event.preventDefault();
    set(this, 'notFound', false);
    set(this, 'searchError', false);

    yield timeout(SEARCH_DEBOUNCE);

    let onSearch = get(this, 'on-search');

    try {
      let clients = yield onSearch(this._buildQuery());
      set(this, 'clients', clients);
      if (get(clients, 'length') === 0) {
        set(this, 'notFound', true);
      }
    } catch (err) {
      set(this, 'searchError', err.message);
      throw err;
    }
    window.scrollTo(0, 0);
  }).restartable(),

  _buildQuery() {
    let query = get(this, 'query').trim();
    let currentPage = get(this, 'currentPage');
    let queryObj = { page: currentPage };

    if (isPresent(query)) {
      let queryType = get(this, 'queryType');
      queryObj[queryType.name] = query;
    }

    return queryObj;
  },

  actions: {
    updateQuery(query) {
      set(this, '_queryType', null);
      set(this, 'query', query);
      set(this, 'currentPage', 0);
    },

    changeQueryType(qtype, closeDropdown) {
      set(this, 'queryType', qtype);
      set(this, 'notFound', false);
      set(this, 'currentPage', 0);
      closeDropdown();
    },

    updatePage(num, event) {
      let currentPage = get(this, 'currentPage');
      set(this, 'currentPage', currentPage + num);
      get(this, 'searchTask').perform(event);
    }
  }
});
