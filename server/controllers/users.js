const User = require("../models/user");
const Item = require("../models/item");
const Deck = require("../models/deck");

const getUser = (req, res) => {
  const userId = req.user._id;

  User.findOne({ _id: userId }).then(
    user => res.status(200).json(user.getCleanUser(user)),
    error => res.status(500).json(error),
  );
};

const editUser = (req, res) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json("Required fields are empty");
  }

  User.findOneAndUpdate(
    { _id: userId },
    { name: req.body.name, email: req.body.email },
    { new: true },
  ).then(
    user => res.status(200).json(user.getCleanUser(user)),
    error => res.status(500).json(error),
  );
};

const deleteUser = (req, res) => {
  const userId = req.user._id;

  Item.remove({ user: userId }).then(
    () => {
      Deck.remove({ user: userId }).then(
        () => {
          User.remove({ _id: userId }).then(
            response => {
              return res.status(200).json(response);
            },
            error => {
              return res.status(500).json(error);
            },
          );
        },
        error => {
          return res.status(500).json(error);
        },
      );
    },
    error => {
      return res.status(500).json(error);
    },
  );
};

module.exports = { getUser, editUser, deleteUser };
