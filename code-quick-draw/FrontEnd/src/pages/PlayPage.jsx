import React from 'react';
import { Link } from 'react-router-dom'; // For internal navigation
import './Style.css'; // Assuming you have corresponding CSS
import { Header } from '../components/Header';

const PlayPage = () => {
  return (
    <div className="fade-in">
      <Header></Header>
      {/* Our Logo */}
      <div className="Quicklogo fade-in">
        <img src="images/CodeQuickdrawLogo.png" alt="NutriSync Logo" />
      </div>

      {/* Project Description */}
      <div className="fade-in">
        <h2 className="projdescript">Hit the play Button below to try Code QuickDraw!</h2>
      </div>

      {/* Play Button */}
      <button className="submit">
        <Link className="link" to="/play">Play</Link>
      </button>
    </div>
  );
};

export default PlayPage;
