const express = require("express");
const AuthController = require("./controllers/authentication");
const ItemController = require("./controllers/items");
const SessionController = require("./controllers/sessions");
const DeckController = require("./controllers/decks");
const UserController = require("./controllers/users");

const api = express.Router();

api.get("/api/items/:item_id", AuthController.authenticateUser, ItemController.getItem);

api.put("/api/items/:item_id", AuthController.authenticateUser, ItemController.editItem);

api.delete("/api/items/:item_id", AuthController.authenticateUser, ItemController.deleteItem); //

api.post("/api/items", AuthController.authenticateUser, ItemController.createItem);

api.post("/api/items/:item_id/review", AuthController.authenticateUser, ItemController.reviewItem);

api.post("/api/items/:item_id/reset", AuthController.authenticateUser, ItemController.resetItem);

api.get("/api/sessions/:session_id", AuthController.authenticateUser, SessionController.getSession);

api.post("/api/sessions", AuthController.authenticateUser, SessionController.createSession);

api.get("/api/study_types", AuthController.authenticateUser, SessionController.getStudyTypes);

module.exports = api;
