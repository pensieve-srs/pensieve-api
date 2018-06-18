const request = require('supertest');
const data = require('../../fixtures/cards');
const api = require('../../../src/index');
const User = require('../../../src/models/user');

const { user1, user2, deck1 } = data;

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
    it('should return only cards of deck if deck header is present', async () => {
      const token = await User.generateToken(user1);

      const response = await request(server)
        .get(`/api/cards?deck=${deck1}`)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(1);
    });
    it('should return array of all cards for user if deck header is not present', async () => {
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
      const newCard = { front: 'Test front', back: 'Test back', deck: data.deck1 };
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
