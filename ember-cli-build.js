'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    vendorFiles: {
      'jquery.js': null
    }
  });


  // Normalize browsers' default style
  app.import('node_modules/modern-normalize/modern-normalize.css');

  return app.toTree();
};
