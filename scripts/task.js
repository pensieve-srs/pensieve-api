process.env.NODE_ENV = 'development';
require('../config/env').config();

const db = require('../db');
const paths = require('../config/paths');

db.connect();

const argv = process.argv.slice(2);

function run(fileName) {
  if (!fileName) {
    return Promise.reject();
  }

  // eslint-disable-next-line
  return require(`${paths.tasks}/${fileName}.js`)();
}

run(argv[0])
  .then(() => {
    process.exit();
  })
  .catch(() => {
    process.exit();
  });
