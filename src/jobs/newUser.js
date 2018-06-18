const AdminMailer = require('../../mailers/admin_mailer');

module.exports = (agenda) => {
  agenda.define('newUser', async () => {
    try {
      await AdminMailer.sendSignupAlert();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      process.exit(-1);
    }
  });
};
