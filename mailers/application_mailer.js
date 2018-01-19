const mailer = require('@sendgrid/mail');

class ApplicationMailer {
  constructor() {
    this.mailer = mailer;
    this.mailer.setApiKey(process.env.SENDGRID_API_KEY);
  }

  send({
    to, subject, text, html, from = 'niko@pensieve.space',
  }) {
    if (!to || !subject) {
      throw new Error('Mailer invalid arguments');
    }

    this.mailer.send({
      to,
      from,
      subject,
      text,
      html,
    });
  }
}

module.exports = ApplicationMailer;
