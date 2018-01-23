const User = require('../api/models/user');
const Card = require('../api/models/card');
const text = require('./views/due_cards_reminder.text.js');
const html = require('./views/due_cards_reminder.html.js');
const mailer = require('@sendgrid/mail');
const { classes: { EmailAddress } } = require('@sendgrid/helpers');

mailer.setApiKey(process.env.SENDGRID_API_KEY);

const fromAddress = new EmailAddress({ name: 'Pensieve', email: 'niko@pensieve.space' });

module.exports.sendDueCardsReminder = async (userId) => {
  if (!userId) return;

  const user = await User.findOne({ _id: userId, 'prefs.emailNotifs': true });
  const url = 'http://pensieve.space/sessions/new';
  const numCards = await Card.countAllDue(userId);

  if (!user || !numCards || numCards < user.prefs.sessionSize) {
    return;
  }

  console.log('✅ sent!');
  mailer.send({
    to: user.email,
    from: fromAddress,
    subject: `You have ${numCards} cards to review`,
    text: text(user.name, numCards, url),
    html: html(user.name, numCards, url),
  });
};
