const http = require("http");

const routes = require("./routes");

const server = http.createServer(routes); // start an event loop that keeps on running as long its still registered

server.listen(3000);
