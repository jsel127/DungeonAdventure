import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


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
    const [adventurerInfo, setAdventurerInfo] = useState(null)

    const fetchInventory = async () => {
        try {
            const response = await fetch('/api/inventory');
            if (!response.ok) throw new Error('Failed to fetch inventory');
            const data = await response.json();
            console.log('Fetched inventory:', data); // Log fetched inventory
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const fetchAdventurerInfo = async () => {
        try {
            const response = await fetch('/api/adventurer');
            if (!response.ok) throw new Error('Failed to fetch adventurer info');
            const data = await response.json();
            
            // Accessing nested values properly
            const hero = data.hero;
            const adventurerInfo = {
                name: hero.dungeon_character.name,
                health: hero.dungeon_character.hp,
                attack: hero.dungeon_character.dp_min,  // You can adjust this to use dp_min or dp_max, depending on your logic
                defense: hero.block_chance,  // Assuming block_chance represents defense here
                inventory: hero.inventory.items
            };
    
            setAdventurerInfo(adventurerInfo);
        } catch (error) {
            console.error('Error fetching adventurer info:', error);
        }
    };
    const [map, setMap] = useState(null);

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

    useEffect(() => {
        console.log('Display Dungeon: useEffect called')
        fetchValidMoves()
        fetchInventory()
        fetchAdventurerInfo() // Fetch adventurer info on initial render
    }, [])

    return (
  <>
    {validMoves === null ? (
      <p>Loading Dungeon...</p>
    ) : (
      <p>
        {console.log('DisplayDungeon: RERENDER')}
        {console.log('DisplayDungeon: validMoves', validMoves)}
        {console.log('DisplayDungeon: INVENTORY (return)', inventory)}

        

        North: {validMoves.north.toString()}
        <MovementButton direction='North' doorOpen={validMoves.north} onButtonClick={() => handleClick('North')} />
        <br />
        East: {validMoves.east.toString()}
        <MovementButton direction='East' doorOpen={validMoves.east} onButtonClick={() => handleClick('East')} />
        <br />
        South: {validMoves.south.toString()}
        <MovementButton direction='South' doorOpen={validMoves.south} onButtonClick={() => handleClick('South')} />
        <br />
        West: {validMoves.west.toString()}
        <MovementButton direction='West' doorOpen={validMoves.west} onButtonClick={() => handleClick('West')} />
        <br />
        <br />

        Adventurer Info:
        {adventurerInfo === null ? <p>Loading Adventurer Info...</p> : (
          <div>
            <p>Name: {adventurerInfo.name}</p>
            <p>Health: {adventurerInfo.health}</p>
            <p>Attack Power: {adventurerInfo.attack}</p>
            <p>Defense: {adventurerInfo.defense}</p>
          </div>
        )}
        Inventory:
        {inventory === null ? <p>Loading Inventory...</p> : JSON.stringify(inventory.items)}
        <br />
        <br />
      </p>
    )}
  </>
);

}

export default DisplayDungeon
