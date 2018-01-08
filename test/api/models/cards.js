const Card = require('../../../api/models/card');
const data = require('../fixtures/cards');

const {
  cards, deck1, deck3, user1, user2,
} = data;

describe('Card model', () => {
  describe('get', () => {
    it('should return single card for user', (done) => {
      Card.get(cards[0]._id, user1).then((card) => {
        expect(card._id).to.deep.equal(cards[0]._id);
        expect(card.front).to.deep.equal(cards[0].front);

        done();
      });
    });
  });
  describe('create', () => {
    it('should create single card for user', (done) => {
      const newCard = { front: 'New card front', back: 'New card back', deck: deck1 };
      Card.create(newCard, user1).then((card) => {
        expect(card.front).to.equal(newCard.front);
        expect(card.back).to.equal(newCard.back);
        expect(card.deck).to.deep.equal(deck1);

        done();
      });
    });
  });
  describe('update', () => {
    it('should update single card for user', (done) => {
      const newCard = { front: 'New card front', back: 'New card back' };
      Card.update(cards[0]._id, newCard, user1).then((card) => {
        expect(card.front).to.equal(newCard.front);
        expect(card.back).to.equal(newCard.back);

        done();
      });
    });
  });
  describe('delete', () => {
    it('should delete single card for user', (done) => {
      Card.getAll(user1).then((prevCards) => {
        Card.delete(prevCards[0]._id, user1).then(() => {
          Card.getAll(user1).then((newCards) => {
            expect(newCards).to.have.lengthOf(prevCards.length - 1);

            done();
          });
        });
      });
    });
  });
  describe('deleteAllByDeck', () => {
    it('should delete all cards for a deck', (done) => {
      Card.getAllByDeck(deck3, user2).then((prevCards) => {
        Card.deleteAllByDeck(deck3, user2).then(() => {
          Card.getAllByDeck(deck3, user2).then((newCards) => {
            expect(prevCards).to.not.be.empty;
            expect(newCards).to.be.empty;

            done();
          });
        });
      });
    });
  });
});
