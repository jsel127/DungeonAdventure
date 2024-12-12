import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//State to hold a list of characters
const CharacterSelection = () => {
  const [characters, setCharacters] = useState([]);
  //Keeps track of selected character
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  //Fetches characters from model
  useEffect(() => {
    fetch('/api/characters')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched characters:', data); 
        setCharacters(data);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  //Handles the selection of character
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div style={{ backgroundColor: 'maroon', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <h1>Select Your Hero</h1>
      {/* Show loading text while characters are being fetched */}
      {characters.length === 0 ? (
        <p>Loading characters...</p>
      ) : (
        <div className="character-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {characters.map((character, index) => (
            <div
              key={index}
              className={`character-card ${selectedCharacter?.name === character.name ? 'selected' : ''}`}
              onClick={() => handleCharacterSelect(character)}
              style={{
                cursor: 'pointer',
                marginBottom: '15px',
                border: selectedCharacter?.name === character.name ? '2px solid green' : '2px solid gray',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  {/* Styling for selected character + shows character stats */}
      {selectedCharacter && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/select-name">
            <button onClick={() => {
              console.log('Start game with', selectedCharacter.name)
              fetch('/api/selected-character', {
                method: 'POST', 
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  character: selectedCharacter
                })
              }).then(res => {
                return res.json()
              }).catch(error => console.log('ERROR: select character post request'))
            }}>
              Next
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
