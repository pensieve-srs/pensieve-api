process.env.NODE_ENV = 'development';

require('../config/env').config();

require('../api/index')();
