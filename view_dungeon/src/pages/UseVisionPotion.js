/**
 * UseVisionPotion.js
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Component representing the vision potion use page. 
 * @returns the JSX element to render
 */
const UseVisionPotion = () => {

  /** method to navigate between pages */
  const navigate = useNavigate()

    /** JSON representation of rooms adjacent to current room */
    const [adjacentRooms, setAdjacentRooms] = useState(null)
    /** string representation of rooms adjacent to current room */
    const [roomsString, setRoomsString] = useState('')

    /**
     * Fetches a JSON representation of the nine rooms adjacent to the current room 
     * (current room included). 
     */
    const fetchAdjacentRooms = () => {
      console.log('UseVisionPotion: FETCH ADJACENT ROOMS METHOD CALLED')
        fetch('/api/use-vision-potion')
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(data => {
            setAdjacentRooms(data)
            console.log('Adjacent Rooms',data)
            displayAdjacentRooms(JSON.parse(data))
          })
          .catch(error => console.error('UseVisionPotion: error fetchAdjacentRooms', error))
    }

    /**
     * Converts the JSON representation of the adjacent rooms to a string representation. 
     * @param {*} theAdjacentRooms - JSON representation of the adjacent rooms
     */
    function displayAdjacentRooms(theAdjacentRooms) {
      let log = ''
      for (let row = 0; row < theAdjacentRooms.length; row++) {
          let str = theAdjacentRooms[row][0] === null ? "  " : "* ";
          for (let col = 0; col < theAdjacentRooms[row].length; col++) {
              str += theAdjacentRooms[row][col] === null ? "  ": (theAdjacentRooms[row][col].north_door.status ? "  * " : "- * ");
          }
          //console.log(str);
          log += str + '\n'
          str = (theAdjacentRooms[row][0] === null || theAdjacentRooms[row][0].west_door.status) ? "  " : "| ";
          for (let col = 0; col < theAdjacentRooms[row].length; col++) {
              str += theAdjacentRooms[row][col] === null ? "   " : (theAdjacentRooms[row][col].content + (theAdjacentRooms[row][col].east_door.status ? "   " : " | "));
          }
          //console.log(str);
          log += str + '\n'
      }
      let bottomStr = theAdjacentRooms[2][0] === null ? "  " : "* ";
      for(let col = 0; col < theAdjacentRooms.length; col++) {
          bottomStr += theAdjacentRooms[2][col] === null? "  ": (theAdjacentRooms[2][col].south_door.status ? "  * " : "- * ");
      }
      //console.log(bottomStr);
      log += bottomStr + '\n'

      const newText = log.split('\n').map(s => <>{s}<br/></>)
      setRoomsString(newText)
  }

    /**
     * Fetches adjacent rooms for initial render. 
     */
    useEffect(() => {
        console.log('UseVisionPotion useEffect called')
        if (adjacentRooms === null) {
          fetchAdjacentRooms()
        }
    })

    return (
      <>
        <pre style={{ 'font-size': '40px'}}>{roomsString === null ? <p>Loading...</p> : roomsString}</pre>
        <button style={{display:'block', margin:'auto'}} onClick={() => navigate('/dungeon')}>Back</button>
      </>
    )

}

export default UseVisionPotion