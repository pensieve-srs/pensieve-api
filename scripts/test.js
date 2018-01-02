"use strict";

process.env.NODE_ENV = "test";

const Mocha = require("mocha");
const fs = require("fs");
const path = require("path");
const paths = require("../config/paths");

require("../config/env");

// Instantiate a Mocha instance.
const mocha = new Mocha();

var testDir = paths.test;

// Add each .js file to the mocha instance
fs
  .readdirSync(testDir)
  .filter(function(file) {
    // Only keep the .js files
    return file.substr(-3) === ".js";
  })
  .forEach(function(file) {
    mocha.addFile(path.join(testDir, file));
  });

// Run the tests.
mocha.run(function(failures) {
  process.on("exit", function() {
    process.exit(failures); // exit with non-zero status if there were failures
  });
});
