/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();

const Agenda = require('agenda');
const mongoose = require('mongoose');

async function run() {
  mongoose.Promise = global.Promise;
  const db = await mongoose.connect(
    process.env.MONGODB_URI,
    { useMongoClient: true },
  );

  const agenda = new Agenda().mongo(db, 'jobs');

  const jobNames = process.argv.slice(2);

  // eslint-disable-next-line global-require
  require('../src/jobs')(agenda);

  await new Promise(resolve => agenda.once('ready', resolve));

  jobNames.forEach((job) => {
    agenda.now(job);
  });
  agenda.start();
}

run().catch((error) => {
  console.log(error);
  process.exit(-1);
});
