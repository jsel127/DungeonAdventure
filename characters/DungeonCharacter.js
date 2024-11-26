import React, { useState, useEffect } from 'react';

const CharacterSelection = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Fetch characters from the backend API
  useEffect(() => {
    fetch('http://localhost:5001/api/characters')  // Backend API to fetch characters
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched characters:', data); // Log the fetched data
        setCharacters(data);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  // Handle character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  // Render the list of characters
  return (
    <div>
      <h1 style={{ color: 'white' }}>Select Your Character</h1>

      {/* Render a list of characters */}
      <div className="character-list">
        {characters.length === 0 ? (
          <p style={{ color: 'white' }}>Loading characters...</p>
        ) : (
          characters.map((character, index) => (
            <div
              key={index}
              className={`character-card ${selectedCharacter?.name === character.name ? 'selected' : ''}`}
              onClick={() => handleCharacterSelect(character)} // Select the character on click
              style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid white', borderRadius: '5px' }}
            >
              <h3>{character.name}</h3>
              <p>HP: {character.hp}</p>
              <p>Damage: {character.dpMin} - {character.dpMax}</p>
              <p>Block Chance: {character.blockChance}%</p>
            </div>
          ))
        )}
      </div>

      {/* Display selected character's details */}
      {selectedCharacter && (
        <div className="selected-character" style={{ marginTop: '20px' }}>
          <h2>You selected: {selectedCharacter.name}</h2>
          <p>HP: {selectedCharacter.hp}</p>
          <p>Damage: {selectedCharacter.dpMin} - {selectedCharacter.dpMax}</p>
          <p>Block Chance: {selectedCharacter.blockChance}%</p>
        </div>
      )}

      {/* Button to start the game with selected character */}
      {selectedCharacter && (
        <button onClick={() => console.log('Start game with', selectedCharacter)}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default CharacterSelection;
