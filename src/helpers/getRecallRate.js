const moment = require('moment');

module.exports = (card) => {
  if (!card.nextReviewDate) {
    return 0;
  }
  const anchorDate = card.reviewedAt || card.createdAt;

  const delta = moment().diff(moment(anchorDate));
  const interval = Math.abs(moment(anchorDate).diff(moment(card.nextReviewDate)));
  const recall = 2 ** (-delta / interval);
  return Math.ceil(recall * 100) / 100;
};
