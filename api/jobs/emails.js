const User = require('../../db/schemas/user');
const CardsMailer = require('../../mailers/cards_mailer');
const AdminMailer = require('../../mailers/admin_mailer');

module.exports = (agenda) => {
  agenda.define('dueCardsEmail', async () => {
    try {
      const users = await User.find({ 'prefs.emailNotifs': true });

      await Promise.all(users.map(async (user) => {
        await CardsMailer.sendDueCardsEmail(user._id);
      }));

      process.exit(0);
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
      process.exit(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      process.exit(-1);
    }
  });

  agenda.define('signupAlert', async () => {
    try {
      await AdminMailer.sendSignupAlert();
      process.exit(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      process.exit(-1);
    }
  });
};
