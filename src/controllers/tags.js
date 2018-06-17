const Joi = require('joi');

const Tag = require('../models/tag');
const tagSchemas = require('./validation/tags');

module.exports.find = async (req, res, next) => {
  const user = req.user._id;

  try {
    const tags = await Tag.getAll(user);
    res.send(tags);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  const user = req.user._id;

  try {
    await Joi.validate(req, tagSchemas.create, { allowUnknown: true });
    const { value } = req.body;

    const tag = await Tag.new(value, user);
    res.send(tag);
  } catch (err) {
    next(err);
  }
};
