const request = require("supertest");
const server = require("../server/index");

describe("Express server", () => {
  it("responds to /", () => {
    request(server)
      .get("/")
      .expect(200);
  });
});
