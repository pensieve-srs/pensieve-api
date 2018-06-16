const request = require('supertest');
const User = require('../../../src/models/user');
const api = require('../../../src/index');
const data = require('../../fixtures/users');

const { users, password1 } = data;
const user1 = users[0];
const user3 = users[2];

let server;
describe('Users controller', () => {
  before(async () => {
    server = await api.start();
  });

  after(async () => {
    await api.close();
  });
  describe('POST /api/users/login', () => {
    it('should return user if authentication is valid', async () => {
      const response = await request(server)
        .post('/api/users/login')
        .send({ email: user1.email, password: password1 });

      expect(response.status).to.equal(200);
      const { user } = response.body;
      expect(user._id).to.deep.equal(user1._id.toString());
      expect(user.name).to.equal(user1.name);
    });
    it('should return token if authentication is valid', async () => {
      const response = await request(server)
        .post('/api/users/login')
        .send({ email: user1.email, password: password1 });

      const { authorization: token } = response.headers;
      expect(response.status).to.equal(200);
      expect(token).to.exist;
    });
  });

  describe('POST /api/users/signup', () => {
    it('should create user if signup is valid', async () => {
      const newUser = {
        name: 'Jim',
        email: 'jim@example.com',
        password: 'test password 123',
      };
      const response = await request(server)
        .post('/api/users/signup')
        .send(newUser);

      const { user } = response.body;
      expect(response.status).to.equal(200);
      expect(user.name).to.equal(newUser.name);
      expect(user.email).to.equal(newUser.email);
    });
  });

  describe('GET /api/users/profile', () => {
    it('should return user for valid token', async () => {
      const token = User.generateToken(user1);
      const response = await request(server)
        .get('/api/users/profile')
        .set({ Authorization: token });

      const user = response.body;
      expect(response.status).to.equal(200);
      expect(user.name).to.equal(user1.name);
      expect(user.email).to.equal(user1.email);
    });
  });
  describe('PUT /api/user/profile', () => {
    it('should update single user for valid token', async () => {
      const token = User.generateToken(user3);
      const newUser = { name: 'Greg Tester', email: 'greg@example.com' };

      const response = await request(server)
        .put('/api/users/profile')
        .send(newUser)
        .set({ Authorization: token });

      const user = response.body;
      expect(response.status).to.equal(200);
      expect(user.name).to.equal(newUser.name);
      expect(user.email).to.equal(newUser.email);
    });
  });
});
