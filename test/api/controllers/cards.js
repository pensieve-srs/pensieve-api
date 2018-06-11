const request = require('supertest');
const data = require('../../fixtures/cards');
const api = require('../../../api/index');
const User = require('../../../api/models/user');

const { user1, user2 } = data;

let server;

describe('Cards controller', () => {
  before(async () => {
    server = await api.start();
  });

  after(async () => {
    await api.close();
  });

  describe('GET /api/cards', () => {
    it('should return array of cards for user', async () => {
      const token = await User.generateToken(user1);

      const response = await request(server)
        .get('/api/cards')
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(2);
    });
  });
  describe('POST /api/cards', () => {
    it('should create single card for user', async () => {
      const token = await User.generateToken(user2);
      const newCard = { front: 'Test front', back: 'Test back' };
      const response = await request(server)
        .post('/api/cards')
        .send(newCard)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body.front).to.include(newCard.front);
      expect(response.body.back).to.include(newCard.back);
    });
  });
  describe('DELETE /api/cards/:id', () => {
    it('should delete single card for user', async () => {
      const token = await User.generateToken(user2);
      const card = data.cards[3];
      const response = await request(server)
        .delete(`/api/cards/${card._id}`)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
    });
  });
});
