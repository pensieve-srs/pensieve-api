const niceware = require('niceware');

/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();

require('../db').connect();

const Invite = require('../db/schemas/invite');

async function run(count) {
  try {
    console.log('Creating invite codes for early access');
    await Promise.all([...Array(count)].map(async () => {
      await Invite.create({ value: niceware.generatePassphrase(6).join(' ') });
    }));
  } catch (error) {
    console.log(error);
  }
}

run(10);
