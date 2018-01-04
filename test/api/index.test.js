const request = require("supertest");
const server = require("../../api/index");

describe("Express server", () => {
  it("responds to /", done => {
    request(server)
      .get("/")
      .expect(200, done);
  });

  it("404 everything else", done => {
    request(server)
      .get("/foo/bar")
      .expect(404, done);
  });
});
