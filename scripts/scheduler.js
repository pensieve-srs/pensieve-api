/* eslint-disable no-console */
process.env.NODE_ENV = 'production';
require('../config/env').config();

const Agenda = require('agenda');
const mongoose = require('mongoose');

async function run() {
  mongoose.Promise = global.Promise;
  const db = await mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

  const agenda = new Agenda().mongo(db, 'jobs');

  /* Define jobs */
  // eslint-disable-next-line global-require
  require('../api/jobs')(agenda);

  await new Promise(resolve => agenda.once('ready', resolve));

  agenda.every('1 hour', 'reviewDecksEmail');
  agenda.start();
}

run().catch((error) => {
  console.log(error);
  process.exit(-1);
});
