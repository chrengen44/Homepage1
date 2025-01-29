import React, { useState, useEffect, useCallback } from 'react';
import './Snake.css';

const Snake = () => {
  const SNAKE_TEXT = "Active Focus";
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

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

  return (
    <div className="snake-game">
      <div className="game-info">
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
    </div>
  );
};

export default Snake; 