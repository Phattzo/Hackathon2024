// Lobby.js
import React, { useEffect, useState } from 'react';

const Lobby = () => {
    const [ws, setWs] = useState(null);
    const [playerId, setPlayerId] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        setWs(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'welcome') {
                setPlayerId(data.playerId);
            }
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (ws) {
            ws.send(message);
        }
    };

    return (
        <div>
            <h1>Player ID: {playerId}</h1>
            <button onClick={() => sendMessage('Hello from client!')}>Send Message</button>
        </div>
    );
};

export default Lobby;
