const express = require("express");
const ItemController = require("./controllers/items");
const SessionController = require("./controllers/sessions");
const auth = require("./middlewares/auth");

const api = express.Router();

api.get("/api/items/:item_id", auth, ItemController.getItem);

api.put("/api/items/:item_id", auth, ItemController.editItem);

api.delete("/api/items/:item_id", auth, ItemController.deleteItem); //

api.post("/api/items", auth, ItemController.createItem);

api.post("/api/items/:item_id/review", auth, ItemController.reviewItem);

api.post("/api/items/:item_id/reset", auth, ItemController.resetItem);

api.get("/api/sessions/:session_id", auth, SessionController.getSession);

api.post("/api/sessions", auth, SessionController.createSession);

api.get("/api/study_types", auth, SessionController.getStudyTypes);

module.exports = api;
