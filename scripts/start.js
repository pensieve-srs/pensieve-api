process.env.NODE_ENV = 'development';

require('../config/env').config();

const server = require('../src/index');

server.start();
