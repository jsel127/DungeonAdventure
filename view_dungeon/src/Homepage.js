import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    // Set the background color of the entire page to black
    document.body.style.backgroundColor = '#000000';
    document.body.style.margin = '0'; // Remove margin
    document.body.style.padding = '0'; // Remove padding
  }, []);

  const linkStyle = (isHovered) => ({
    color: isHovered ? 'maroon' : 'grey', // Change color based on hover status
    textDecoration: 'none',
    margin: '0 20px',
    fontSize: '15px',
    transition: 'color 0.2s ease',
  });

  return (
    <div>
      <header style={headerStyle}>
        <div style={navMenuStyle}>
          <Link
            to="/AboutGamePage"
            style={linkStyle(hoveredLink === 'aboutGame')}
            onMouseEnter={() => setHoveredLink('aboutGame')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            About Game
          </Link>
          <Link
            to="/HowtoPlayPage"
            style={linkStyle(hoveredLink === 'howToPlay')}
            onMouseEnter={() => setHoveredLink('howToPlay')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            How to Play
          </Link>
          <Link
            to="/FAQPage"
            style={linkStyle(hoveredLink === 'faq')}
            onMouseEnter={() => setHoveredLink('faq')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            FAQ
          </Link>
          <Link
            to="/AboutCreatorsPage"
            style={linkStyle(hoveredLink === 'aboutCreators')}
            onMouseEnter={() => setHoveredLink('aboutCreators')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            About Creators
          </Link>
        </div>
      </header>

      {/* Main content of the homepage */}
      <div style={{ textAlign: 'center', padding: '50px', color: 'maroon' }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '60px', fontWeight: 'bold' }}>
          Welcome to the Game!
        </h1>
        <p style={{ color: 'maroon', fontSize: '30px', marginTop: '-40px' }}>
          This is where your Dungeon Adventure begins...
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/Adventure.jpg`}
          alt="Adventure"
          style={{ width: '1200px', height: 'auto' }}
        />
        {/* Start Button */}
        <div style={{ marginTop: '30px' }}>
        <Link to="/select-character">
  <button style={startButtonStyle}>Start</button>
</Link>

        </div>
      </div>
    </div>
  );
}

// Navbar styling
const headerStyle = {
  padding: '10px 10px',
};

const navMenuStyle = {
  display: 'flex',
  justifyContent: 'right',
};

// Start button styling
const startButtonStyle = {
  backgroundColor: 'maroon',
  color: 'white',
  fontSize: '20px',
  padding: '10px 30px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  transition: 'transform 0.2s ease',
};

export default HomePage;
