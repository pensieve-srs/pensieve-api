const User = require('../../api/models/user');
const DecksMailer = require('../../mailers/decks_mailer');

module.exports = (agenda) => {
  agenda.define('reviewDecksEmail', async () => {
    // Handles logic for email of decks at 50% strength
    console.log('✨ DEBUG - reviewDecksEmail');
    try {
      const users = await User.find({ 'prefs.emailNotifs': true });

      await Promise.all(users.map(async (user) => {
        await DecksMailer.sendExpiredDeckEmail(user._id);
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      process.exit(-1);
    }
  });
};
