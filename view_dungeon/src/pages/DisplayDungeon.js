import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MovementButton = ({ direction, doorOpen, onButtonClick }) => {

  const ButtonStyle = {
    backgrounColor: 'maroon',
    cursor: 'pointer',
    marginBottom: '15px',
    border: doorOpen ? '2px solid green' : '2px solid gray',
    padding: '10px',
    width: '200px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: doorOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.0)',
    borderRadius: '5px',
  }

    return (
        <button style={ButtonStyle} disabled={!doorOpen} onClick={onButtonClick}>
            {direction}
        </button>
    )
}

const DisplayDungeon = () => {

    const navigate = useNavigate()

    const [validMoves, setValidMoves] = useState(null)
    const [inventory, setInventory] = useState(null)
    const [message, setMessage] = useState('')
    const [adventurer, setAdventurer] = useState(null)
    const [coordinates, setCoordinates] = useState(null)

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

    const handleVisionPotion = () => {
      navigate('/vision-potion')
    }

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

    useEffect(() => {
      setTimeout(function() {
        console.log('Display Dungeon: useEffect called')
        fetchModelUpdates()
      }, 100)
    }, [])

    const ButtonStyle = {
      backgrounColor: 'maroon',
      cursor: 'pointer',
      marginBottom: '15px',
      border: '2px solid green',
      padding: '10px',
      width: '200px',
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '5px',
    }

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
        alignItems: 'center' 
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
                    <MovementButton direction='West' doorOpen={validMoves.west} onButtonClick={() => handleClick('West')} />
                    <MovementButton direction='East' doorOpen={validMoves.east} onButtonClick={() => handleClick('East')} />
                    <br/>
                    <MovementButton direction='South' doorOpen={validMoves.south} onButtonClick={() => handleClick('South')} />
                    <br/>
                   <h3>Message: {message}</h3>
                   <h3>Inventory:</h3>
                   {inventory === null ? <p>Loading Inventory...</p> : (
                      <p>
                        {console.log('INVENTORY.items', inventory.items)}
                        <button style={ButtonStyle} onClick={() => handleHealingPotion()}>Healing Potions ({JSON.stringify(inventory.items.healing_potion)})</button>
                        <button style={ButtonStyle} onClick={() => handleVisionPotion()}>Vision Potions ({JSON.stringify(inventory.items.vision_potion)})</button>
                        <br/>
                        Pillars:
                        {inventory.items.pillars.abstraction ? <div>Pillar of Abstraction</div> : <div/> }
                        {inventory.items.pillars.encapsulation ? <div>Pillar of Encapsulation</div> : <div/> }
                        {inventory.items.pillars.inheritance ? <div>Pillar of Inheritance</div> : <div/> }
                        {inventory.items.pillars.polymorphism ? <div>Pillar of Polymorphism</div> : <div/> }
                      </p>
                    )}
                    <button onClick={() => handleSave()}>Save Game</button>
                </p>
            )}
        </div>
      </>
    ) 

}

export default DisplayDungeon