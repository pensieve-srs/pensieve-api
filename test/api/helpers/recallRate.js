const getRecallRate = require('../../../src/helpers/getRecallRate');
const getCardAverage = require('../../../src/helpers/getCardAverage');

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const oneWeekFuture = new Date();
oneWeekFuture.setDate(oneWeekFuture.getDate() - 7);

const MOCK_CARD = {
  front: 'Test card',
  back: 'Test back',
  reviewedAt: oneWeekAgo,
  nextReviewDate: new Date(),
};

const MOCK_CARD2 = {
  front: 'Test card',
  back: 'Test back',
  reviewedAt: new Date(),
  nextReviewDate: oneWeekFuture,
};

const MOCK_CARDS = [MOCK_CARD, MOCK_CARD2];

describe('recallRate', () => {
  describe('getRecallRate', () => {
    it('should return rate of 50% for current review date', () => {
      expect(getRecallRate(MOCK_CARD)).to.equal(0.5);
    });
    it('should return recall rate of 100% for current reviewed timestamp', () => {
      expect(getRecallRate(MOCK_CARD2)).to.equal(1.0);
    });
  });
  describe('getCardAverage', () => {
    it('should return average recall rate for array of cards', () => {
      expect(getCardAverage(MOCK_CARDS)).to.equal(0.75);
    });
  });
});
