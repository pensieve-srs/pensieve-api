const moment = require('moment');
const pluralize = require('pluralize');

const User = require('../db/schemas/user');
const Deck = require('../api/models/deck');
const Card = require('../db/schemas/card');
const recallRate = require('../api/helpers/recallRate');
const expiredDeckEmailText = require('./views/expired_decks_email.text.js');
const expiredDeckEmailHTML = require('./views/expired_decks_email.html.js');

const oneHourAgo = moment().subtract(1, 'hours');

const mailer = require('@sendgrid/mail');
const { classes: { EmailAddress } } = require('@sendgrid/helpers');

mailer.setApiKey(process.env.SENDGRID_API_KEY);

const fromAddress = new EmailAddress({ name: 'Pensieve', email: 'hello@pensieve.space' });

const getIsExpiredAtThreshold = (allCards, expiredCards, threshold) => {
  if (allCards.length === expiredCards.length) return true;

  const activeCards = allCards.filter(card => !expiredCards.find(el => el._id.equals(card._id)));

  const avgRecall = recallRate.getCardAverage(allCards);
  const avgRecallWithoutExpiredCards = recallRate.getCardAverage(activeCards);

  return avgRecall <= threshold && threshold <= avgRecallWithoutExpiredCards;
};

// Send out email to users with decks less than 50% strength
module.exports.sendExpiredDeckEmail = async (userId) => {
  if (!userId) return;

  const user = await User.findOne({ _id: userId, 'prefs.emailNotifs': true });

  const decks = await Deck.find({ user: user._id });

  const expiredDecks = await Promise.all(decks.map(async (deck) => {
    const cardsExpiredInPastHour = await Card.find({
      deck: deck._id,
      nextReviewDate: { $gt: oneHourAgo, $lt: new Date() },
    });
    const allCards = await Card.find({ deck: deck._id });

    const isExpiredDeck =
        cardsExpiredInPastHour.length > 0 &&
        getIsExpiredAtThreshold(allCards, cardsExpiredInPastHour, 0.5);

    return isExpiredDeck ? deck : undefined;
  })).then(results => results.filter(deck => !!deck));

  if (!expiredDecks || expiredDecks.length === 0) {
    return;
  }

  const url = `http://pensieve.space/sessions/new?deckId=${expiredDecks[0]._id}`;

  const subject =
    expiredDecks.length > 1
      ? `It's time to review '${expiredDecks[0].title}' and ${pluralize(
        'other',
        expiredDecks.length - 1,
        true,
      )}`
      : `It's time to review '${expiredDecks[0].title}'`;

  await mailer.send({
    subject,
    to: user.email,
    from: fromAddress,
    text: expiredDeckEmailText(user.name, expiredDecks, url),
    html: expiredDeckEmailHTML(user.name, expiredDecks, url),
  });
};
