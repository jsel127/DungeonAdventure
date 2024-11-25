import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage'; // Adjust path if necessary
import AboutGamePage from './pages/AboutGamePage';
import HowToPlayPage from './pages/HowtoPlayPage';
import FAQPage from './pages/FAQPage';
import AboutCreatorsPage from './pages/AboutCreatorsPage';
import CharacterSelection from './pages/CharacterSelection';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/about-game" element={<AboutGamePage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about-creators" element={<AboutCreatorsPage />} />
        <Route path="/select-character" element={<CharacterSelection />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
  
}

export default App;
