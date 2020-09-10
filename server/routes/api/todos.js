const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Todo = require("../../models/Todo");

// @route   GET api/todos
// @desc    Test route
// @access  Public
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ date: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route   POST api/todos
// @desc    Post todos
// @access  Public
router.post(
    "/",
    [check("description", "Description is required").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newTodo = new Todo({
            description: req.body.description,
        });

        const todo = await newTodo.save();

        res.json(todo);
    }
);

// @route   DELETE api/todos/:id
// @desc    Delete a todo
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        await todo.remove();

        res.json({ msg: "Todo deleted" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});
module.exports = router;

// @route   UPDATE api/todos/:id
// @desc    Update a todo
// @access  Public
router.put("/todos/:id", async (req, res) => {});
