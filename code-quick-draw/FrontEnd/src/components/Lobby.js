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

const Congratulations = styled.div`
  text-align: center;
  font-size: 24px;
  color: #4CAF50;
  margin-top: 20px;
  margin-bottom: 20px; /* Added margin-bottom for spacing */
`;

const StartPage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #333;
`;

const Lobby = () => {
  const [question, setQuestion] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const timerRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (gameStarted) {
      const ws = new WebSocket('ws://localhost:3001');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify({ type: 'get_question' }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'welcome') {
          setPlayerId(userName); // Set player ID with userName
        } else if (data.type === 'question') {
          setQuestion(data.question);
          setFeedback('');
          setFeedbackVisible(false);
          setTime(0);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      return () => {
        ws.close();
      };
    }
  }, [gameStarted, userName]);

  useEffect(() => {
    if (!gameOver && gameStarted) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [gameOver, gameStarted]);

  const handleInputChange = (e) => {
    setAnswerInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!question) return;

    const isCorrect = answerInput.trim().toLowerCase() === question.answer.trim().toLowerCase();

    if (isCorrect) {
      setFeedback('Correct!');
      setQuestionsAnswered(prev => prev + 1);
      setTotalTime(prevTotal => prevTotal + time); // Update total time

      if (questionsAnswered === 2) { // Changed to === to match 3 questions
        setGameOver(true);
        submitScore(); // Submit score when game is over
      } else {
        if (wsRef.current) {
          wsRef.current.send(JSON.stringify({ type: 'get_question' }));
        }
        setAnswerInput('');
        setTime(0); // Reset time for next question
      }
    } else {
      setFeedback('Incorrect, try again.');
      setFeedbackVisible(true);
      setTimeout(() => {
        setFeedbackVisible(false);
      }, 1500);
    }
  };

  const submitScore = () => {
    if (playerId) {
      const score = {
        name: playerId,
        score: totalTime,
      };

      fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(score),
      })
      .then(response => response.text())
      .then(message => {
        console.log(message);
      })
      .catch(error => {
        console.error('Error submitting score:', error);
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleStartGame = () => {
    if (userName.trim()) {
      setPlayerId(userName); // Set player ID with userName
      setGameStarted(true);
    }
  };

  const resetGame = () => {
    setQuestion(null);
    setPlayerId(null);
    setAnswerInput('');
    setFeedback('');
    setTime(0);
    setTotalTime(0);
    setQuestionsAnswered(0);
    setGameOver(false);
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'get_question' }));
    }
  };

  return (
    <Container>
      {!gameStarted ? (
        <StartPage>
          <Title>Welcome to the Programming Quiz!</Title>
          <SubTitle>Please enter your name to start:</SubTitle>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
          <Button onClick={handleStartGame}>Start Game</Button>
        </StartPage>
      ) : gameOver ? (
        <div>
          <Congratulations>
            Congratulations {playerId}! Your total time is {Math.floor(totalTime / 60)}:{('0' + (totalTime % 60)).slice(-2)}.
          </Congratulations>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      ) : question ? (
        <div>
          <SubTitle>Player ID: {playerId}</SubTitle>
          <SubTitle>Language: {question.language}</SubTitle>
          <SubTitle>Question:</SubTitle>
          <CodeBlock>{question.question}</CodeBlock>
          <Timer>Time Elapsed: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</Timer>
          <Input
            type="text"
            value={answerInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your answer"
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
