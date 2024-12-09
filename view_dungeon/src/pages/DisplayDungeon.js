import React, { useState, useEffect } from 'react';

const MovementButton = ({ direction, doorOpen, onButtonClick }) => {
    return (
        <button disabled={!doorOpen} onClick={onButtonClick}>
            {direction}
        </button>
    );
};

const DisplayDungeon = () => {
    const [validMoves, setValidMoves] = useState(null);
    const [adventurerInfo, setAdventurerInfo] = useState(null);
    const [dungeonMap, setDungeonMap] = useState(null);
    const [inventory, setInventory] = useState([]);

    // Fetch adventurer info
    const fetchAdventurerInfo = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/inventory');
            if (!response.ok) {
                throw new Error(`Error fetching adventurer info: ${response.statusText}`);
            }
            const data = await response.json();
            setAdventurerInfo(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch dungeon map
    const fetchDungeonMap = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/dungeon-map');
            if (!response.ok) {
                throw new Error(`Error fetching dungeon map: ${response.statusText}`);
            }
            const data = await response.json();
            setDungeonMap(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch valid moves
    const fetchValidMoves = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/valid-moves');
            if (!response.ok) {
                throw new Error(`Error fetching valid moves: ${response.statusText}`);
            }
            const data = await response.json();
            setValidMoves(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch inventory
    const fetchInventory = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/inventory');
            if (!response.ok) {
                throw new Error(`Error fetching adventurer info: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Adventurer Info:', data); // Log the data to check its structure
            setAdventurerInfo(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    

    const handleClick = (direction) => {
        let url;
        switch (direction) {
            case 'North':
                url = '/api/move-north';
                break;
            case 'East':
                url = '/api/move-east';
                break;
            case 'South':
                url = '/api/move-south';
                break;
            case 'West':
                url = '/api/move-west';
                break;
            default:
                throw new Error('Invalid direction');
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({ dir: direction }),
        }).then((res) => res.json()).catch((error) => console.log('ERROR: handle movement post request'));

        // Refresh valid moves after movement
        fetchValidMoves();
    };

    // Call fetch functions when the component mounts
    useEffect(() => {
        fetchAdventurerInfo();
        fetchDungeonMap();
        fetchValidMoves();
        fetchInventory();
    }, []);

    return (
        <div>
            <h2>Dungeon Display</h2>

            {adventurerInfo ? (
                <div>
                    <h3>Adventurer Info</h3>
                    <p>Name: {adventurerInfo.name}</p>
                    <p>Health: {adventurerInfo.health}</p>
                    <p>Level: {adventurerInfo.level}</p>
                </div>
            ) : (
                <p>Loading Adventurer Info...</p>
            )}

            {dungeonMap ? (
                <div>
                    <h3>Dungeon Map</h3>
                    <pre>{dungeonMap}</pre>
                </div>
            ) : (
                <p>Loading Dungeon Map...</p>
            )}

            {validMoves ? (
                <div>
                    <h3>Valid Moves</h3>
                    <p>North: {validMoves.north ? 'Available' : 'Blocked'}</p>
                    <MovementButton direction='North' doorOpen={validMoves.north} onButtonClick={() => handleClick('North')} />
                    <br />
                    <p>East: {validMoves.east ? 'Available' : 'Blocked'}</p>
                    <MovementButton direction='East' doorOpen={validMoves.east} onButtonClick={() => handleClick('East')} />
                    <br />
                    <p>South: {validMoves.south ? 'Available' : 'Blocked'}</p>
                    <MovementButton direction='South' doorOpen={validMoves.south} onButtonClick={() => handleClick('South')} />
                    <br />
                    <p>West: {validMoves.west ? 'Available' : 'Blocked'}</p>
                    <MovementButton direction='West' doorOpen={validMoves.west} onButtonClick={() => handleClick('West')} />
                </div>
            ) : (
                <p>Loading Valid Moves...</p>
            )}

            {inventory && inventory.length > 0 ? (
                <div>
                    <h3>Inventory</h3>
                    <ul>
                        {inventory.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No Inventory</p>
            )}
        </div>
    );
};

export default DisplayDungeon;
