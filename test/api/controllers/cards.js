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
    it('should return array of cards for user', (done) => {
      const token = User.generateToken(user1);
      request(server)
        .get('/api/cards')
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.lengthOf(2);

          done();
        })
        .catch(error => done(error));
    });
  });
  describe('POST /api/cards', () => {
    it('should create single card for user', (done) => {
      const token = User.generateToken(user2);
      const newCard = { front: 'Test front', back: 'Test back' };
      request(server)
        .post('/api/cards')
        .send(newCard)
        .set({ Authorization: token })
        .expect(200)
        .then((response) => {
          expect(response.body.front).to.include(newCard.front);
          expect(response.body.back).to.include(newCard.back);

          done();
        })
        .catch(error => done(error));
    });
  });
  describe('DELETE /api/cards/:id', () => {
    it('should delete single card for user', (done) => {
      const token = User.generateToken(user2);
      const card = data.cards[3];
      request(server)
        .delete(`/api/cards/${card._id}`)
        .set({ Authorization: token })
        .expect(200, done);
    });
  });
});
