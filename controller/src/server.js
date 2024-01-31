// server.js
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
    console.log(
        `Received message: ${msg.toString()} from ${rinfo.address}:${
            rinfo.port
        }`
    );
});

server.on("error", (err) => {
    console.log(`Server error: ${err.stack}`);
});

server.on("listening", () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
});

server.bind(8080);
