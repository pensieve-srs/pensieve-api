/* eslint-disable no-console */
const Agenda = require('agenda');
const { MongoClient } = require('mongodb');

async function run() {
  const db = await MongoClient.connect(process.env.MONGODB_URI);

  const agenda = new Agenda().mongo(db, 'jobs');

  /* Define jobs */
  // eslint-disable-next-line global-require
  require('../api/jobs')(agenda);

  await new Promise(resolve => agenda.once('ready', resolve));

  agenda.start();
}

run().catch((error) => {
  console.log(error);
  process.exit(-1);
});
