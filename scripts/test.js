"use strict";

process.env.NODE_ENV = "test";

const Mocha = require("mocha");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const paths = require("../config/paths");
const glob = require("glob");
const fixtures = require("pow-mongodb-fixtures").connect("boreas-test");
require("chai/register-expect");

require("../config/env");

// Instantiate a Mocha instance.
const mocha = new Mocha();

var testDir = paths.test;

fixtures.clear(function(err) {
  if (err) {
    console.log(chalk.red("🔺  Error clearing test database", err));
  } else {
    console.log(chalk.cyan("✨  Clearing database"));
  }
});

fixtures.load("../test/api/fixtures", function() {
  console.log(chalk.cyan("✨  Test database loaded"));
});

// Add each .js file to the mocha instance
glob("test/**/*.js", { realpath: true, ignore: "test/api/fixtures/**" }, function(err, files) {
  files.forEach(file => mocha.addFile(file));

  // Run the tests.
  mocha.run(failures => {
    process.on("exit", function() {
      process.exit(failures); // exit with non-zero status if there were failures
    });
  });
});
