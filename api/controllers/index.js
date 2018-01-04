const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.status(200).json("Welcome to Pensieve"));

router.use("/api/decks", require("./decks"));
router.use("/api/users", require("./users"));

module.exports = router;
