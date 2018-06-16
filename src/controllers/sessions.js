const Session = require('../models/session');
const Card = require('../models/card');

module.exports.create = async (req, res) => {
  const user = req.user._id;
  const { type, deck } = req.body;

  try {
    const cards = await Card.getAllForSessionType(type, user, deck);
    if (!cards.length > 0) {
      res.status(400).json({
        message: 'No cards available to create session.',
      });
    } else {
      const session = await Session.create(type, user, cards);

      res.status(200).json(session);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.findSession = async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    const session = await Session.get(id, user);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json(error);
  }
};
