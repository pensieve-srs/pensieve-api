const Card = require('../../../src/models/card');
const data = require('../../fixtures/cards');

const { cards, deck1, user1 } = data;

describe('Card model', () => {
  describe('new', () => {
    it('should create single card for user', async () => {
      const newCard = { front: 'New card front', back: 'New card back', deck: deck1 };
      const card = await Card.new(newCard, user1);
      expect(card.front).to.equal(newCard.front);
      expect(card.back).to.equal(newCard.back);
      expect(card.deck).to.deep.equal(deck1);
    });
  });
  describe('update', () => {
    it('should update single card for user', async () => {
      const newCard = { front: 'New card front', back: 'New card back' };
      const card = await Card.updateCard(cards[0]._id, newCard, user1);
      expect(card.front).to.equal(newCard.front);
      expect(card.back).to.equal(newCard.back);
    });
  });
  describe('delete', () => {
    it('should delete single card for user', async () => {
      const prevCards = await Card.find({ user: user1 });
      await Card.remove({ _id: prevCards[0]._id, user: user1 });
      const newCards = await Card.find({ user: user1 });
      expect(newCards.length).to.equal(prevCards.length - 1);
    });
  });
});
