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

    const fetchValidMoves = () => {
        console.log('DisplayDungeon: fetchValidMoves method called')
        fetch('/api/valid-moves')
            .then((response) => response.json())
            .then((data) => {
                setValidMoves(data)
                console.log('DisplayDungeon: data', data, validMoves)
            })
            .catch((error) => console.error('Error fetching valid moves:', error))
    }

    const handleClick = (direction) => {
        fetch('/api/move-direction', {
            method: 'POST', 
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              dir: direction
            })
          }).then(res => {
            return res.json()
          }).catch(error => console.log('ERROR: handle movement post request'))
        fetchValidMoves()
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