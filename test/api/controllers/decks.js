const request = require("supertest");

const server = require("../../../api/index");

describe("Decks controller", () => {
  it("GET /decks", done => {
    request(server)
      .get("/decks")
      .expect(200, done);
  });
});
