import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DifficultySelection = () => {
    //State to hold difficulties 
    const [difficulties, setDifficulties] = useState([])
    //State to hold the selected difficulty
    const [selectedDifficulty, setSelectedDifficulty] = useState(null)

     // useEffect hook to fetch difficulties from model
    useEffect(() => {
        fetch('/api/difficulties')
          .then((response) => response.json())
          .then((data) => {
            console.log('Fetched difficulties:', data); 
            setDifficulties(data);
          })
          .catch((error) => console.error('Error fetching difficulties:', error));
      }, [])

      // Function to handle difficulty selection when a user clicks on an option
      const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
      };

      return (
        <div style={{           
          backgroundColor: 'maroon', 
          minHeight: '100vh', 
          color: 'white', 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center' 
 }}>
          <h1>Difficulty Selection</h1> {/* Heading of the page */}
          {difficulties.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="character-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Available difficulties and display them as selectable options */}
              {difficulties.map((difficulty) => (
                <div
                  key={difficulty}
                  className={`character-card ${selectedDifficulty === difficulty ? 'selected' : ''}`}
                  onClick={() => handleDifficultySelect(difficulty)} 
                  style={{
                    backgrounColor: 'maroon',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    border: selectedDifficulty === difficulty ? '2px solid green' : '2px solid gray',
                    padding: '10px',
                    width: '200px',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '5px',
                  }}
                >
                  <h3>{difficulty}</h3>
                </div>
              ))}
            </div>
          )}
    
          {selectedDifficulty && (
            <div className="selected-character" style={{ marginTop: '20px', textAlign: 'center' }}>
              <h2>You selected: {selectedDifficulty}</h2>
            </div>
          )}
    
          {/* Start Game button, which is only enabled once a difficulty is selected */}
          {selectedDifficulty && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/dungeon">
                <button onClick={() => {
                  console.log('Difficulty selected', selectedDifficulty)
                  fetch('/api/selected-difficulty', {
                    method: 'POST', 
                    headers: {
                      'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                      difficulty: selectedDifficulty
                    })
                  }).then(res => {
                    return res.json()
                  }).catch(error => console.log('ERROR: select difficulty post request'))
                }}>
                  Start Game
                </button>
              </Link>
            </div>
          )}
        </div>
      );

}

export default DifficultySelection