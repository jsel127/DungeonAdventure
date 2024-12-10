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
            {
                hasWon === null ? <p>Loading...</p> : (
                    hasWon ? <p>You Win</p> : <p>You Lose</p>
                )
            }
            {/* Restarting the game does not currently work */}
            <Link to='/'>
                <button>Home</button>
            </Link>
        </div>
    )

}

export default GameOver