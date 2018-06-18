const Session = require('../../../src/models/session');
const fixtures = require('../../fixtures/sessions');

const { cards, user1 } = fixtures;

describe('Session model', () => {
  describe('new', () => {
    it('should create single session object for user', async () => {
      const type = 'learn';
      const session = await Session.new(type, user1, cards);

      expect(session.cards[0]._id).to.exist;
      expect(session.type).to.equal(type);
      expect(session.user).to.deep.equal(user1._id);
    });
  });
});
