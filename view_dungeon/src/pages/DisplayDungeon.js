/**
 * DisplayDungeon.js
 * Component representing the main dungeon navigation page. 
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DisplayDungeon.css'

/**
 * Component for one of the four movement buttons. 
 * @param direction - North, East, South, or West
 * @param doorOpen - true if this door is open, false if closed
 * @param onButtonClick - function called when this button is clicked
 * @returns button for movement around dungeon
 */
const MovementButton = ({ direction, doorOpen, onButtonClick }) => {

    return (
        <button style={{display:'block', margin:'auto'}} disabled={!doorOpen} onClick={onButtonClick}>
            {direction}
        </button>
    )
}

/**
 * Component representing the main dungeon movement page. Includes movement buttons, 
 * adventurer, inventory, and room info, and a save game button. 
 * @returns the JSX element to render
 */
const DisplayDungeon = () => {

    /** method to navigate between pages */
    const navigate = useNavigate()

    /** valid moves for current room */
    const [validMoves, setValidMoves] = useState(null)
    /** adventurer inventory */
    const [inventory, setInventory] = useState(null)
    /** message concerning room content or any other update */
    const [message, setMessage] = useState('')
    /** info about the adventurer */
    const [adventurer, setAdventurer] = useState(null)
    /** coordinates of the current room */
    const [coordinates, setCoordinates] = useState(null)

    /**
     * Fetches all state updates from the model for a rerender. 
     */
    const fetchModelUpdates = () => {
      console.log('DisplayDungeon: MODEL UPDATES') 
      hasWonGame()
      isHeroDead()
      isMonster()
      fetchInventory()
      fetchValidMoves()
      fetchAdventurer()
      fetchCoordinates()
    }

    /**
     * Fetches the alive/dead status of the hero. 
     */
    const isHeroDead = () => {
      fetch('/api/is-hero-dead')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => {
          if (data) {
            navigate('/game-over')
          }
        })
        .catch(error => console.log('DisplayDungeon: error isHeroDead fetch', error))
    }

    /**
     * Fetches the inventory from the model. 
     */
    const fetchInventory = () => {
      console.log('FETCH INVENTORY CALLED')
      fetch('/api/inventory')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => {
          setInventory(data)
          console.log('DisplayDungeon: INVENTORY:', inventory)
          return data

        })
        .catch(error => console.log('DisplayDungeon: error fetchInventory fetch', error))
    }

    /**
     * Fetches the coordinates of the current room from the model. 
     */
    const fetchCoordinates = () => {
      fetch('/api/coordinates')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => {
          setCoordinates(data)
          console.log('DisplayDungeon: COORDS', coordinates)
          return data
        })
        .catch(error => console.log('DisplayDungeon: error fetchCoordinates', error))
    }

    /**
     * Fetches the dungeon map from the model. 
     */
    const displayMap = () => {
      fetch('/api/dungeon-map')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => {
          console.log('DisplayDungeon: MAP\n', data)
        })
        .catch(error => console.log('DisplayDungeon: error displayMap fetch', error))
    }

    /**
     * Fetches the valid moves (out of North, South, East, West) from the model. 
     */
    const fetchValidMoves = async () => {
        try {
          const response = await fetch('http://localhost:5001/api/valid-moves', {
            headers: {
                'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setValidMoves(data)
        } catch (error) {
          console.error('Fetch error: ', error);
        }
      }

    /**
     * Fetches whether the current room contains a monster. 
     * If it does, navigates to battle page.
     */
    const isMonster = () => {
      fetch('/api/fighting-status')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(isFighting => {
          if (isFighting) {
            navigate('/battle')
          }
        })
        .catch(error => console.log('DisplayDungeon: error isMonster fetch', error))
    }

    /**
     * Fetches game won status from the model. 
     */
    const hasWonGame = () => {
      fetch('/api/has-won-game')
          .then(res => {
            if (res.ok) {
                return res.json()
            }
          })
          .then(data => {
            if (data) {
              navigate('/game-over')
            }
          })
          .catch(error => console.error('DisplayDungeon: error hasWonGame', error))
    }

    /**
     * Fetches adventurer info from the model. 
     */
    const fetchAdventurer = () => {
      fetch('/api/adventurer')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => {
          setAdventurer(data)
          return data
        })
        .catch(error => console.error('DisplayDungeon: error fetchAdventurer', error))
    }

    /**
     * This function is called when the user clicks a movement button. 
     * Sends direction to the model, which processes movement; then updates the view. 
     * @param direction - North, South, East, West as selected by the user. 
     */
    const handleClick = (direction) => {
        console.log('DisplayDungeon:  handleClick called', direction)
        console.log(validMoves)
        let url
        switch (direction) {
            case 'North':
                url = '/api/move-north'
                console.log('DisplayDungeon: switch north')
                break
            case 'East':
                url = '/api/move-east'
                console.log('DisplayDungeon: switch east')
                break
            case 'South':
                url = '/api/move-south'
                console.log('DisplayDungeon: switch south')
                break
            case 'West': 
                url = '/api/move-west'
                console.log('DisplayDungeon: switch west')
                break
            default:
                throw new Error('DisplayDungeon: direction must be North, East, South, West')
        }
        fetch(url, { 
            method: 'POST', 
            headers: {  
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
              dir: direction
            })
          })
          .then((res) => {
            const message = res.json()
            console.log('DisplayDungeon: after post fetch completes', message) 
            fetchModelUpdates()
            return message
          })
          .then(result => {
            setMessage(result)
          })
          .catch(error => console.log('ERROR: handle movement post request', error))

    }

    /**
     * Handles healing potion functionality. 
     */
    const handleHealingPotion = () => {
      fetch('/api/use-healing-potion')
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(data => {
            console.log('DisplayDungeon: HEAL DATA:', data)
            setMessage(data)
            fetchInventory()
            fetchAdventurer()
          })
          .catch(error => console.error('DisplayDungeon: error useHealingPotion', error))
    }

    /**
     * Handles vision potion functionality. 
     */
    const handleVisionPotion = () => {
      navigate('/vision-potion')
    }

    /**
     * Fetches game state and saves game to local storage when 
     * save button is clicked.
     */
    const handleSave = () => {
      fetch('/api/save-game')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => {
          localStorage.setItem('saved-game', data)
          return data
        })
        .catch(error => console.log('DisplayDungeon: error handleSave', error))
    }

    /**
     * Fetches updated state info from model on rerenders. 
     */
    useEffect(() => {
      setTimeout(function() {
        console.log('Display Dungeon: useEffect called')
        fetchModelUpdates()
      }, 100)
    }, [])

    return (
      <>
      <audio autoPlay loop>
                 <source src="/dungeon.mp3" type="audio/mp3" />
            </audio>
      <div style={{           
        backgroundColor: 'maroon', 
        minHeight: '100vh', 
        color: 'white', 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
            { validMoves === null ? (
                <p>Loading Dungeon...</p>
            ) : (
                <p>
                    {console.log('DisplayDungeon: RERENDER')}
                    {console.log('DisplayDungeon: validMoves', validMoves)}
                    {console.log('DisplayDungeon: INVENTORY (return)', inventory)}
                    {displayMap()}
                    {
                      adventurer === null ? <p>Loading adventurer...</p> : (
                        <h2>
                          <>{JSON.stringify(adventurer.hero.dungeon_character.name).replace(/"/g, '')} - {JSON.stringify(adventurer.__type).replace(/"/g, '')}
                          <br/>
                          {JSON.stringify(adventurer.hero.dungeon_character.hp)} HP</>
                        </h2>
                      )
                    }
                    <h3>Room: {coordinates === null ? <>Loading...</> : <>{JSON.stringify(coordinates.row)}, {JSON.stringify(coordinates.col)}</>}</h3>
                    <MovementButton direction='North' doorOpen={validMoves.north} onButtonClick={() => handleClick('North')} />
                    <br/>
                    <div style={{ display: 'flex', gridTemplateColumns: '1fr 1fr', justifyContent: 'center', gap: '10px' }}>
                      <MovementButton direction='West' doorOpen={validMoves.west} onButtonClick={() => handleClick('West')} />
                      {/*<img src={'/neswDungeonRoom.png'} />*/}
                      <MovementButton direction='East' doorOpen={validMoves.east} onButtonClick={() => handleClick('East')} />
                    </div>
                    <br/>
                    <MovementButton direction='South' doorOpen={validMoves.south} onButtonClick={() => handleClick('South')} />
                    <br/>
                   <h3>Message: {message}</h3>
                   <h3>Inventory:</h3>
                   {inventory === null ? <p>Loading Inventory...</p> : (
                      <p>
                        {console.log('INVENTORY.items', inventory.items)}
                        <button disabled={JSON.stringify(inventory.items.healing_potion) === '0'} onClick={() => handleHealingPotion()}>Healing Potions ({JSON.stringify(inventory.items.healing_potion)})</button>
                        <button disabled={JSON.stringify(inventory.items.vision_potion) === '0'} onClick={() => handleVisionPotion()}>Vision Potions ({JSON.stringify(inventory.items.vision_potion)})</button>
                        <br/>
                        Pillars:
                        {inventory.items.pillars.abstraction ? <div>Pillar of Abstraction</div> : <div/> }
                        {inventory.items.pillars.encapsulation ? <div>Pillar of Encapsulation</div> : <div/> }
                        {inventory.items.pillars.inheritance ? <div>Pillar of Inheritance</div> : <div/> }
                        {inventory.items.pillars.polymorphism ? <div>Pillar of Polymorphism</div> : <div/> }
                      </p>
                    )}
                    <br/>
                    <button onClick={() => handleSave()}>Save Game</button>
                </p>
            )}
        </div>
      </>
    ) 

}

export default DisplayDungeon