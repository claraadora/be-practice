const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// Define routes
app.use("/api/todos", require("./routes/api/todos"));

app.get("/", (req, res) => res.send("API running"));

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}.`);
});
