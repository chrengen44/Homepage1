import React from 'react';
import './ThemeToggle.css';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="theme-toggle-wrapper">
      <input
        type="checkbox"
        id="theme-toggle"
        className="theme-toggle-input"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        <span className="theme-toggle-switch"></span>
      </label>
    </div>
  );
};

export default ThemeToggle; 