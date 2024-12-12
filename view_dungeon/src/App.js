import React from 'react'; // Import React library
import './index.css'; // Import your custom CSS for styling
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router components for routing
import HomePage from './Homepage'; // Import the HomePage component
import AboutGamePage from './pages/AboutGamePage'; // Import the AboutGamePage component
import HowToPlayPage from './pages/HowtoPlayPage'; // Import the HowToPlayPage component
import FAQPage from './pages/FAQPage'; // Import the FAQPage component
import AboutCreatorsPage from './pages/AboutCreatorsPage'; // Import the AboutCreatorsPage component
import CharacterSelection from './pages/CharacterSelection'; // Import the CharacterSelection component

// Define the App component
function App() {
  return (
    // The Router component wraps all of the routes to enable navigation within the app
    <Router>
      <Routes>
        {/* Define each Route path and the component to render for that path */}
        <Route path="/about-game" element={<AboutGamePage />} /> {/* About game page */}
        <Route path="/how-to-play" element={<HowToPlayPage />} /> {/* How to play page */}
        <Route path="/faq" element={<FAQPage />} /> {/* FAQ page */}
        <Route path="/about-creators" element={<AboutCreatorsPage />} /> {/* About creators page */}
        <Route path="/select-character" element={<CharacterSelection />} /> {/* Character selection page */}
        <Route path="/" element={<HomePage />} /> {/* Home page (default route) */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component as the default export for use in other files
