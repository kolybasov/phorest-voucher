'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const browsers = require('./config/targets').browsers;

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    vendorFiles: {
      'jquery.js': null
    },

    autoprefixer: {
      browsers
    }
  });


  // Normalize browsers' default style
  app.import('node_modules/modern-normalize/modern-normalize.css');

  // Datepicker
  app.import('node_modules/pikaday/css/pikaday.css');
  app.import('node_modules/pikaday/pikaday.js');

  return app.toTree();
};
