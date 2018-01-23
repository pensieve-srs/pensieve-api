// process.env.NODE_ENV = 'development';
// require('../config/env').config();
// require('../db').connect();

const Agenda = require('agenda');
const paths = require('../config/paths');
const glob = require('glob');

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

glob(`${paths.jobs}/**/*.js`, (err, files) => {
  if (err) return;
  files.forEach((file) => {
    // eslint-disable-next-line
    require(file)(agenda);
  });
});

agenda.on('ready', () => {
  agenda.start();
});

module.exports = agenda;
