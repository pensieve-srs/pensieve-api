const express = require("express");
const SessionController = require("./controllers/sessions");
const auth = require("./middlewares/auth");

const api = express.Router();

api.get("/api/sessions/:session_id", auth, SessionController.getSession);

api.post("/api/sessions", auth, SessionController.createSession);

api.get("/api/study_types", auth, SessionController.getStudyTypes);

module.exports = api;
