const request = require("supertest");
const server = require("../../api/index");

describe("Express server", () => {
  it("responds 200 to /", done => {
    request(server)
      .get("/")
      .expect(200, done);
  });

  it("response to 404 unsupported routes", done => {
    request(server)
      .get("/invalid")
      .expect(404, done);
  });
});
