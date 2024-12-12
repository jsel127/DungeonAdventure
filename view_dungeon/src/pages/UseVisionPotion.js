import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UseVisionPotion = () => {

  const navigate = useNavigate()

    const [adjacentRooms, setAdjacentRooms] = useState(null)
    const [roomsString, setRoomsString] = useState('')

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

    useEffect(() => {
        console.log('UseVisionPotion useEffect called')
        if (adjacentRooms === null) {
          fetchAdjacentRooms()
        }
    })

    return (
      <>
        <pre style={{ 'font-size': '40px'}}>{roomsString === null ? <p>Loading...</p> : roomsString}</pre>
        <button onClick={() => navigate('/dungeon')}>Back</button>
      </>
    )

}

export default UseVisionPotion