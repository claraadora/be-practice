const express = require("express");
const pool = require("./models/db");

const app = express();

// middleware
app.use(express.json());

const todosRoutes = require("./routes");

app.listen(5000, () => {
    console.log("Server has started on port 5000.");
});

app.use("/todos", todosRoutes.routes);
