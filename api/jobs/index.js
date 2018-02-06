/* eslint-disable global-require */
module.exports = (agenda) => {
  require('./emails')(agenda);
  require('./ping')(agenda);
};
