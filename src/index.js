/* eslint-disable no-console */
const chalk = require('chalk');
const app = require('./app');
const config = require('../config');
const mongoose = require('../mongoose/config/database');

let server;

module.exports = {
  start: () =>
    mongoose.connect().then(() => {
      server = app.listen(config.port, () => {
        console.log(chalk.cyan(`✨  Starting the server on port ${config.port}`));
      });
      return server;
    }),

  close: () => server.close(),
};
