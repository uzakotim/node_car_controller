// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors middleware
const dgram = require("dgram");

const app = express();
const server = dgram.createSocket("udp4");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive messages from frontend
app.post("/send-message", (req, res) => {
    const { message } = req.body;

    // Send the message over UDP
    server.send(message, 0, message.length, 8080, "localhost", (err) => {
        if (err) {
            console.error("Error sending message:", err);
            res.status(500).json({ error: "Error sending message" });
        } else {
            console.log(`Message sent successfully: ${message}`);
            res.json({ success: true });
        }
    });
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
