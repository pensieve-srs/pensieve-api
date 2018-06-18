const Joi = require('joi');

const Tag = require('../models/tag');
const tagSchemas = require('./validation/tags');

module.exports.find = async (req, res, next) => {
  try {
    const tags = await Tag.find({ user: req.user });
    res.send(tags);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    await Joi.validate(req, tagSchemas.create, { allowUnknown: true });
    const { value } = req.body;

    const tag = await Tag.create({ value, user: req.user });
    res.send(tag);
  } catch (err) {
    next(err);
  }
};
