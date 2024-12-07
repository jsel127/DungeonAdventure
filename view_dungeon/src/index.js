import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components correctly
import HomePage from './Homepage'; // Adjust if necessary
import AboutGamePage from './pages/AboutGamePage.js'; 
import HowToPlayPage from './pages/HowtoPlayPage.js'; 
import FAQPage from './pages/FAQPage.js'; 
import AboutCreatorsPage from './pages/AboutCreatorsPage.js'; 
import CharacterSelection from './pages/CharacterSelection.js'; 
import NameSelection from './pages/NameSelection.js';
import DifficultySelection from './pages/DifficultySelection.js';
import DisplayDungeon from './pages/DisplayDungeon.js'

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
      <Route path="/dungeon" element={<DisplayDungeon />} />
    </Routes>
  </Router>
);