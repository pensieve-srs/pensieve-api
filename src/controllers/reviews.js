const Joi = require('joi');
const Review = require('../models/review');
const reviewSchemas = require('./validation/reviews');

module.exports.find = async (req, res, next) => {
  try {
    await Joi.validate(req, reviewSchemas.find, { allowUnknown: true });

    const { range } = req.query;
    const response = await Review.countAllForRange(range, req.user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
