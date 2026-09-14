const http = require("http");

const server = http.createServer((req, res) => {
    // Status code and headers
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "X-Powered-By": "Node.js"
    });

    // Response body
    res.end("Hello World");
});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});