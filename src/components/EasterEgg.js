import React, { useEffect, useState } from 'react';
import './EasterEgg.css';

const EasterEgg = () => {
  const [sequence, setSequence] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const secretCode = 'anndrea';

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

  return showEasterEgg ? (
    <div className="easter-egg-overlay">
      <div className="easter-egg-content">
        <h2>🎉 Du er jo bare helt rå! 🎉</h2>
        <p>og du er sykt kul som fant denne easter eggen</p>
        <button onClick={() => setShowEasterEgg(false)}>Close</button>
      </div>
    </div>
  ) : null;
};

export default EasterEgg; 