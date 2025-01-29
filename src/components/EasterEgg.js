import React, { useEffect, useState, useCallback } from 'react';
import './EasterEgg.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

const EasterEgg = () => {
  const [sequence, setSequence] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const secretCode = 'anndrea';
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      const gameContainer = document.querySelector('.puzzle-container');
      if (gameContainer) {
        gameContainer.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      setSequence(prev => {
        const newSequence = prev + e.key;
        if (newSequence.includes(secretCode)) {
          setShowEasterEgg(true);
          return '';
        }
        return newSequence.slice(-7); // Keep last 7 characters to match secretCode length
      });
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="puzzle-container">
      {showEasterEgg ? (
        <div className="easter-egg-overlay">
          <div className="easter-egg-content">
            <h2>🎉 Du er jo bare helt rå! 🎉</h2>
            <p>og du er sykt kul som fant denne easter eggen</p>
            <button onClick={() => setShowEasterEgg(false)}>Close</button>
          </div>
        </div>
      ) : null}
      
      {/* Puzzle game content - always show this */}
      <div className="puzzle-game">
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
        </button>
        {/* Add your puzzle game content here */}
        <div className="puzzle-board">
          {/* Your puzzle pieces/game logic here */}
        </div>
      </div>
    </div>
  );
};

export default EasterEgg; 