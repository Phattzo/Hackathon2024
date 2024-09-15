import React from 'react';
import { Header } from '../components/Header';
import './Style.css';
import { useButtonLogic } from '../components/ButtonLogic';

const PlayPage = () => {
  const { handleButtonClick, isLoading } = useButtonLogic();

  return (
    <div className="fade-in">
      <Header />
      
      {/* Our Logo */}
      <div className="Quicklogo">
        <img src="images/CodeQuickdrawLogo.png" alt="Quicklogo" />
      </div>

      {/* Project Description */}
      <h2 className="projdescript">Hit the play button below to try Code QuickDraw!</h2>

      {/* Play Button */}
      {!isLoading && (
        <button type="button" className="playbutton" onClick={handleButtonClick}>
          Play
        </button>
      )}

      {/* Loading message */}
      {isLoading && <span className="loading">Loading...</span>}

      {/* Audio element to play the sound */}
      <audio id="clickSound" preload="auto">
        <source src="images/gunsound.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default PlayPage;
