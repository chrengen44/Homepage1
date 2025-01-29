import React from 'react';
import './Home.css';

// Temporary direct URLs
const cyberBg1 = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
const cyberBg2 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5";
const cyberBg3 = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8";

const Home = () => {
  return (
    <div className="home-container">
      <section className="parallax-section" style={{ backgroundImage: `url(${cyberBg1})` }}>
        <div className="content">
          <h1 className="glitch" data-text="Cybersecurity Professional">Cybersecurity Professional</h1>
          <p className="cyber-text">Protecting Digital Assets & Securing the Future</p>
        </div>
      </section>

      <section className="info-section">
        <div className="terminal-box">
          <div className="terminal-header">
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
          </div>
          <div className="terminal-content">
            <p className="command">$ whoami</p>
            <p className="output">
              Security professional with expertise in business development and customer experience.
              Specializing in modern security solutions and digital transformation.
            </p>
          </div>
        </div>
      </section>

      <section className="parallax-section" style={{ backgroundImage: `url(${cyberBg2})` }}>
        <div className="content">
          <h2>Security Solutions</h2>
          <p className="cyber-text">Building Robust Defense Systems</p>
        </div>
      </section>

      <section className="info-section dark">
        <div className="grid-container">
          <div className="grid-item">
            <h3>Threat Analysis</h3>
            <p>Comprehensive security assessments and threat monitoring</p>
          </div>
          <div className="grid-item">
            <h3>Risk Management</h3>
            <p>Strategic approach to identifying and mitigating security risks</p>
          </div>
          <div className="grid-item">
            <h3>Security Training</h3>
            <p>Employee awareness and security best practices</p>
          </div>
        </div>
      </section>

      <section className="parallax-section" style={{ backgroundImage: `url(${cyberBg3})` }}>
        <div className="content">
          <h2>Digital Protection</h2>
          <p className="cyber-text">Securing Your Digital Future</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 