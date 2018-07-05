const Deck = require('../../../src/models/deck');
const data = require('../../fixtures/decks');

const deck1 = data.decks[0];
const { user1 } = data;

describe('Deck model', () => {
  describe('new', () => {
    it('should create single deck for user', async () => {
      const newDeck = { title: 'New deck', description: 'New description' };
      const deck = await Deck.new(newDeck, user1._id);

      expect(deck.title).to.equal(newDeck.title);
      expect(deck.description).to.equal(newDeck.description);
      expect(deck.user).to.deep.equal(user1._id);
    });
  });
  describe('update', () => {
    it('should update single deck for user', async () => {
      const newDeck = { title: 'New deck', description: 'New description' };
      const deck = await Deck.updateDeck(deck1._id, newDeck, user1._id);
      expect(deck.title).to.equal(newDeck.title);
      expect(deck.description).to.equal(newDeck.description);
      expect(deck.user).to.deep.equal(user1._id);
    });
    it('should not update fields that are not defined', async () => {
      const newDeck = { title: 'New deck', description: undefined };
      const deck = await Deck.updateDeck(deck1._id, newDeck, user1._id);
      expect(deck.description).to.be.ok;
    });
  });
});
