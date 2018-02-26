const moment = require('moment');

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

module.exports.getRecallRate = (card) => {
  const anchorDate = card.reviewedAt || card.createdAt;

  const delta = moment().diff(moment(anchorDate));
  const interval = Math.abs(moment(anchorDate).diff(moment(card.nextReviewDate)));
  const recall = 2 ** (-delta / interval);
  return Math.ceil(recall * 100) / 100;
};

module.exports.getCardAverage = (cards) => {
  const rates = cards.map(card => this.getRecallRate(card));

  return average(rates);
};
