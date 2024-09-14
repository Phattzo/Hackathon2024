const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players = {};

// Serve static files for the frontend (optional, adjust path as needed)
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    // Assign a player ID and store connection
    const playerId = Math.random().toString(36).substring(2, 15);
    players[playerId] = ws;

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        // If the client requests a question, run the Python script
        if (parsedMessage.type === 'get_question') {
            getPythonQuestion().then((question) => {
                // Send the question back to the client
                ws.send(JSON.stringify({ type: 'question', question }));
            }).catch((err) => {
                console.error('Error fetching question from Python:', err);
                ws.send(JSON.stringify({ type: 'error', message: 'Could not fetch question' }));
            });
        }
    });

    ws.on('close', () => {
        // Clean up when player disconnects
        delete players[playerId];
    });

    // Send a welcome message with the player ID
    ws.send(JSON.stringify({ type: 'welcome', playerId }));
});

// Function to run the Python script and get a question
function getPythonQuestion() {
    return new Promise((resolve, reject) => {
        // Spawn a child process to run the Python script
        const pythonProcess = spawn('python', ['quick-draw-logic.py']); // Use 'python3' if needed

        let data = '';
        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString(); // Collect output from the Python script
        });

        pythonProcess.stderr.on('data', (err) => {
            console.error(`Python error: ${err}`);
            reject(err.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            } else {
                resolve(JSON.parse(data)); // Resolve the JSON output from Python
            }
        });
    });
}

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
