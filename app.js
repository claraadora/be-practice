const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("In the middleware");
    next(); // Allows the request to continue to the next middleware
});

app.use((req, res, next) => {
    console.log("In another middleware");
    res.send("<h1>Hello from Express</h1>");
});

app.listen();
