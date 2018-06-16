const Review = require('../../../src/models/review');
const id = require('pow-mongodb-fixtures').createObjectId;

const user1 = id();
const card1 = id();

describe('Review model', () => {
  describe('create', () => {
    it('should create new review object for user', async () => {
      const review = await Review.create(card1, 'hard', user1);

      expect(review.value).to.equal('hard');
      expect(review.user).to.deep.equal(user1);
      expect(review.card).to.deep.equal(card1);
    });
  });
  describe('get', () => {
    it('should return review object by id', async () => {
      const review = await Review.create(card1, 'hard', user1);
      const response = await Review.get(review._id, review.user);

      expect(review._id).to.deep.equal(response._id);
    });
  });
});
