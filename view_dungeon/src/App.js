import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage'; // Import HomePage
import AboutGamePage from './pages/AboutGamePage'; // Import AboutGamePage
import HowToPlayPage from './pages/HowtoPlayPage'; // Import other pages
import FAQPage from './FAQPage';
import AboutCreatorsPage from './AboutCreatorsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-game" element={<AboutGamePage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about-creators" element={<AboutCreatorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
