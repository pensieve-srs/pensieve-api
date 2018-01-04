"use strict";

process.env.NODE_ENV = "test";

const Mocha = require("mocha");
const fs = require("fs");
const path = require("path");
const paths = require("../config/paths");
const glob = require("glob");

require("../config/env");

// Instantiate a Mocha instance.
const mocha = new Mocha();

var testDir = paths.test;

// Add each .js file to the mocha instance
glob("test/**/*.js", { realpath: true }, function(err, files) {
  files.forEach(file => mocha.addFile(file));

  // Run the tests.
  mocha.run(failures => {
    process.on("exit", function() {
      process.exit(failures); // exit with non-zero status if there were failures
    });
  });
});
