process.env.NODE_ENV = 'production';

require('../config/env').config();

const server = require('../api/index');

server.start();
