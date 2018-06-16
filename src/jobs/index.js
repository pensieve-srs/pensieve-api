/* eslint-disable global-require */
module.exports = (agenda) => {
  require('./ping')(agenda);
  require('./cardEmails')(agenda);
  require('./newUser')(agenda);
  require('./deckEmails')(agenda);
};
