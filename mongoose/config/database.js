/* eslint-disable no-console */
const chalk = require('chalk');
const mongoose = require('mongoose');
const config = require('../../config');

module.exports.connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.database.uri);

  const mongoDB = mongoose.connection;

  return new Promise((success, failure) => {
    mongoDB.on('error', (err) => {
      console.log(chalk.red('🔺  Connection to database failed', err.message));
      failure();
    });
    mongoDB.once('open', () => {
      console.log(chalk.cyan('✨  Connection to database established'));
      success();
    });
  });
};
