const Joi = require('joi');
const Review = require('../models/review');
const reviewSchemas = require('./validation/reviews');

module.exports.find = async (req, res, next) => {
  try {
    await Joi.validate(req, reviewSchemas.find, { allowUnknown: true });

    const reviews = await Review.find({ user: req.user });
    res.send(reviews);
  } catch (err) {
    next(err);
  }
};
