/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

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

app.use(routes);

module.exports = app;
