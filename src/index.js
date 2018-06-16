/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('../mongoose/config/database');

const app = express();

const corsOptions = {
  origin: '*',
  exposedHeaders: ['Authorization'],
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(require('./controllers'));

let server;

module.exports.start = () =>
  mongoose.connect().then(() => {
    server = app.listen(process.env.PORT || 5000, (err) => {
      if (err) {
        console.error(err);
      } else if (process.env.NODE_ENV === 'development') {
        console.log(chalk.cyan('✨  Starting the server...'));
      }
    });
    return server;
  });

module.exports.close = () => server.close();
