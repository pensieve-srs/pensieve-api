const moment = require('moment');

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

module.exports.getRecallRate = (card) => {
  if (!card.reviewedAt || !card.nextReviewDate) return 0;

  const delta = moment().diff(moment(card.reviewedAt), 'days');
  const interval = Math.abs(moment(card.reviewedAt).diff(moment(card.nextReviewDate), 'days'));
  return 2 ** (-delta / interval);
};

module.exports.getCardAverage = (cards) => {
  const rates = cards.map(card => this.getRecallRate(card));

  return average(rates);
};
