import React from 'react';
import './HighScores.css';

const HighScores = ({ scores }) => {
  return (
    <div className="high-scores">
      <h3>High Scores</h3>
      <div className="scores-list">
        {scores.slice(0, 10).map((score, index) => (
          <div key={index} className="score-item">
            <span className="rank">#{index + 1}</span>
            <span className="player">{score.name}</span>
            <span className="score">{score.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighScores; 