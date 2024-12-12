import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DisplayBattle = () => {

    const navigate = useNavigate()

    const [adventurer, setAdventurer] = useState(null)
    const [opponent, setOpponent] = useState(null)

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
          .catch(error => console.error('DisplayBattle: error fetchAdventurer', error))
      }

      const fetchOpponent = () => {
        fetch('/api/opponent')
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(data => {
            setOpponent(data)
            return data
          })
          .catch(error => console.error('DisplayBattle: error fetchOpponent', error))
      }

    useEffect(() => {
        fetchAdventurer()
        fetchOpponent()
    }, [])

    const handleAttack = () => {
      fetch('/api/attack')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => processAfterAttack(data))
        .catch(error => console.error('DisplayBattle: error handleAttack', error))
    }

    const handleSpecialAttack = () => {
      fetch('/api/special-attack')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(data => processAfterAttack(data))
        .catch(error => console.error('DisplayBattle: error handleSpecialAttack', error))
    }

    const processAfterAttack = (data) => {

      if (data.fightingStatus) {
        fetchAdventurer()
        fetchOpponent()
      } else {
        if (data.adventurerDead) {
          navigate('/game-over')
        } else {
          navigate('/dungeon')
        }
      }

      /*
      console.log('WIN/LOSE DATA', data)
      if (data.win) {
        navigate('/dungeon')
      } else if (data.lose) {
        navigate('/game-over')
      } else {
        fetchAdventurer()
        fetchOpponent()
      }
        */
    }

    return (
      <>
      <audio autoPlay loop>
                 <source src="/suspense.mp3" type="audio/mp3" />
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
            <h1>Battle</h1>
            <br/>
            {
                adventurer === null ? <p>Loading adventurer...</p> : (
                    <>
                        <h3>{JSON.stringify(adventurer.hero.dungeon_character.name).replace(/"/g, '')} - {JSON.stringify(adventurer.__type).replace(/"/g, '')}
                        <br/>
                        {JSON.stringify(adventurer.hero.dungeon_character.hp)} HP</h3>
                    </>
                )
            }
            {
                opponent === null ? <p>Loading monster...</p> : (
                    <>
                        <h3>Monster - {JSON.stringify(opponent.dungeon_character.name).replace(/"/g, '')}
                        <br/>
                        {JSON.stringify(opponent.dungeon_character.hp)} HP</h3>
                    </>
                )
            }
            <button onClick={() => handleAttack()}>Attack</button>
            <button onClick={() => handleSpecialAttack()}>Special Attack</button>
        </div>
      </>
    )

}

export default DisplayBattle