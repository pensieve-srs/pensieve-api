const request = require("supertest");

const server = require("../../../api/index");

describe("Decks controller", () => {
  describe("GET /decks", () => {
    it("should return 404 if no authentication provided", done => {
      request(server)
        .get("/decks")
        .expect(404, done);
    });
  });
});
