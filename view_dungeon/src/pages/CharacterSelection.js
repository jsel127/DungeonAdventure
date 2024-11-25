import React, { useEffect, useState } from 'react';

function CharacterSelection() {

  /*
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/select-character").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  */

  console.log("CharacterSelection component is rendered!");

  return (
    <div>choose a character</div>
    /*
    <div>
      {(typeof backendData.characters === "undefined") ? (
        <p>Loading...</p>
      ) : (
        backendData.characters.map((character, i) => (
          <p key={i}>{character}</p>
        ))
      )}
    </div>
    */
  );

};

export default CharacterSelection;