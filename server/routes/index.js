const express = require("express");
const path = require("path");
const todoController = require("../controllers/todoController");

const router = express.Router();

// /todos => GET
router.get("/", todoController.getTodos);

// /todos => POST
router.post("/", todoController.postTodos);

module.exports = router;
