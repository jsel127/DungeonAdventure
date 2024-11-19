import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import AboutGamePage from './pages/AboutGamePage';
import HowToPlayPage from './pages/HowtoPlayPage';
import FAQPage from './FAQPage';
import AboutCreatorsPage from './AboutCreatorsPage';
import CharacterSelection from './CharacterSelection'; // Correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-game" element={<AboutGamePage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about-creators" element={<AboutCreatorsPage />} />
        
        {/* Correct route for character selection */}
        <Route path="/select-character" element={<CharacterSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
