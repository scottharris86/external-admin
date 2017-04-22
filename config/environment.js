/* eslint-env node */
'use strict';

// module.exports = function(/* environment, appConfig */) {
//   return { };
// };


module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'external-admin',
    environment: environment
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.host = 'http://localhost:8080'
  }

  return ENV;
};
