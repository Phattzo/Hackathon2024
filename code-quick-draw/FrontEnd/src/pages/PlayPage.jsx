import React from 'react';
import { Link } from 'react-router-dom'; // For internal navigation
import './Style.css'; // Assuming you have corresponding CSS

const PlayPage = () => {
  return (
    <div className="fade-in">
      {/* Banner for Top of Webpage */}
      <div className="banner">
        <img className="logo" src="images/CodeQuickdrawLogo.png" alt="NutriSync Logo" />
      </div>

      {/* Buttons */}
      <div className="buttonRow fade-in">
        <button className="submit">
          <Link className="link" to="/">Home</Link>
        </button>
        <button className="submit">
          <Link className="link" to="/play">Play</Link>
        </button>
        <button className="submit">
          <Link className="link" to="/about">About Us</Link>
        </button>
        <button className="submit">
          <Link className="link" to="/contacts">Contacts</Link>
        </button>
      </div>

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
