// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players = {};

wss.on('connection', (ws) => {
    // Assign a player ID and store connection
    const playerId = Math.random().toString(36).substring(2, 15);
    players[playerId] = ws;

    ws.on('message', (message) => {
        // Handle incoming messages (e.g., game moves, chat messages)
        console.log(`Received message from player ${playerId}: ${message}`);
    });

    ws.on('close', () => {
        // Clean up when player disconnects
        delete players[playerId];
    });

    // Send a welcome message with the player ID
    ws.send(JSON.stringify({ type: 'welcome', playerId }));
});

// Start the server
server.listen(3000, () => {
    console.log('WebSocket server is running on ws://localhost:3000');
});
