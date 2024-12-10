import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CharacterSelection = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetch('/api/characters')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched characters:', data); 
        setCharacters(data);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div style={{ backgroundColor: 'maroon', minHeight: '100vh', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Select Your Hero</h1>
      {characters.length === 0 ? (
        <p>Loading characters...</p>
      ) : (
        <div className="character-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {characters.map((character) => (
            <div
              key={character.name}
              onClick={() => handleCharacterSelect(character)}
              style={{
                cursor: 'pointer',
                marginBottom: '15px',
                border: selectedCharacter?.name === character.name ? '2px solid green' : '2px solid gray',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                color: 'white',
                backgroundColor: selectedCharacter?.name === character.name ? 'rgba(0, 128, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)',  // Update background dynamically based on selection
                borderRadius: '5px',
              }}
            >
              <h3>{character.name}</h3>
              <p>HP: {character.hp}</p>
              <p>Damage: {character.dp_min} - {character.dp_max}</p>
              <p>Block Chance: {character.block_chance}%</p>
            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div className="selected-character" style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>You selected: {selectedCharacter.name}</h2>
          <p>HP: {selectedCharacter.hp}</p>
          <p>Damage: {selectedCharacter.dp_min} - {selectedCharacter.dp_max}</p>
          <p>Block Chance: {selectedCharacter.block_chance}%</p>
        </div>
      )}

      {selectedCharacter && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/select-name">
            <button
              onClick={() => {
                console.log('Start game with', selectedCharacter.name);
                fetch('/api/selected-character', {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    character: selectedCharacter,
                  }),
                })
                  .then((res) => res.json())
                  .catch((error) =>
                    console.log('ERROR: select character post request', error)
                  );
              }}
            >
              Next
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
