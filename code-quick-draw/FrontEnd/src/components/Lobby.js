import React, { useState, useEffect } from 'react';

const Lobby = () => {
  const [question, setQuestion] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      // Request a new question from the server
      ws.send(JSON.stringify({ type: 'get_question' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'welcome') {
        setPlayerId(data.playerId);
      } else if (data.type === 'question') {
        setQuestion(data.question);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Player ID: {playerId}</h2>
      {question ? (
        <div>
          <h3>Question: {question.question}</h3>
          <p>Answer: {question.answer}</p>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default Lobby;
