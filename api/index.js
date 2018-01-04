const express = require("express");
const chalk = require("chalk");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const db = require("../db");
const routes = require("./routes");

const app = express();

db.connect();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(require("./controllers"));
app.use("/", routes);

const server = app.listen(process.env.PORT || 5000, err => {
  if (err) {
    console.error(err);
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log(chalk.cyan("✨  Starting the server..."));
    }
  }
});

module.exports = server;
