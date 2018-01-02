"use strict";

process.env.NODE_ENV = "production";

require("../config/env");

const server = require("../server/index");
const port = process.env.PORT || 5000;

server(port);
