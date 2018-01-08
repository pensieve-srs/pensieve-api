const request = require('supertest');
const data = require('../fixtures/cards');
const server = require('../../../api/index');
const User = require('../../../api/models/user');

const { user2 } = data;

describe('Cards controller', () => {
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
