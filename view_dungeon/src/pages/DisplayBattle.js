import { useState, useEffect } from 'react'

const DisplayBattle = () => {

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
          .catch(error => console.log('DisplayDungeon: error fetchAdventurer', error))
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
          .catch(error => console.log('DisplayDungeon: error fetchOpponent', error))
      }

    useEffect(() => {
        fetchAdventurer()
        fetchOpponent()
    }, [])

    return (
        <>
            Battle Interface
            <br/>
            {
                adventurer === null ? <p>Loading adventurer...</p> : (
                    <>
                        <p>Hero: {JSON.stringify(adventurer.hero.dungeon_character.name)} 
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
        </>
    )

}

export default DisplayBattle