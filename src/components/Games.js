import React, { useState } from 'react';
import './Games.css';
import Snake from './Snake';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (number) => {
    if (isNewNumber) {
      setDisplay(number);
      setIsNewNumber(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setEquation(display + ' ' + operator + ' ');
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="equation">{equation}</div>
        <div className="current-value">{display}</div>
      </div>
      <div className="calculator-buttons">
        <button onClick={handleClear} className="span-three">AC</button>
        <button onClick={() => handleOperator('/')} className="operator">/</button>
        
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('*')} className="operator">×</button>
        
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('-')} className="operator">-</button>
        
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>
        
        <button onClick={() => handleNumber('0')} className="span-two">0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={handleEqual} className="operator equals">=</button>
      </div>
    </div>
  );
};

const Games = () => {
  return (
    <div className="games-container">
      <div className="cyber-header">
        <div className="glitch-container">
          <h1 className="glitch" data-text="Interactive Tools & Games">Interactive Tools & Games</h1>
        </div>
        <div className="cyber-line"></div>
      </div>

      <section className="calculator-section">
        <div className="section-header">
          <h2 className="glitch" data-text="Calculator">Calculator</h2>
          <div className="cyber-line"></div>
        </div>
        <div className="terminal-box">
          <div className="terminal-header">
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
          </div>
          <div className="terminal-content">
            <Calculator />
          </div>
        </div>
      </section>

      <section className="snake-section">
        <div className="section-header">
          <h2 className="glitch" data-text="Catch the CVE's">Catch the CVE's</h2>
          <div className="cyber-line"></div>
        </div>
        <div className="terminal-box">
          <div className="terminal-header">
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
          </div>
          <div className="terminal-content">
            <Snake />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games; 