import React from 'react';
import './Hobbies.css';

const Hobbies = () => {
  return (
    <div className="hobbies-container">
      <div className="cyber-header">
        <div className="glitch-container">
          <h1 className="glitch" data-text="Hobbies & Interests">Hobbies & Interests</h1>
        </div>
        <div className="cyber-line"></div>
      </div>

      <div className="content-grid">
        <div className="main-content">
          <div className="terminal-section">
            <div className="terminal-header">
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
            </div>
            <div className="terminal-content">
              <p className="command">$ cat hobbies.json</p>
              <div className="output">
                {`{
  "outdoor_activities": [
    "Mountain Biking",
    "Hiking in Norwegian Nature",
    "Skiing - Both Cross-Country and Alpine"
  ],
  "tech_interests": [
    "Web Development",
    "Cybersecurity",
    "New Technology Exploration"
  ],
  "creative_pursuits": [
    "Photography",
    "Digital Design",
    "Music Production"
  ],
  "personal_development": [
    "Reading Business & Tech Books",
    "Learning New Programming Languages",
    "Attending Tech Conferences"
  ]
}`}
              </div>

              <p className="command">$ ./describe-favorites.sh</p>
              <div className="output">
                <h3 className="hobby-title"><span className="highlight">{'>>'}</span> Mountain Biking</h3>
                <p>Exploring Norwegian trails and challenging terrains while enjoying the scenic beauty.</p>
                
                <h3 className="hobby-title"><span className="highlight">{'>>'}</span> Web Development</h3>
                <p>Building modern web applications and staying current with latest technologies.</p>
                
                <h3 className="hobby-title"><span className="highlight">{'>>'}</span> Photography</h3>
                <p>Capturing moments and landscapes, especially during outdoor adventures.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="ads-sidebar">
          <div className="ad-container">
            <div className="ad-placeholder">
              <div id="google-ad-1" className="google-ad"></div>
            </div>
          </div>
          <div className="ad-container">
            <div className="ad-placeholder">
              <div id="google-ad-2" className="google-ad"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Hobbies; 