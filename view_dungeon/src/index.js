import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage'; // Make sure the path is correct
import AboutGamePage from './pages/AboutGamePage';
import HowtoPlayPage from './pages/HowtoPlayPage';
import FAQPage from './pages/FAQPage';
import AboutCreatorsPage from './pages/AboutCreatorsPage';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AboutGamePage" element={<AboutGamePage />} />
      <Route path="/HowtoPlayPage" element={<HowtoPlayPage />} />
      <Route path="/FAQPage" element={<FAQPage />} />
      <Route path="/AboutCreatorsPage" element={<AboutCreatorsPage />} />

    </Routes>
  </Router>
);