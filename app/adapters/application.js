import RESTAdapter from 'ember-data/adapters/rest';
import { computed, get, getProperties } from '@ember/object';
import config from 'phorest-voucher/config/environment';
import { inject as service } from '@ember/service';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default RESTAdapter.extend(AdapterFetch, {
  session: service(),

  // Build host from API URL and Business ID
  host: computed({
    get() {
      let { apiHost, apiBusinessId } = config;
      return `${apiHost}/${apiBusinessId}`;
    }
  }),

  // Send auth data with each request
  headers: computed('session.{authHeaderName,authHeaderValue}', {
    get() {
      let session = get(this, 'session');
      let { authHeaderName, authHeaderValue } = getProperties(session, [
        'authHeaderName', 'authHeaderValue'
      ]);

      // Basic auth header looks like "Authorization: Basic <base64-encoded>"
      return {
        [authHeaderName]: authHeaderValue
      };
    }
  }),

  // Phorest API uses singular nouns for models
  // This prevents ember-data to pluralize URL path
  pathForType(modelName) {
    return modelName;
  }
});
