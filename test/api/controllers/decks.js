const request = require('supertest');
const data = require('../fixtures/decks');
const server = require('../../../api/index');
const User = require('../../../api/models/user');

const { decks, user1, user2 } = data;

describe('Decks controller', () => {
  describe('GET /api/decks', () => {
    it('should return 400 if no authentication provided', (done) => {
      request(server)
        .get('/api/decks')
        .expect(400, done);
    });

    it('should return decks if token is provided', (done) => {
      const token = User.generateToken(user1);
      const expectedDecks = decks.filter(deck => deck.user === user1._id);

      request(server)
        .get('/api/decks')
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.lengthOf(expectedDecks.length);

          done();
        })
        .catch(error => done(error));
    });
  });
  describe('POST /api/decks', () => {
    it('should create single deck for user', (done) => {
      const token = User.generateToken(user2);
      const newDeck = { title: 'test deck', description: 'test description' };
      request(server)
        .post('/api/decks')
        .send(newDeck)
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          expect(response.body.title).to.include(newDeck.title);
          expect(response.body.description).to.include(newDeck.description);

          done();
        })
        .catch(error => done(error));
    });
  });
  describe('DELETE /api/decks/:id', () => {
    it('should delete single deck for user', (done) => {
      const token = User.generateToken(user2);
      const deck = data.decks[2];
      request(server)
        .delete(`/api/decks/${deck._id}`)
        .set({ Authorization: token })
        .expect(200, done);
    });
  });
});
