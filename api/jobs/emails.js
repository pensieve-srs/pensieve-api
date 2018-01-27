const User = require('../../db/schemas/user');
const CardsMailer = require('../../mailers/cards_mailer');
const AdminMailer = require('../../mailers/admin_mailer');

module.exports = (agenda) => {
  agenda.define('dueCardsEmail', async (job, done) => {
    try {
      const users = await User.find({ 'prefs.emailNotifs': true });

      users.forEach((user) => {
        CardsMailer.sendDueCardsReminder(user._id);
      });
      done();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  });

  agenda.define('signupAlert', async (job, done) => {
    try {
      AdminMailer.sendSignupAlert();
      done();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  });
};
