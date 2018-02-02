const Deck = require('../../../api/models/deck');
const data = require('../../fixtures/decks');

const deck1 = data.decks[0];
const { user1 } = data;

describe('Deck model', () => {
  describe('get', () => {
    it('should return single deck for user', (done) => {
      Deck.get(deck1._id, user1._id).then((deck) => {
        expect(deck._id).to.deep.equal(deck1._id);
        expect(deck.title).to.deep.equal(deck.title);

        done();
      });
    });
  });
  describe('all', () => {
    it('should return all decks for user', (done) => {
      const decksForUser = data.decks.filter(deck => deck.user === user1._id);

      Deck.find({ user: user1._id }).then((decks) => {
        expect(decks.length).to.equal(decksForUser.length);

        done();
      });
    });
  });
  describe('new', () => {
    it('should create single deck for user', (done) => {
      const newDeck = { title: 'New deck', description: 'New description' };
      Deck.new(newDeck, user1._id).then((deck) => {
        expect(deck.title).to.equal(newDeck.title);
        expect(deck.description).to.equal(newDeck.description);
        expect(deck.user).to.deep.equal(user1._id);

        done();
      });
    });
  });
  describe('update', () => {
    it('should update single deck for user', (done) => {
      const newDeck = { title: 'New deck', description: 'New description' };
      Deck.update(deck1._id, newDeck, user1._id).then((deck) => {
        expect(deck.title).to.equal(newDeck.title);
        expect(deck.description).to.equal(newDeck.description);
        expect(deck.user).to.deep.equal(user1._id);

        done();
      });
    });
    it('should not update fields that are not defined', (done) => {
      const newDeck = { title: 'New deck', description: undefined };
      Deck.update(deck1._id, newDeck, user1._id).then((deck) => {
        expect(deck.description).to.be.ok;

        done();
      });
    });
  });
});
