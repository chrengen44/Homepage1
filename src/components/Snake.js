import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Snake.css';
import HighScores from './HighScores';

const Snake = () => {
  const SNAKE_TEXT = "Active Focus";
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('snakeHighScores');
    return saved ? JSON.parse(saved) : [];
  });

  const generateFood = useCallback(() => {
    return [
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20)
    ];
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;
    
    const newSnake = [...snake];
    let head = [...newSnake[0]];

    switch (direction) {
      case 'RIGHT': head[0] += 1; break;
      case 'LEFT': head[0] -= 1; break;
      case 'UP': head[1] -= 1; break;
      case 'DOWN': head[1] += 1; break;
      default: break;
    }

    // Check collisions
    if (head[0] >= 20 || head[0] < 0 || 
        head[1] >= 20 || head[1] < 0 || 
        snake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check if snake ate food
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(generateFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, score, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      default:
        break;
    }
  }, [direction, gameStarted]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameInterval = setInterval(moveSnake, 150);
      return () => clearInterval(gameInterval);
    }
  }, [gameStarted, gameOver, moveSnake]);

  const resetGame = () => {
    setSnake([[0, 0]]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  const getSnakeText = (index) => {
    if (index >= SNAKE_TEXT.length) return '';
    return SNAKE_TEXT[index];
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setShowNameInput(false);
      setGameStarted(false);
    }
  };

  const saveScore = useCallback(() => {
    if (score > 0) {
      // Get existing scores from localStorage
      const existingScores = JSON.parse(localStorage.getItem('snakeHighScores') || '[]');
      
      // Add new score
      const newScores = [...existingScores, { name: playerName, score }]
        // Sort by score (highest first)
        .sort((a, b) => b.score - a.score)
        // Keep only top 10 scores
        .slice(0, 10);
      
      // Save to localStorage and state
      localStorage.setItem('snakeHighScores', JSON.stringify(newScores));
      setHighScores(newScores);
    }
  }, [score, playerName]);

  useEffect(() => {
    if (gameOver) {
      saveScore();
    }
  }, [gameOver, saveScore]);

  return (
    <div className={`snake-game ${isFullscreen ? 'fullscreen' : ''}`} ref={gameContainerRef}>
      {showNameInput ? (
        <form onSubmit={handleNameSubmit} className="name-input-form">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <button type="submit">Start Game</button>
        </form>
      ) : (
        <>
          <div className="game-controls">
            <button 
              className="fullscreen-button"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
            <span className="score">Score: {score}</span>
            {!gameStarted && !gameOver && (
              <div className="start-message">Press any arrow key to start</div>
            )}
            {gameOver && (
              <div className="game-over">
                <div>Game Over! Score: {score}</div>
                <button onClick={resetGame} className="reset-button">Play Again</button>
              </div>
            )}
          </div>
          <div className="game-container">
            <div className="game-board">
              {Array(20).fill().map((_, row) => (
                <div key={row} className="row">
                  {Array(20).fill().map((_, col) => {
                    const isSnake = snake.findIndex(segment => segment[0] === col && segment[1] === row);
                    const isFood = food[0] === col && food[1] === row;
                    return (
                      <div 
                        key={`${row}-${col}`} 
                        className={`cell ${isSnake !== -1 ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                      >
                        {isSnake !== -1 && isSnake < SNAKE_TEXT.length && (
                          <span className="snake-text">{getSnakeText(isSnake)}</span>
                        )}
                        {isFood && (
                          <span className="food-text">CVE</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <HighScores scores={highScores} />
          </div>
        </>
      )}
    </div>
  );
};

export default Snake; 