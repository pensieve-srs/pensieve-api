const User = require('../src/models/user');
const Card = require('../src/models/card');
const dueCardEmailText = require('./views/due_cards_email.text.js');
const dueCardEmailHtml = require('./views/due_cards_email.html.js');
const newCardEmailText = require('./views/new_cards_email.text.js');
const newCardEmailHtml = require('./views/new_cards_email.html.js');
const mailer = require('@sendgrid/mail');
const {
  classes: { EmailAddress },
} = require('@sendgrid/helpers');

mailer.setApiKey(process.env.SENDGRID_API_KEY);

const fromAddress = new EmailAddress({ name: 'Pensieve', email: 'hello@pensieve.space' });

module.exports.sendDueCardsEmail = async (userId) => {
  if (!userId) return;

  const user = await User.findOne({ _id: userId, 'prefs.emailNotifs': true });
  const url = 'https://www.pensieve.space/sessions/new';
  const numCards = await Card.countAllDue(userId);

  if (!user || !numCards || numCards < user.prefs.sessionSize) {
    return;
  }

  await mailer.send({
    to: user.email,
    from: fromAddress,
    subject: `You have ${numCards} cards to review`,
    text: dueCardEmailText(user.name, numCards, url),
    html: dueCardEmailHtml(user.name, numCards, url),
  });
};

module.exports.sendNewCardsEmail = async (userId) => {
  if (!userId) return;

  const user = await User.findOne({ _id: userId, 'prefs.emailNotifs': true });
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const url = 'https://www.pensieve.space/sessions/new';
  const numCards = await Card.count({ user: userId })
    .where('createdAt')
    .gt(oneDayAgo);

  if (!user || numCards < 4) {
    return;
  }

  await mailer.send({
    to: user.email,
    from: fromAddress,
    subject: `You have ${numCards} new cards`,
    text: newCardEmailText(user.name, numCards, url),
    html: newCardEmailHtml(user.name, numCards, url),
  });
};
