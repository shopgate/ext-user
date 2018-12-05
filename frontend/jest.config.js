// Require the default configuration.
const defaultConfig = require('@shopgate/pwa-unit-test/jest.config');

// Extend the default configuration.
module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    '^\\@shopgate\\/user\\/(.*)$': '<rootDir>/$1',
  },
};
