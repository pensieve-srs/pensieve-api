const Review = require("../../../api/models/review");
const id = require("pow-mongodb-fixtures").createObjectId;

const user1 = id();
const card1 = id();

describe("Review model", () => {
  describe("create", () => {
    it("should create new review object for user", done => {
      Review.create("hard", card1, user1).then(review => {
        expect(review.value).to.equal("hard");
        expect(review.user).to.deep.equal(user1);
        expect(review.card).to.deep.equal(card1);

        done();
      });
    });
  });
  describe("get", () => {
    it("should return review object by id", done => {
      Review.create("hard", card1, user1).then(newReview => {
        Review.get(newReview._id, newReview.user).then(review => {
          expect(review._id).to.deep.equal(newReview._id);

          done();
        });
      });
    });
  });
});
