import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components correctly
import HomePage from './Homepage'; // Adjust if necessary
import AboutGamePage from './pages/AboutGamePage'; 
import HowToPlayPage from './pages/HowtoPlayPage'; 
import FAQPage from './pages/FAQPage'; 
import AboutCreatorsPage from './pages/AboutCreatorsPage'; 
import CharacterSelection from './pages/CharacterSelection'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-game" element={<AboutGamePage />} />
      <Route path="/how-to-play" element={<HowToPlayPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/about-creators" element={<AboutCreatorsPage />} />
      <Route path="/select-character" element={<CharacterSelection />} />
    </Routes>
  </Router>
);