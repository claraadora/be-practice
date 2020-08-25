const fs = require("fs");

const requestHandler = (req, res) => {
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
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            console.log(message);
            // fs.writeFileSync("message.txt", message); // sync = block the code operation til the file operation is done
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            }); // event-driven execution ==> does not block the code.
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write(
        "<html><head><title>My First Page</title></head><body><h1>HELLO</h1></body></html>"
    );
    res.end();
};
