const ApplicationMailer = require('./application_mailer');
const User = require('../api/models/user');
const Card = require('../api/models/card');
const text = require('./views/due_cards_reminder.text.js');
const html = require('./views/due_cards_reminder.html.js');

class CardsMailer extends ApplicationMailer {
  async sendDueCardsReminder(userId) {
    if (!userId) return;

    const user = await User.get(userId);
    const url = 'http://pensieve.space/sessions/new';
    const numCards = await Card.countAllDue(userId);

    if (numCards >= user.prefs.sessionSize) {
      this.send({
        to: user.email,
        subject: `You have ${numCards} cards to review`,
        text: text(user.name, numCards, url),
        html: html(user.name, numCards, url),
      });
    }
  }
}

module.exports = CardsMailer;
