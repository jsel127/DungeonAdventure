import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DisplayDungeon.css';

const MovementButton = ({ direction, doorOpen, onButtonClick }) => {
    return (
        <button disabled={!doorOpen} onClick={onButtonClick}>
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
          return data
          //console.log('DisplayDungeon: INVENTORY: (data)', data)
        })
        .catch(error => console.log('DisplayDungeon: error displayMap fetch', error))
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
            hasWonGame()
            isMonster()
            fetchInventory()
            fetchValidMoves()
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
            if (data === 'You have no healing potions') {
              setMessage(data)
            } else {
              setMessage('You healed ' + data + ' hp')
            }
            fetchInventory()
          })
          .catch(error => console.error('DisplayDungeon: error useHealingPotion', error))
    }

    const handleVisionPotion = () => {

    }

    useEffect(() => {
      setTimeout(function() {
        console.log('Display Dungeon: useEffect called')
        fetchValidMoves()
        fetchInventory()
      }, 100)
    }, [])

    return (
        <>
            { validMoves === null ? (
                <p>Loading Dungeon...</p>
            ) : (
                <p>
                    {console.log('DisplayDungeon: RERENDER')}
                    {console.log('DisplayDungeon: validMoves', validMoves)}
                    {console.log('DisplayDungeon: INVENTORY (return)', inventory)}
                    {displayMap()}
                    North: { validMoves.north.toString() }
                    <MovementButton direction='North' doorOpen={validMoves.north} onButtonClick={() => handleClick('North')} />
                    <br/>
                    East: { validMoves.east.toString() } 
                    <MovementButton direction='East' doorOpen={validMoves.east} onButtonClick={() => handleClick('East')} />
                    <br/>
                    South: { validMoves.south.toString() } 
                    <MovementButton direction='South' doorOpen={validMoves.south} onButtonClick={() => handleClick('South')} />
                    <br/>
                    West: { validMoves.west.toString() } 
                    <MovementButton direction='West' doorOpen={validMoves.west} onButtonClick={() => handleClick('West')} />
                    <br/>
                    <br/>
                    <button onClick={() => handleHealingPotion()}>Use Healing Potion</button>
                    <button onClick={() => handleVisionPotion()}>Use Vision Potion</button>
                    <br/>
                    <br/>
                   Message: 
                   {message}
                   <br/>
                   <br/>
                   Inventory:
                   {inventory === null ? <p>Loading Inventory...</p> : JSON.stringify(inventory.items)}
                </p>
            )}
        </>
    ) 

}

export default DisplayDungeon