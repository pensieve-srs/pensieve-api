const request = require("supertest");
const data = require("../fixtures/users");
const User = require("../../../api/models/user");
const server = require("../../../api/index");

const users = data.users;
const user1 = users[0];
const user2 = users[1];
const user3 = users[2];
const password1 = data.password1;

describe("Users controller", () => {
  describe("POST /api/users/login", () => {
    it("should return user if authentication is valid", done => {
      request(server)
        .post("/api/users/login")
        .send({ email: user1.email, password: password1 })
        .expect(200)
        .then(response => {
          const user = response.body.user;
          expect(user._id).to.deep.equal(user1._id.toString());
          expect(user.name).to.equal(user1.name);

          done();
        });
    });
    it("should return token if authentication is valid", done => {
      request(server)
        .post("/api/users/login")
        .send({ email: user1.email, password: password1 })
        .expect(200)
        .then(response => {
          const token = response.body.token;
          expect(token).to.be.ok;

          done();
        });
    });
  });

  describe("POST /api/users/signup", () => {
    it("should create user if signup is valid", done => {
      const newUser = { name: "Jim", email: "jim@example.com", password: "test password" };
      request(server)
        .post("/api/users/signup")
        .send(newUser)
        .expect(200)
        .then(response => {
          const user = response.body.user;
          expect(user.name).to.equal(newUser.name);
          expect(user.email).to.equal(newUser.email);

          done();
        });
    });
  });

  describe("GET /api/users/profile", () => {
    it("should return user for valid token", done => {
      const token = User.generateToken(user1);
      request(server)
        .get("/api/users/profile")
        .set({ Authorization: token })
        .expect(200)
        .then(response => {
          const user = response.body;
          expect(user.name).to.equal(user1.name);
          expect(user.email).to.equal(user1.email);

          done();
        });
    });
  });
  describe("PUT /api/user/profile", () => {
    it("should update single user for valid token", done => {
      const token = User.generateToken(user3);
      const newUser = { name: "Greg Tester", email: "greg@example.com" };
      request(server)
        .put("/api/users/profile")
        .send(newUser)
        .set({ Authorization: token })
        .expect(200)
        .then(response => {
          const user = response.body;
          expect(user.name).to.equal(newUser.name);
          expect(user.email).to.equal(newUser.email);

          done();
        });
    });
  });
});
