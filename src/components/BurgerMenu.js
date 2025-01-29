import React from 'react';
import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <button className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default BurgerMenu; 