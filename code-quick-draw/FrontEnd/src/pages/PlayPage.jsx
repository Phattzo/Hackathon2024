import React from 'react';
import './Style.css'; // Assuming you have corresponding CSS
import { Header } from '../components/Header';
import Lobby from '../components/Lobby';

const PlayPage = () => {
  return (
    <div className="fade-in">
      <Header></Header>
      {/* Our Logo */}
      <div className="Quicklogo fade-in">
        <img src="images/CodeQuickdrawLogo.png" alt="Quick Draw Logo" />
      </div>

      <Lobby />
    </div>
  );
};

export default PlayPage;
