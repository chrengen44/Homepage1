import React, { useState } from 'react';
import './Games.css';
import Snake from './Snake';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [memory, setMemory] = useState(0);

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

  const handleFunction = (func) => {
    try {
      let result;
      const currentNumber = parseFloat(display);
      
      switch(func) {
        case 'sqrt':
          result = Math.sqrt(currentNumber);
          break;
        case 'square':
          result = currentNumber * currentNumber;
          break;
        case 'sin':
          result = Math.sin(currentNumber * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(currentNumber * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(currentNumber * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(currentNumber);
          break;
        case 'ln':
          result = Math.log(currentNumber);
          break;
        case '1/x':
          result = 1 / currentNumber;
          break;
        case '+/-':
          result = -currentNumber;
          break;
        default:
          result = currentNumber;
      }
      setDisplay(result.toString());
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const handleMemory = (operation) => {
    const currentNumber = parseFloat(display);
    switch(operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setIsNewNumber(true);
        break;
      case 'M+':
        setMemory(memory + currentNumber);
        setIsNewNumber(true);
        break;
      case 'M-':
        setMemory(memory - currentNumber);
        setIsNewNumber(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="equation">{equation}</div>
        <div className="current-value">{display}</div>
      </div>
      <div className="calculator-buttons">
        <button onClick={() => handleMemory('MC')} className="function">MC</button>
        <button onClick={() => handleMemory('MR')} className="function">MR</button>
        <button onClick={() => handleMemory('M+')} className="function">M+</button>
        <button onClick={() => handleMemory('M-')} className="function">M-</button>
        <button onClick={handleClear} className="operator">AC</button>

        <button onClick={() => handleFunction('sqrt')} className="function">√</button>
        <button onClick={() => handleFunction('square')} className="function">x²</button>
        <button onClick={() => handleFunction('1/x')} className="function">1/x</button>
        <button onClick={() => handleFunction('+/-')} className="function">±</button>
        <button onClick={() => handleOperator('/')} className="operator">÷</button>

        <button onClick={() => handleFunction('sin')} className="function">sin</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('*')} className="operator">×</button>

        <button onClick={() => handleFunction('cos')} className="function">cos</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('-')} className="operator">−</button>

        <button onClick={() => handleFunction('tan')} className="function">tan</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>

        <button onClick={() => handleFunction('log')} className="function">log</button>
        <button onClick={() => handleFunction('ln')} className="function">ln</button>
        <button onClick={() => handleNumber('0')}>0</button>
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

      <div className="games-grid">
        <section className="game-section calculator-section">
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

        <section className="game-section snake-section">
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
    </div>
  );
};

export default Games; 