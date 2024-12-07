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

    const fetchValidMoves = async () => {
        try {
          const response = await fetch('/api/valid-moves', {
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
                break
            case 'East':
                url = '/api/move-east'
                break
            case 'South':
                url = '/api/move-south'
                break
            case 'West': 
                url = '/api/move-west'
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
          }).then(res => {
            return res.json()
          }).catch(error => console.log('ERROR: handle movement post request'))

        // this is for testing
        //setValidMoves(null)

        setTimeout(fetchValidMoves(), 500)
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