/* eslint-disable no-console */
process.env.NODE_ENV = 'test';

const Mocha = require('mocha');
const chalk = require('chalk');
const glob = require('glob');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const mongoFixtures = require('pow-mongodb-fixtures');
require('chai/register-expect');

const config = require('../config');

const fixtures = mongoFixtures.connect(config.database.uri);

chai.use(sinonChai);

// Instantiate a Mocha instance.
const mocha = new Mocha();

const fileName = process.argv.slice(2)[0];

const fileExp = fileName ? `test/**/${fileName}.js` : 'test/**/*.js';

fixtures.clearAllAndLoad(config.paths.fixtures, () => {
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
