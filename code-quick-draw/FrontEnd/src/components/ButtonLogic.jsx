import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useButtonLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Start loading, hide button, and play sound
    setIsLoading(true);
    const clickSound = document.getElementById('clickSound');
    clickSound.play();

    // Simulate delay then redirect
    setTimeout(() => {
      navigate('/game'); // Redirect to the Game component
    }, 900);
  };

  return { handleButtonClick, isLoading };
};
