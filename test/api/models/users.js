const User = require("../../../api/models/user");
const users = require("../fixtures/users").users;

const mockUser1 = users[0];
const mockUser2 = users[1];
const mockUser3 = users[2];
const mockId = require("pow-mongodb-fixtures").createObjectId();

describe("User model", () => {
  describe("get", () => {
    it("should return user with matching id", done => {
      User.get(mockUser1._id).then(user => {
        expect(user._id).to.deep.equal(mockUser1._id);
        expect(user.name).to.equal(mockUser1.name);
        expect(user.email).to.equal(mockUser1.email);

        done();
      });
    });
    it("should return nothing if user does not exist", done => {
      User.get(mockId).then(user => {
        expect(user).to.be.undefined;

        done();
      });
    });
    it("should not return `password` field", done => {
      User.get(mockUser1._id).then(user => {
        expect(user._id).to.deep.equal(mockUser1._id);
        expect(user).to.not.have.property("password");

        done();
      });
    });
  });
  describe("update", () => {
    it("should update user with matching id", done => {
      const newUser = { name: "Jon Tester", email: "jon@example.com" };
      User.update(newUser, mockUser1._id).then(user => {
        expect(user._id).to.deep.equal(mockUser1._id);
        expect(user.name).to.equal(newUser.name);
        expect(user.email).to.equal(newUser.email);

        done();
      });
    });
    it("should not update fields that are not defined", done => {
      const newUser = { name: "Joe Tester", email: undefined };
      User.update(newUser, mockUser2._id).then(user => {
        expect(user._id).to.deep.equal(mockUser2._id);
        expect(user.name).to.equal(newUser.name);
        expect(user.email).to.equal(mockUser2.email);

        done();
      });
    });
    it("should not return `password` field", done => {
      const newUser = { name: "Jon Tester", email: "jon@example.com" };
      User.update(newUser, mockUser1._id).then(user => {
        expect(user._id).to.deep.equal(mockUser1._id);
        expect(user).to.not.have.property("password");

        done();
      });
    });
  });
  describe("remove", () => {
    it("should remove user with matching id", done => {
      User.delete(mockUser2._id).then(response => {
        User.get(mockUser2._id).then(user => {
          expect(user).to.be.undefined;

          done();
        });
      });
    });
  });
  describe("create", () => {
    it("should create user with matching information", done => {
      const newUser = { name: "Sue Tester", email: "sue@example.com", password: "1234h" };
      User.create(newUser).then(user => {
        expect(user.name).to.equal(newUser.name);
        expect(user.email).to.equal(newUser.email);

        done();
      });
    });
  });
  describe("authenticate", () => {
    it("should authenticate user with correct information", done => {
      const newUser = { name: "Sid Tester", email: "sid@example.com", password: "1234h" };
      User.create(newUser).then(() => {
        User.authenticate(newUser.email, newUser.password).then(user => {
          expect(user.name).to.equal(newUser.name);
          expect(user.email).to.equal(newUser.email);

          done();
        });
      });
    });
  });
});
