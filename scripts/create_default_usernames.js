/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
require('../config/env').config();

require('../db').connect();

const User = require('../api/models/user');

async function run() {
  try {
    const users = await User.find({ username: { $exists: false } });
    users.forEach(async (user) => {
      console.log('user', user);
      const username = user.name
        .toLowerCase()
        .split(' ')
        .join('-')
        .split(',')
        .join('');

      const counts = await User.count({ username });

      /* eslint-disable-next-line no-param-reassign */
      user.username = counts === 0 ? username : `${username}${counts}`;

      const newUser = await user.save();
      console.log('✅', newUser.name, '->', newUser.username);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
