/* eslint-disable no-console */
process.env.NODE_ENV = 'test';

const Mocha = require('mocha');
const chalk = require('chalk');
const paths = require('../config/paths');
const glob = require('glob');
const fixtures = require('pow-mongodb-fixtures').connect('boreas-test');

require('../config/env');
require('chai/register-expect');

// Instantiate a Mocha instance.
const mocha = new Mocha();

fixtures.clearAllAndLoad(paths.fixtures, () => {
  console.log(chalk.cyan('✨  Test database loaded'));

  // Add each .js file to the mocha instance
  glob('test/**/*.js', { realpath: true, ignore: 'test/api/fixtures/**' }, (err, files) => {
    files.forEach(file => mocha.addFile(file));

    // Run the tests.
    mocha.run().on('end', () => {
      fixtures.clear();
      process.exit();
    });
  });
});
