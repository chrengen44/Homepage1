import React, { useState, useEffect } from 'react';
import './SlidingPuzzle.css';

const SlidingPuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
    numbers.push(null); // Empty tile
    shuffleArray(numbers);
    setTiles(numbers);
    setIsWon(false);
    setMoves(0);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    // Ensure puzzle is solvable
    if (!isSolvable(array)) {
      if (array[0] && array[1]) {
        [array[0], array[1]] = [array[1], array[0]];
      } else {
        [array[2], array[3]] = [array[3], array[2]];
      }
    }
  };

  const isSolvable = (puzzle) => {
    let inversions = 0;
    const puzzleWithoutNull = puzzle.filter(num => num !== null);
    
    for (let i = 0; i < puzzleWithoutNull.length - 1; i++) {
      for (let j = i + 1; j < puzzleWithoutNull.length; j++) {
        if (puzzleWithoutNull[i] > puzzleWithoutNull[j]) {
          inversions++;
        }
      }
    }
    
    return inversions % 2 === 0;
  };

  const canMoveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const row = Math.floor(index / 3);
    const emptyRow = Math.floor(emptyIndex / 3);
    const col = index % 3;
    const emptyCol = emptyIndex % 3;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const moveTile = (index) => {
    if (!canMoveTile(index) || isWon) return;

    const newTiles = [...tiles];
    const emptyIndex = tiles.indexOf(null);
    
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    
    setTiles(newTiles);
    setMoves(moves + 1);
    
    checkWinCondition(newTiles);
  };

  const checkWinCondition = (currentTiles) => {
    const winCondition = [1, 2, 3, 4, 5, 6, 7, 8, null];
    if (JSON.stringify(currentTiles) === JSON.stringify(winCondition)) {
      setIsWon(true);
    }
  };

  return (
    <div className="sliding-puzzle">
      <div className="puzzle-stats">
        <span>Moves: {moves}</span>
        <button onClick={initializePuzzle} className="reset-button">New Game</button>
      </div>
      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`puzzle-tile ${tile === null ? 'empty' : ''} ${canMoveTile(index) ? 'movable' : ''}`}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      {isWon && (
        <div className="win-message">
          <h3>🎉 Puzzle Solved! 🎉</h3>
          <p>You won in {moves} moves!</p>
        </div>
      )}
    </div>
  );
};

export default SlidingPuzzle; 