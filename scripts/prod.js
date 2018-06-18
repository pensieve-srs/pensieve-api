process.env.NODE_ENV = 'production';

require('../config/env').config();

const server = require('../src/index');

server.start();
