process.env.NODE_ENV = 'production';

require('../config/env').config();

require('../api/index');
