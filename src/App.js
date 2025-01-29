import React, { useState } from 'react';
import './App.css';
import AboutMe from './components/AboutMe';
import Hobbies from './components/Hobbies';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Home from './components/Home';
import Games from './components/Games';
import BurgerMenu from './components/BurgerMenu';

function AppContent() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setCurrentSection(section);
    setIsMenuOpen(false);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <nav className="nav-header">
        <div className="nav-top">
          <h1>Welcome</h1>
          <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <button 
            className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Me
          </button>
          <button 
            className={`nav-link ${currentSection === 'hobbies' ? 'active' : ''}`}
            onClick={() => handleNavClick('hobbies')}
          >
            Hobbies
          </button>
          <button 
            className={`nav-link ${currentSection === 'games' ? 'active' : ''}`}
            onClick={() => handleNavClick('games')}
          >
            Tools & Games
          </button>
          <ThemeToggle />
        </div>
      </nav>
      
      <main>
        {currentSection === 'home' && <Home />}
        {currentSection === 'about' && <AboutMe />}
        {currentSection === 'hobbies' && <Hobbies />}
        {currentSection === 'games' && <Games />}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
