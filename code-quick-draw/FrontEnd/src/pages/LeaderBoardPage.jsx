import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const LeaderBoardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <>
    <Header/>
    <Container>
      
      <Title>Leaderboard</Title>
      <Table>
        <thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Score</Th>
          </Tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <Tr key={entry.rank}>
              <Td>{entry.rank}</Td>
              <Td>{entry.name}</Td>
              <Td>{entry.score}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default LeaderBoardPage;
