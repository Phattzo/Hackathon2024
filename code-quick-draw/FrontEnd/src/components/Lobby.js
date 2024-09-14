import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Lobby = () => {
  const [question, setQuestion] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [answerInput, setAnswerInput] = useState(''); // State for input


  useEffect(() => {
    console.log('useEffect triggered'); // Add this for debugging
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

    // Handle input change
    const handleInputChange = (e) => {
      setAnswerInput(e.target.value);
    };
  
    // Handle form submission or button click
    const handleSubmit = () => {
      console.log('User answer:', answerInput);
      // Here you can send the input to the server or handle it as needed
    };

    return (
      <Container>
        <h2>Player ID: {playerId}</h2>
        {question ? (
          <div>
            <h3>Question: {question.question}</h3>
            <p>Answer: {question.answer}</p>
            <Input
              type="text"
              value={answerInput}
              onChange={handleInputChange}
              placeholder="Enter your answer"
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        ) : (
          <p>Loading question...</p>
        )}
      </Container>
    );
  };
export default Lobby;
