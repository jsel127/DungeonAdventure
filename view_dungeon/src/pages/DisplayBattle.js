import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DisplayBattle = () => {

    const navigate = useNavigate()

    // State to store the adventurer (player's character) and opponent (enemy)
    const [adventurer, setAdventurer] = useState(null)
    const [opponent, setOpponent] = useState(null)

    // Function to fetch the adventurer data from the API
    const fetchAdventurer = () => {
        fetch('/api/adventurer')
          .then(res => {
            if (res.ok) {
              return res.json() // Return parsed JSON if the request is successful
            }
          })
          .then(data => {
            setAdventurer(data) // Update adventurer state with fetched data
            return data
          })
          .catch(error => console.error('DisplayBattle: error fetchAdventurer', error))
      }

      // Function to fetch the opponent data from the API
      const fetchOpponent = () => {
        fetch('/api/opponent')
          .then(res => {
            if (res.ok) {
              return res.json() // Return parsed JSON if the request is successful
            }
          })
          .then(data => {
            setOpponent(data) // Update opponent state with fetched data
            return data
          })
          .catch(error => console.error('DisplayBattle: error fetchOpponent', error))
      }

    // useEffect to fetch adventurer and opponent data 
    useEffect(() => {
        fetchAdventurer() //Fetch adventurer data
        fetchOpponent() //Fetch opponent data
    }, [])

     // Function to handle the attack action
    const handleAttack = () => {
      fetch('/api/attack') // Send a request to the server
        .then(res => {
          if (res.ok) {
            return res.json() // Return parsed JSON if the request is successful
          }
        })
        .then(data => processAfterAttack(data))  // Pass the response to processAfterAttack
        .catch(error => console.error('DisplayBattle: error handleAttack', error)) //Log errors
    }

      // Function to handle the special attack action
    const handleSpecialAttack = () => {
      fetch('/api/special-attack') // Send a request to the server to perform the special attack
        .then(res => {
          if (res.ok) {
            return res.json() // Return parsed JSON if the request is successful
          }
        })
        .then(data => processAfterAttack(data))
        .catch(error => console.error('DisplayBattle: error handleSpecialAttack', error))
    }

      // Function to process the result of the attack 
    const processAfterAttack = (data) => {

      if (data.fightingStatus) {
        fetchAdventurer()
        fetchOpponent()
      } else {
         // If the battle is over, check the outcome 
        if (data.adventurerDead) {
          navigate('/game-over') // Navigate to the game over page if the adventurer dies
        } else {
          navigate('/dungeon') // Navigate to the dungeon if the adventurer wins
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
      {/* Background music for the battle, set to loop and autoplay */}
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
        {/* Battle header */}
            <h1>Battle</h1>
            <br/>
            {
                adventurer === null ? <p>Loading adventurer...</p> : (
                    <>
                      {/* Display adventurer minus strings  */}
                        <h3>{JSON.stringify(adventurer.hero.dungeon_character.name).replace(/"/g, '')} - {JSON.stringify(adventurer.__type).replace(/"/g, '')}
                        <br/>
                        {/* Display adventurer's HP */}
                        {JSON.stringify(adventurer.hero.dungeon_character.hp)} HP</h3>
                    </>
                )
            }
            {
                opponent === null ? <p>Loading monster...</p> : (
                    <>
                    {/* Display opponent's name and HP */}
                        <h3>Monster - {JSON.stringify(opponent.dungeon_character.name).replace(/"/g, '')}
                        <br/>
                        {JSON.stringify(opponent.dungeon_character.hp)} HP</h3>
                    </>
                )
            }
             {/* Buttons to trigger attack and special attack */}
            <button onClick={() => handleAttack()}>Attack</button>
            <button onClick={() => handleSpecialAttack()}>Special Attack</button>
        </div>
      </>
    )

}

export default DisplayBattle