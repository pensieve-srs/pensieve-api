const Joi = require('joi');

const Session = require('../models/session');
const Card = require('../models/card');
const sessionSchemas = require('./validation/sessions');
const sessionTypes = require('../utils/sessionTypes');

module.exports.create = async (req, res, next) => {
  try {
    await Joi.validate(req, sessionSchemas.create, { allowUnknown: true });

    const { type, deck } = req.body;
    let cards;
    switch (type) {
      case sessionTypes.learn:
        cards = await Card.find({ user: req.user, repetitions: 0 }).populate('deck');
        break;
      case sessionTypes.review:
        cards = await Card.find({ user: req.user })
          .populate('deck')
          .where('nextReviewDate')
          .lt(new Date());
        break;
      case sessionTypes.deck:
      default:
        cards = await Card.find({ user: req.user, deck })
          .populate('deck')
          .sort('nextReviewDate')
          .find({
            $or: [{ nextReviewDate: null }, { nextReviewDate: { $lte: new Date() } }],
          });
        break;
    }

    if (!cards.length > 0) {
      res.status(400).json({
        message: 'No cards available to create session.',
      });
    } else {
      const session = await Session.new(type, req.user, cards);

      res.send(session);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Joi.validate(req, sessionSchemas.findSession, { allowUnknown: true });

    const session = await Session.findOne({ _id: id, user: req.user }).populate({
      path: 'cards',
      model: 'Card',
      populate: { path: 'deck', model: 'Deck' },
    });

    res.send(session);
  } catch (err) {
    next(err);
  }
};
