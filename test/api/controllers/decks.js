const request = require('supertest');
const data = require('../../fixtures/decks');
const api = require('../../../src/index');
const User = require('../../../src/models/user');

const { decks, user1, user2 } = data;

let server;
describe('Decks controller', () => {
  before(async () => {
    server = await api.start();
  });

  after(async () => {
    await api.close();
  });

  describe('GET /api/decks', () => {
    it('should return 400 if no authentication provided', async () => {
      const response = await request(server).get('/api/decks');

      expect(response.status).to.equal(400);
    });

    it('should return decks if token is provided', async () => {
      const token = User.generateToken(user1);
      const expectedDecks = decks.filter(deck => deck.user === user1._id);

      const response = await request(server)
        .get('/api/decks')
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(expectedDecks.length);
    });
  });
  describe('POST /api/decks', () => {
    it('should create single deck for user', async () => {
      const token = User.generateToken(user2);
      const newDeck = { title: 'test deck', description: 'test description' };

      const response = await request(server)
        .post('/api/decks')
        .send(newDeck)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal(newDeck.title);
      expect(response.body.description).to.equal(newDeck.description);
    });
  });
  describe('PUT /api/deck/:id', () => {
    it('should update single deck for user', async () => {
      const token = User.generateToken(user2);
      const deck = data.decks[2];
      const expected = { title: 'New title', description: 'New description', notes: 'New notes' };

      const response = await request(server)
        .put(`/api/decks/${deck._id}`)
        .send(expected)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal(expected.title);
      expect(response.body.description).to.equal(expected.description);
      expect(response.body.notes).to.equal(expected.notes);
    });
  });
  describe('DELETE /api/decks/:id', () => {
    it('should delete single deck for user', async () => {
      const token = User.generateToken(user2);
      const deck = data.decks[2];

      const response = await request(server)
        .delete(`/api/decks/${deck._id}`)
        .set({ Authorization: token });

      expect(response.status).to.equal(200);
    });
  });
});
