const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
