const User = require('../../src/models/user');

const CardsMailer = require('../../mailers/cards_mailer');

module.exports = (agenda) => {
  agenda.define('dueCardsEmail', async () => {
    try {
      const users = await User.find({ 'prefs.emailNotifs': true });

      await Promise.all(users.map(async (user) => {
        await CardsMailer.sendDueCardsEmail(user._id);
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      process.exit(-1);
    }
  });

  agenda.define('newCardsEmail', async () => {
    try {
      const users = await User.find({ 'prefs.emailNotifs': true });

      await Promise.all(users.map(async (user) => {
        await CardsMailer.sendNewCardsEmail(user._id);
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      process.exit(-1);
    }
  });
};
