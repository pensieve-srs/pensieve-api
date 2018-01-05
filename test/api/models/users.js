const User = require("../../../api/models/user");
const users = require("../fixtures/users").users;

const mockUser = users[0];
const mockId = require("pow-mongodb-fixtures").createObjectId();

describe("User model", () => {
  describe("get()", () => {
    it("should return user with matching id", done => {
      User.get(mockUser._id).then(user => {
        expect(user._id).to.deep.equal(mockUser._id);
        expect(user.name).to.equal(mockUser.name);
        expect(user.email).to.equal(mockUser.email);

        done();
      });
    });
    it("should not return `password` field", done => {
      User.get(mockUser._id).then(user => {
        expect(user._id).to.deep.equal(mockUser._id);
        expect(user).to.not.have.property("password");

        done();
      });
    });
    it("should return nothing if user does not exist", done => {
      User.get(mockId).then(user => {
        expect(user).to.be.undefined;

        done();
      });
    });
  });
});
