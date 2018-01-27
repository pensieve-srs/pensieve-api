const CardsMailer = require('../../mailers/cards_mailer');
const data = require('../fixtures/users');
const sinon = require('sinon');
const mailer = require('@sendgrid/mail');

sinon.stub(mailer, 'send');

describe('Cards mailer', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => mailer.send.reset());

  describe('sendDueCardsEmail', () => {
    it('should send email for valid user', async () => {
      await CardsMailer.sendDueCardsEmail(data.userWithEmailNotifs._id);
      expect(mailer.send).to.have.been.calledOnce;
    });

    it('should not send email if user`s notification preference is off', async () => {
      await CardsMailer.sendDueCardsEmail(data.userWithoutEmailNotifs._id);
      expect(mailer.send.callCount).to.equal(0);
    });

    it('should not send email if number of due cards are less than user`s session size', async () => {
      await CardsMailer.sendDueCardsEmail(data.userWithoutCards._id);
      expect(mailer.send.callCount).to.equal(0);
    });
  });

  describe('sendNewCardsEmail', () => {
    it('should send email for valid user', async () => {
      await CardsMailer.sendNewCardsEmail(data.userWithEmailNotifs._id);
      expect(mailer.send).to.have.been.calledOnce;
    });

    it('should not send email if user`s notification preference is off', async () => {
      await CardsMailer.sendNewCardsEmail(data.userWithoutEmailNotifs._id);
      expect(mailer.send.callCount).to.equal(0);
    });

    it('should not send email if number of new cards are less than 3', async () => {
      await CardsMailer.sendNewCardsEmail(data.userWithoutCards._id);
      expect(mailer.send.callCount).to.equal(0);
    });
  });
});
