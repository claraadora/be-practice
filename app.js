const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>be-prac</title></head>");
        res.write(
            "<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Enter</button></form></body>"
        );
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk); //buffered chunks
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            console.log(message);
            fs.writeFileSync("message.txt", message);
        });
        res.statusCode = 302; //redirection
        res.setHeader("Location", "/");
        return res.end();
    }
    res.setHeader("Content-Type", "text/html");
    res.write(
        "<html><head><title>My First Page</title></head><body><h1>HELLO</h1></body></html>"
    );
}); // start an event loop that keeps on running as long its still registered

server.listen(3000);
// const fs = require("fs");

// fs.writeFileSync("hello.txt", "Helo from Node.js");
