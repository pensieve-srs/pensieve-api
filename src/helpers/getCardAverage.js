const getRecallRate = require('./getRecallRate');

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

module.exports = (cards) => {
  const rates = cards.map(card => getRecallRate(card));

  return average(rates);
};
