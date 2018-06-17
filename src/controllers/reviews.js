const Joi = require('joi');
const Review = require('../models/review');
const reviewSchemas = require('./validation/reviews');

module.exports.find = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Joi.validate(req, reviewSchemas.find, { allowUnknown: true });

    const { range } = req.query;
    const response = await Review.countAllForRange(range, user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
