const todos = [];

exports.getTodos = (req, res, next) => {
    res.send(todos);
};

exports.addTodo = (req, res, next) => {
    todos.push({
        description: req.body.title,
    });
    res.send(todos);
};
