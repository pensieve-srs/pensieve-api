const CardsMailer = require('../../mailers/cards_mailer');
const { userWithPrefs } = require('../fixtures/users');
const sinon = require('sinon');

const cardsMailer = new CardsMailer();

describe('Cards mailer', () => {
  describe('sendDueCardsReminder', () => {
    it('should send email for valid user', async () => {
      sinon.stub(CardsMailer.prototype, 'send');
      cardsMailer.sendDueCardsReminder(userWithPrefs._id);
      expect(CardsMailer.prototype.send.called).to.equal(true);
    });

    it('should not send email if user`s notification preference is off', () => {
      expect(true).to.equal(false);
    });

    it('should not send email if number of due cards are less than user`s session size', () => {
      expect(true).to.equal(false);
    });
  });
});
