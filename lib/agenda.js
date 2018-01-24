const Agenda = require('agenda');
const paths = require('../config/paths');

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

// eslint-disable-next-line
require(`${paths.jobs}/emails.js`)(agenda);

agenda.on('ready', () => {
  agenda.start();
});

module.exports = agenda;
