const should = require("should");
const request = require("supertest");
const server = require("../../../api/index");

describe("decks", () => {
  describe("GET /decks", () => {
    it("should return an array of decks", done => {
      request(server)
        .get("/decks")
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);

          res.body.should.be.an.instanceOf(Array);

          done();
        });
    });
  });
});
