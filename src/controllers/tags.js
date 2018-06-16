const Tag = require('../models/tag');

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
  const { value } = req.body;

  try {
    const tag = await Tag.new(value, user);
    res.send(tag);
  } catch (err) {
    next(err);
  }
};
