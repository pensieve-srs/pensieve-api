/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();
require('../db').connect();

const User = require('../db/schemas/user');
const createDefaultDeck = require('../api/helpers/createDefaultDeck');

async function exec() {
  try {
    const user = await User.findOne({ email: 'nikolazaris@gmail.com' });
    await createDefaultDeck(user._id);
  } catch (error) {
    console.log(error);
  }
}

exec();
