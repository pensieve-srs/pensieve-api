const request = require('supertest');
const data = require('../../fixtures/sessions');
const api = require('../../../src/index');
const User = require('../../../src/models/user');

const { sessions, user1 } = data;

let server;
describe('Sessions controller', () => {
  before(async () => {
    server = await api.start();
  });

  after(async () => {
    await api.close();
  });

  describe('GET /api/sessions/:id', () => {
    it('should return a single session for user', async () => {
      const expectedSession = sessions[0];
      const token = User.generateToken(user1);
      const response = await request(server)
        .get(`/api/sessions/${sessions[0]._id}`)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body.type).to.equal(expectedSession.type);
      expect(response.body.cards).to.have.lengthOf(expectedSession.cards.length);
      expect(response.body.user).to.equal(expectedSession.user.toString());
    });
  });
});
