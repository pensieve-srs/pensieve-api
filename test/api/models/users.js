const User = require('../../../src/models/user');
const data = require('../../fixtures/users');

const { users } = data;
const user1 = users[0];
const user2 = users[1];

describe('User model', () => {
  describe('update', () => {
    it('should update user with matching id', async () => {
      const body = { name: 'Jon Tester', email: 'jon@example.com' };
      const user = await User.update(body, user1._id);

      expect(user._id).to.deep.equal(user1._id);
      expect(user.name).to.equal(body.name);
      expect(user.email).to.equal(body.email);
    });
    it('should not update fields that are not defined', async () => {
      const body = { name: 'Joe Tester', email: undefined };
      const user = await User.update(body, user2._id);

      expect(user._id).to.deep.equal(user2._id);
      expect(user.name).to.equal(body.name);
      expect(user.email).to.equal(user2.email);
    });
    it('should not return `password` field', async () => {
      const body = { name: 'Jon Tester', email: 'jon@example.com' };
      const user = await User.update(body, user1._id);

      expect(user._id).to.deep.equal(user1._id);
      expect(user.password).to.be.undefined;
    });
  });
  describe('new', () => {
    it('should create user with matching information', async () => {
      const body = { name: 'Sue Tester', email: 'sue@example.com', password: 'password1234h' };
      const user = await User.new(body);

      expect(user.name).to.equal(body.name);
      expect(user.email).to.equal(body.email);
    });
  });
  describe('authenticateUser', () => {
    it('should authenticate user with correct information', async () => {
      const body = { name: 'Sid Tester', email: 'sid@example.com', password: 'password1234h' };
      await User.new(body);
      const user = await User.authenticateUser(body.email, body.password);

      expect(user.name).to.equal(body.name);
      expect(user.email).to.equal(body.email);
    });
  });
});
