import React, { useState, useEffect } from 'react'

const MovementButton = ({ direction, doorOpen, onButtonClick }) => {
    return (
        <button disabled={!doorOpen} onClick={onButtonClick}>
            {direction}
        </button>
    )
}

const DisplayDungeon = () => {

    const [validMoves, setValidMoves] = useState(null)

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
          }).then((res) => {
            const someJson = res.json()
            console.log('DisplayDungeon: after post fetch completes', someJson) 
            fetchValidMoves()
            return someJson
          }).catch(error => console.log('ERROR: handle movement post request', error))

    }

    useEffect(() => {
        console.log('Display Dungeon: useEffect called')
        fetchValidMoves()
    }, [])

    return (
        <>
            { validMoves === null ? (
                <p>Loading Dungeon...</p>
            ) : (
                <p>
                    {console.log('DisplayDungeon: RERENDER')}
                    {console.log('DisplayDungeon: validMoves', validMoves)}
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
                </p>
            )}
        </>
    ) 

}

export default DisplayDungeon