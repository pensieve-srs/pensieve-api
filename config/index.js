const env = require('./env');
const paths = require('./paths');

env.config();

module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  jwt: process.env.JWT_SECRET || 'keyboard_cat',
  database: {
    name: process.env.DATABASE_NAME || 'pensieve',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 27017,
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pensieve',
  },
  paths,
};
