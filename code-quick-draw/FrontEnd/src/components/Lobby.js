import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
`;

const CodeBlock = styled.pre`
  background-color: #272822;
  color: #f8f8f2;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
  white-space: pre-wrap;
  text-align: left;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const Feedback = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: ${(props) => (props.correct ? 'green' : 'red')};
  text-align: center;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 2s ease-out;
`;

const Timer = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Lobby = () => {
  const [question, setQuestion] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true); // Timer state
  const [feedbackVisible, setFeedbackVisible] = useState(false); // Feedback visibility state
  const timerRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(JSON.stringify({ type: 'get_question' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'welcome') {
        setPlayerId(data.playerId);
      } else if (data.type === 'question') {
        setQuestion(data.question);
        setFeedback(''); // Clear feedback when a new question is loaded
        setFeedbackVisible(false); // Hide feedback initially
        setTimerActive(true); // Restart the timer
        setTime(0); // Reset the timer
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const handleInputChange = (e) => {
    setAnswerInput(e.target.value);
  };

  const handleSubmit = () => {
    if (answerInput.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
      setFeedback('Correct!');
      setTimerActive(false); // Stop the timer

      // Request the next question
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ type: 'get_question' }));
        setAnswerInput('');
      }
    } else {
      setFeedback('Incorrect, try again.');
      setFeedbackVisible(true); // Show feedback when incorrect
      setTimeout(() => {
        setFeedbackVisible(false); // Start fading out after 2 seconds
      }, 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action (form submission)
      handleSubmit();
    }
  };

  return (
    <Container>
      <Title>Programming Quiz</Title>
      <SubTitle>Player ID: {playerId}</SubTitle>
      {question ? (
        <div>
          <SubTitle>Language: {question.language}</SubTitle>
          <SubTitle>Question:</SubTitle>
          <CodeBlock>{question.question}</CodeBlock>
          <Timer>Time Elapsed: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</Timer>
          <Input
            type="text"
            value={answerInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Add this line
            placeholder="Enter your answer"
            placeholder="Add code here"
          />
          <Button onClick={handleSubmit}>Submit</Button>
          {feedback && <Feedback show={feedbackVisible} correct={feedback === 'Correct!'}>{feedback}</Feedback>}
        </div>
      ) : (
        <p className="heading fade-in">Loading question...</p>
      )}
    </Container>
  );
};

export default Lobby;
