const Review = require('../models/review');

module.exports.find = async (req, res, next) => {
  const user = req.user._id;
  const { range } = req.query;

  try {
    const response = await Review.countAllForRange(range, user);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
