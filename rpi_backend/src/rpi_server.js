// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors middleware

const app = express();

// pubber.js
var zmq = require("zeromq"),
    sock = zmq.socket("pub");

// Define ZMQ publisher details
const PUBLISHER_ENDPOINT = "tcp://127.0.0.1:8081"; // Change to your desired endpoint
sock.bindSync(PUBLISHER_ENDPOINT);
console.log("Publisher bound to port 8081");

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive messages from frontend
app.post("/send-message", (req, res) => {
    const { message } = req.body;
    console.log("Received message:", message);
    sock.send(message);
    // Send response back to frontend
    res.send({ message: "Message sent successfully" });
});

// Start the Express server
app.listen(3030, () => {
    console.log("Server is running on port 3030");
});
