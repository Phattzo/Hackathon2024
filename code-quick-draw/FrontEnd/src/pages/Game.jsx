import React from 'react';
import { Header } from '../components/Header';
import './Style.css';
import Lobby from '../components/Lobby';

const Game = () => {
  return (
      <div className="fade-in">
        <Header/>
       
{/* Audio element with autoplay */}
<audio id="backgroundAudio" autoPlay preload="auto">
      <source src="images/WildWestSound.mp3" type="audio/mpeg" />
    </audio>
    <Lobby/>
      </div>
        
    );
  };
  
export default Game;