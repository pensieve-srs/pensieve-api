const Tag = require('../models/tag');

module.exports.find = async (req, res) => {
  const user = req.user._id;

  try {
    const tags = await Tag.getAll(user);

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.create = async (req, res) => {
  const user = req.user._id;
  const { value } = req.body;

  try {
    const tag = await Tag.new(value, user);

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
};
