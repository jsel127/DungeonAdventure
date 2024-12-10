import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const GameOver = () => {

    const [hasWon, setHasWon] = useState(null)

    const hasWonGame = () => {
        fetch('/api/has-won-game')
          .then(res => {
            if (res.ok) {
                return res.json()
            }
          })
          .then(data => {
            setHasWon(data)
          })
          .catch(error => console.error('GameOver: error hasWonGame', error))
    }

    useEffect(() => {
        hasWonGame()
    }, [])

    return (
        <>
            {
                hasWon === null ? <p>Loading...</p> : (
                    hasWon ? <p>You Win</p> : <p>You Lose</p>
                )
            }
            {/* Restarting the game does not currently work */}
            <Link to='/'>
                <button>Home</button>
            </Link>
        </>
    )

}

export default GameOver