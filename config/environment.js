/* eslint-env node */
'use strict';

// module.exports = function(/* environment, appConfig */) {
//   return { };
// };


module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'external-admin',
    environment: environment
  }

  return ENV;
};
