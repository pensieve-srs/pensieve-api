process.env.NODE_ENV = 'development';
require('../config/env').config();
require('../db').connect();
const agenda = require('../lib/agenda');

const jobNames = process.argv.slice(2);

agenda.on('ready', () => {
  jobNames.forEach((job) => {
    agenda.now(job);
  });
});

agenda.on('complete', (job) => {
  // eslint-disable-next-line no-console
  console.log(`✨ Job: ${job.attrs.name} completed!`);
});
