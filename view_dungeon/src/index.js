import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components correctly
import HomePage from './Homepage'; // Adjust if necessary
import AboutGamePage from './pages/AboutGamePage'; 
import HowToPlayPage from './pages/HowtoPlayPage'; 
import FAQPage from './pages/FAQPage'; 
import AboutCreatorsPage from './pages/AboutCreatorsPage'; 
import CharacterSelection from './pages/CharacterSelection'; 
import NameSelection from './pages/NameSelection';
import DifficultySelection from './pages/DifficultySelection';

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
      <Route path="/select-name" element={<NameSelection />} />
      <Route path="/select-difficulty" element={<DifficultySelection />} />
    </Routes>
  </Router>
);