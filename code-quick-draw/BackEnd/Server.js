const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players = {};
// Serve static files for the frontend (optional, adjust path as needed)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/api/leaderboard', (req, res) => {
    console.log('Received request for leaderboard data');
    const filePath = 'leaderBoardData.json';
    console.log(`Reading file from: ${filePath}`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading leaderboard data');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.parse(data));
    });
});

app.post('/api/leaderboard', (req, res) => {
    console.log('Received request to add new leaderboard entry');
    const newEntry = req.body;
    const filePath = path.join(__dirname, 'leaderBoardData.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading leaderboard data:', err);
            res.status(500).send('Error reading leaderboard data');
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            
            // Compare scores and determine rank
            let rank = 1;
            for (const entry of jsonData) {
                if (entry.score < newEntry.score) {
                    rank++;
                }
            }
            newEntry.rank = rank;

            // Insert the new entry at the correct position
            jsonData.splice(rank - 1, 0, newEntry);

            // Update the ranks of the following entries
            for (let i = rank; i < jsonData.length; i++) {
                jsonData[i].rank = i + 1;
            }

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing leaderboard data:', writeErr);
                    res.status(500).send('Error writing leaderboard data');
                    return;
                }
                res.status(201).send('New leaderboard entry added successfully');
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('Error parsing leaderboard data');
        }
    });
});

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
        } else if (parsedMessage.type === 'submit_score') {
            const { name, totalTime } = parsedMessage;
            const newEntry = { name, totalTime };

            // Add new entry to the leaderboard
            const filePath = 'leaderBoardData.json';
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading leaderboard data:', err);
                    return;
                }
                try {
                    const jsonData = JSON.parse(data);
                    jsonData.push(newEntry);
                    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
                        if (writeErr) {
                            console.error('Error writing leaderboard data:', writeErr);
                        }
                    });
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                }
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
