const Session = require('../../../api/models/session');
const fixtures = require('../../fixtures/sessions');

const { cards, user1, sessions } = fixtures;

describe('Session model', () => {
  describe('get', () => {
    it('should return single session object for user', (done) => {
      Session.get(sessions[0]._id, user1).then((session) => {
        expect(session._id).to.deep.equal(sessions[0]._id);

        done();
      });
    });
    it('should return populated card objects for session', (done) => {
      Session.get(sessions[0]._id, user1).then((session) => {
        expect(session.cards[0]._id).to.deep.equal(cards[0]._id);
        expect(session.cards[1]._id).to.deep.equal(cards[1]._id);

        done();
      });
    });
  });
  describe('create', () => {
    it('should create single session object for user', (done) => {
      Session.create(Session.types.learn, user1, cards).then((session) => {
        expect(session.cards[0]._id).to.exist;
        expect(session.type).to.equal(Session.types.learn);
        expect(session.user).to.deep.equal(user1._id);

        done();
      });
    });
  });
});
