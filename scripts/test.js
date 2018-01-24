/* eslint-disable no-console */
process.env.NODE_ENV = 'test';

const Mocha = require('mocha');
const chalk = require('chalk');
const paths = require('../config/paths');
const glob = require('glob');
const fixtures = require('pow-mongodb-fixtures').connect('boreas-test');
const chai = require('chai');
const sinonChai = require('sinon-chai');

require('../config/env').config();
require('chai/register-expect');

chai.use(sinonChai);

// Instantiate a Mocha instance.
const mocha = new Mocha();

const fileName = process.argv.slice(2)[0];

const fileExp = fileName ? `test/**/${fileName}.js` : 'test/**/*.js';

fixtures.clearAllAndLoad(paths.fixtures, () => {
  console.log(chalk.cyan('✨  Test database loaded'));

  // Add each .js file to the mocha instance
  glob(fileExp, { realpath: true, ignore: 'test/fixtures/**' }, (err, files) => {
    files.forEach(file => mocha.addFile(file));

    // Run the tests.
    mocha
      .run((failures) => {
        process.on('exit', () => {
          fixtures.clear();
          process.exit(failures); // exit with non-zero status if there were failures
        });
      })
      .on('end', () => {
        fixtures.clear();
        process.exit();
      });
  });
});
