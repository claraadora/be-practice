const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "todoDb",
    host: "localhost",
    port: 5432,
    database: "todoDb",
});

module.exports = pool;
