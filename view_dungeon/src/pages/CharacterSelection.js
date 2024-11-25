import React, { useEffect, useState } from 'react';

const CharacterSelection = () => {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/select-character").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
      
    <div>

      <h1 style={{ color: 'white' }}>Select Your Character</h1>

      {(typeof backendData.characters === "undefined") ? (
        <p>Loading...</p>
      ) : (
        backendData.characters.map((character, i) => (
          <p key={i}>{character}</p>
        ))
      )}

    </div>

  )

};

export default CharacterSelection;
