const Joi = require('joi');

const Session = require('../models/session');
const Card = require('../models/card');
const sessionSchemas = require('./validation/sessions');

module.exports.create = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Joi.validate(req, sessionSchemas.create, { allowUnknown: true });

    const { type, deck } = req.body;
    const cards = await Card.getAllForSessionType(type, user, deck);
    if (!cards.length > 0) {
      res.status(400).json({
        message: 'No cards available to create session.',
      });
    } else {
      const session = await Session.create(type, user, cards);

      res.send(session);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findSession = async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    await Joi.validate(req, sessionSchemas.findSession, { allowUnknown: true });

    const session = await Session.get(id, user);
    res.send(session);
  } catch (err) {
    next(err);
  }
};
