const User = require('../db/schemas/user');
const CardsMailer = require('../mailers/cards_mailer');

module.exports = async () => {
  const users = await User.find({ 'prefs.emailNotifs': true });
  const cardsMailer = new CardsMailer();

  users.forEach((user) => {
    cardsMailer.sendDueCardsReminder(user._id);
  });
};
