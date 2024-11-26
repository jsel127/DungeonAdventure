import React, { useState, useEffect } from 'react';

const CharacterSelection = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/characters')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched characters:', data); 
        setCharacters(data);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  