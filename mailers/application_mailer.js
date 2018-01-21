const mailer = require('@sendgrid/mail');
const { classes: { EmailAddress } } = require('@sendgrid/helpers');

class ApplicationMailer {
  constructor() {
    this.mailer = mailer;
    this.mailer.setApiKey(process.env.SENDGRID_API_KEY);
  }

  send({
    to,
    subject,
    text,
    html,
    from = new EmailAddress({ name: 'Pensieve', email: 'niko@pensieve.space' }),
  }) {
    if (!to || !subject) {
      throw new Error('Mailer invalid arguments');
    }

    return this.mailer.send({
      to,
      from,
      subject,
      text,
      html,
    });
  }
}

module.exports = ApplicationMailer;
