import React from 'react';
import './AboutMe.css';
import profileImage from '../assets/profile.png';  // Change from .jpg to .png

const AboutMe = () => {
  const certifications = [
    {
      title: 'Web Development Frontend Course',
      org: 'Codecademy',
      year: '2022'
    },
    {
      title: 'Data Leadership Foundation',
      org: 'Fortum',
      year: '2020'
    },
    {
      title: 'Certified NLP Master Practitioner',
      org: 'NLP Leadership AS'
    },
    {
      title: 'Content Marketing Certified',
      org: 'HubSpot Academy'
    }
  ];

  const languages = [
    { name: 'English', level: 'Professional working proficiency' },
    { name: 'Spanish' },
    { name: 'Norwegian', level: 'Native' }
  ];

  return (
    <div className="about-me-container">
      <div className="cyber-header">
        <div className="profile-section">
          <div className="profile-pic-container">
            <img src={profileImage} alt="Christian Engen" className="profile-pic" />
          </div>
          <div className="name-section">
            <div className="glitch-container">
              <h1 className="glitch" data-text="Christian Engen">Christian Engen</h1>
            </div>
            <div className="cyber-line"></div>
            <p className="location">
              <span className="bracket">[</span> Bærum, Viken, Norway <span className="bracket">]</span>
            </p>
          </div>
        </div>
      </div>

      <div className="terminal-section">
        <div className="terminal-header">
          <span className="terminal-button"></span>
          <span className="terminal-button"></span>
          <span className="terminal-button"></span>
        </div>
        <div className="terminal-content">
          <p className="command">$ cat about.txt</p>
          <p className="output">
            A passionate professional with an entrepreneurial mindset and strong focus on customer experience (CX). 
            Currently working at River Security, bringing expertise in business development and security solutions.
          </p>
          
          <p className="command">$ cat education.txt</p>
          <div className="output">
            <p>Edinburgh Business School, Heriot-Watt University</p>
            <p className="subtle">2011 - 2015</p>
          </div>

          <p className="command">$ cat certifications.txt</p>
          <ul className="output">
            {certifications.map((cert, index) => (
              <li key={index}>
                <span className="highlight">&gt;&gt;</span>
                {` ${cert.title} - ${cert.org}`}
                {cert.year && ` (${cert.year})`}
              </li>
            ))}
          </ul>

          <p className="command">$ cat languages.txt</p>
          <ul className="output">
            {languages.map((lang, index) => (
              <li key={index}>
                <span className="highlight">&gt;&gt;</span>
                {` ${lang.name}`}
                {lang.level && ` - ${lang.level}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 