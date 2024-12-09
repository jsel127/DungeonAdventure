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
      console.log('WIN/LOSE DATA', data)
      if (data.win) {
        navigate('/dungeon')
      } else if (data.lose) {
        navigate('/lose-game')
      } else {
        fetchAdventurer()
        fetchOpponent()
      }
    }

    return (
        <>
            Battle Interface
            <br/>
            {
                adventurer === null ? <p>Loading adventurer...</p> : (
                    <>
                        <p>Hero ({JSON.stringify(adventurer.__type)}): {JSON.stringify(adventurer.hero.dungeon_character.name)}
                        <br/>
                        hp: {JSON.stringify(adventurer.hero.dungeon_character.hp)}</p>
                    </>
                )
            }
            {
                opponent === null ? <p>Loading monster...</p> : (
                    <>
                        <p>Monster: {JSON.stringify(opponent.dungeon_character.name)}
                        <br/>
                        hp: {JSON.stringify(opponent.dungeon_character.hp)}</p>
                    </>
                )
            }
            <button onClick={() => handleAttack()}>Attack</button>
            <button onClick={() => handleSpecialAttack()}>Special Attack</button>
        </>
    )

}

export default DisplayBattle