const request = require('supertest');
const data = require('../../fixtures/sessions');
const server = require('../../../api/index');
const User = require('../../../api/models/user');

const { sessions, user1 } = data;

describe('Sessions controller', () => {
  describe('GET /api/sessions/:id', () => {
    it('should return a single session for user', (done) => {
      const expectedSession = sessions[0];
      const token = User.generateToken(user1);
      request(server)
        .get(`/api/sessions/${sessions[0]._id}`)
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          expect(response.body.type).to.equal(expectedSession.type);
          expect(response.body.cards).to.have.lengthOf(expectedSession.cards.length);
          expect(response.body.user).to.equal(expectedSession.user.toString());

          done();
        })
        .catch(error => done(error));
    });
  });
});
