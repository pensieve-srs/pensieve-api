const text = require('./views/signup_alert.text.js');
const mailer = require('@sendgrid/mail');

const { classes: { EmailAddress } } = require('@sendgrid/helpers');

mailer.setApiKey(process.env.SENDGRID_API_KEY);

const adminEmail = process.env.ADMIN_EMAIL;
const adminAddress = new EmailAddress({ name: 'Pensieve', email: adminEmail });

module.exports.sendSignupAlert = user =>
  mailer.send({
    to: adminAddress,
    from: adminAddress,
    subject: 'New user alert! - You receive a new signup',
    text: text(user),
    html: text(user),
  });
