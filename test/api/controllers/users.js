const request = require('supertest');
const User = require('../../../api/models/user');
const server = require('../../../api/index');
const data = require('../../fixtures/users');

const { users, password1, invites } = data;
const invite1 = invites[0];
const user1 = users[0];
const user3 = users[2];

describe('Users controller', () => {
  describe('POST /api/users/login', () => {
    it('should return user if authentication is valid', (done) => {
      request(server)
        .post('/api/users/login')
        .send({ email: user1.email, password: password1 })
        .expect(200)
        .then((response) => {
          const { user } = response.body;
          expect(user._id).to.deep.equal(user1._id.toString());
          expect(user.name).to.equal(user1.name);

          done();
        })
        .catch(error => done(error));
    });
    it('should return token if authentication is valid', (done) => {
      request(server)
        .post('/api/users/login')
        .send({ email: user1.email, password: password1 })
        .expect(200)
        .then((response) => {
          const { token } = response.body;
          expect(token).to.exist; // eslint-disable-line no-unused-expressions

          done();
        })
        .catch(error => done(error));
    });
  });

  describe('POST /api/users/signup', () => {
    it('should create user if signup is valid', (done) => {
      const newUser = {
        name: 'Jim',
        email: 'jim@example.com',
        password: 'test password',
        invite: invite1.value,
      };
      request(server)
        .post('/api/users/signup')
        .send(newUser)
        .expect(200)
        .then((response) => {
          const { user } = response.body;
          expect(user.name).to.equal(newUser.name);
          expect(user.email).to.equal(newUser.email);

          done();
        })
        .catch(error => done(error));
    });
  });

  describe('GET /api/users/profile', () => {
    it('should return user for valid token', (done) => {
      const token = User.generateToken(user1);
      request(server)
        .get('/api/users/profile')
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          const user = response.body;
          expect(user.name).to.equal(user1.name);
          expect(user.email).to.equal(user1.email);

          done();
        })
        .catch(error => done(error));
    });
  });
  describe('PUT /api/user/profile', () => {
    it('should update single user for valid token', (done) => {
      const token = User.generateToken(user3);
      const newUser = { name: 'Greg Tester', email: 'greg@example.com' };
      request(server)
        .put('/api/users/profile')
        .send(newUser)
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          const user = response.body;
          expect(user.name).to.equal(newUser.name);
          expect(user.email).to.equal(newUser.email);

          done();
        });
    });
  });
});
