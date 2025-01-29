import React, { useEffect, useState } from 'react';
import './EasterEgg.css';

const EasterEgg = () => {
  const [sequence, setSequence] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const secretCode = 'simen';

  useEffect(() => {
    const handleKeyPress = (e) => {
      setSequence(prev => {
        const newSequence = prev + e.key;
        if (newSequence.includes(secretCode)) {
          setShowEasterEgg(true);
          return '';
        }
        return newSequence.slice(-5); // Keep last 5 characters
      });
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return showEasterEgg ? (
    <div className="easter-egg-overlay">
      <div className="easter-egg-content">
        <h2>🎉 You found me! 🎉</h2>
        <p>Blir ikke noe domeneshop her i gården!!</p>
        <button onClick={() => setShowEasterEgg(false)}>Close</button>
      </div>
    </div>
  ) : null;
};

export default EasterEgg; 