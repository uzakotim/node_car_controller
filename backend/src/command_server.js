// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors middleware
var zmq = require("zeromq"),
    sock = zmq.socket("pub");

const app = express();
// Define ZMQ publisher details
console.log("Publisher bound to port 8081");
const PUBLISHER_ENDPOINT = "tcp://127.0.0.1:8081"; // Change to your desired endpoint
// const sock = new zmq.Publisher();

sock.bindSync(PUBLISHER_ENDPOINT);
// sock.bind(PUBLISHER_ENDPOINT);
// console.log("Publisher bound to port 8081");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive messages from frontend
app.get("/send-message", (req, res) => {
    const { message } = req.body;
    // console.log("Received message:", message);
    // sock.send(message);
    console.log("sending a multipart message envelope");
    sock.send(message);
    res.send("Message published via ZeroMQs");
});

// Start the Express server
app.listen(3030, () => {
    console.log("Server is running on port 3030");
});

// UDP server to listen for incoming messages (if needed)
// This server sends messages and does not need to listen for them.
// Therefore, this part is optional.
/*
server.on('message', (msg, rinfo) => {
    console.log(`Received message: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`);
});

server.bind(backendPort);
*/
// pubber.js

setInterval(function () {}, 500);
