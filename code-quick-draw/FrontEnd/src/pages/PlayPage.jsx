import React from 'react';
import './Style.css';
import { Header } from '../components/Header';
import Lobby from '../components/Lobby';

const PlayPage = () => {
  return (
    <div className="fade-in">
      <Header></Header>
      {/* Our Logo */}
      <div className="Quicklogo fade-in">
        <img src="" alt="Quick Draw Logo" />
      </div>

      <Lobby />
    </div>
  );
};

export default PlayPage;
