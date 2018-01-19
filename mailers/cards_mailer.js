const ApplicationMailer = require('./application_mailer');
const User = require('../api/models/user');

class CardsMailer extends ApplicationMailer {
  async sendDueCardsReminder(userId) {
    if (!userId) return;

    const user = await User.get(userId);

    this.send({
      to: user.email,
      subject: 'This is a test email',
      text: 'This is a test description',
      html: 'This is a <strong>test description</strong>',
    });
  }
}

module.exports = CardsMailer;
