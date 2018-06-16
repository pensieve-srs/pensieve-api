const Review = require('../models/review');

module.exports.find = async (req, res) => {
  const user = req.user._id;
  const { range } = req.query;

  try {
    const response = Review.countAllForRange(range, user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
