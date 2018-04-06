'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'phorest-voucher',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    apiHost: 'https://api-gateway-dev.phorest.com/third-party-api-server/api/business',
    apiBusinessId: 'eTC3QY5W3p_HmGHezKfxJw',
    apiBranchId: 'SE-J0emUgQnya14mOGdQSw',

    'ember-devtools': {
      global: 'devTools',
      enabled: environment === 'development'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.rootURL = '/phorest-voucher/';
    // here you can enable a production-specific feature
  }

  return ENV;
};
