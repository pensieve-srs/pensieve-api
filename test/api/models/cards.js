const Card = require('../../../api/models/card');
const data = require('../fixtures/cards');

const {
  cards, deck1, deck3, user1, user2,
} = data;

describe('Card model', () => {
  describe('get', () => {
    it('should return single card for user', async () => {
      const card = await Card.get(cards[0]._id, user1);
      expect(card._id).to.deep.equal(cards[0]._id);
      expect(card.front).to.deep.equal(cards[0].front);
    });
  });
  describe('getAll', () => {
    it('should return all cards for user', async () => {
      const response = await Card.getAll(user1);
      expect(response).to.have.lengthOf(2);
    });
  });
  describe('countAll', () => {
    it('should return the length of all cards for a user', async () => {
      const response = await Card.countAll(user1);
      expect(response).to.equal(2);
    });
  });
  describe('create', () => {
    it('should create single card for user', async () => {
      const newCard = { front: 'New card front', back: 'New card back', deck: deck1 };
      const card = await Card.create(newCard, user1);
      expect(card.front).to.equal(newCard.front);
      expect(card.back).to.equal(newCard.back);
      expect(card.deck).to.deep.equal(deck1);
    });
  });
  describe('update', () => {
    it('should update single card for user', async () => {
      const newCard = { front: 'New card front', back: 'New card back' };
      const card = await Card.update(cards[0]._id, newCard, user1);
      expect(card.front).to.equal(newCard.front);
      expect(card.back).to.equal(newCard.back);
    });
  });
  describe('delete', () => {
    it('should delete single card for user', async () => {
      const prevCards = await Card.getAll(user1);
      await Card.delete(prevCards[0]._id, user1);
      const newCards = await Card.getAll(user1);
      expect(newCards.length).to.equal(prevCards.length - 1);
    });
  });
  describe('deleteAllByDeck', () => {
    it('should delete all cards for a deck', async () => {
      const prevCards = await Card.getAllByDeck(deck3, user2);
      await Card.deleteAllByDeck(deck3, user2);
      const newCards = await Card.getAllByDeck(deck3, user2);
      expect(newCards.length).to.equal(prevCards.length - 1);
    });
  });
});
