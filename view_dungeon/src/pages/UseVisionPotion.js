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

    const buildRoom = (room) => {
      let str = ''
      if (room === null) {
        str += '~~~\n~~~\n~~~\n'
      }
    }

    const buildString = (data) => {
      
      let str = ''

      console.log('BUILD STRING data', data)

      let r1 = data[0][0]
      let r2 = data[0][1]
      let r3 = data[0][2]

      let r4 = data[1][0]
      let r5 = data[1][1]
      let r6 = data[1][2]

      let r7 = data[2][0]
      let r8 = data[2][1]
      let r9 = data[2][2]

      // Line 1
      str += (r1 === null ? '~~~' : '+' + (r1.north_door.status ? ' ' : '-') + '+') 
      str += (r2 === null ? '~~~' : '+' + (r2.north_door.status ? ' ' : '-') + '+') 
      str += (r3 === null ? '~~~' : '+' + (r3.north_door.status ? ' ' : '-') + '+') 

      str += "\n"

      // Line 2
      str += (r1 === null ? '~~~' : (r1.west_door.status ? ' ' : '|.') + r1.content + (r1.east_door.status ? ' ' : '.|'))
      str += (r2 === null ? '~~~' : (r2.west_door.status ? ' ' : '|.') + r2.content + (r2.east_door.status ? ' ' : '.|'))
      str += (r3 === null ? '~~~' : (r3.west_door.status ? ' ' : '|.') + r3.content + (r3.east_door.status ? ' ' : '.|'))

      str += "\n"

      // Line 3
      str += (r1 === null ? '~~~' : '+' + (r1.south_door.status ? ' ' : '-') + '+') 
      str += (r2 === null ? '~~~' : '+' + (r2.south_door.status ? ' ' : '-') + '+') 
      str += (r3 === null ? '~~~' : '+' + (r3.south_door.status ? ' ' : '-') + '+') 

      str += "\n"

      

      let stry = ''
      // comment
      stry += (r1 === null ? '~~~' : 'u/2588' + (r1.north_door.status ? ' ' : '#') + '#') 
      stry += (r2 === null ? '~~~' : '#' + (r2.north_door.status ? ' ' : '#') + '#') 
      stry += (r3 === null ? '~~~' : '#' + (r3.north_door.status ? ' ' : '#') + '#') 
      stry += '\n'

      stry += (r1 === null ? '~~~' : (r1.west_door.status ? ' ' : '#') + r1.content + (r1.east_door.status ? ' ' : '#'))
      stry += (r2 === null ? '~~~' : (r2.west_door.status ? ' ' : '#') + r2.content + (r2.east_door.status ? ' ' : '#'))
      stry += (r3 === null ? '~~~' : (r3.west_door.status ? ' ' : '#') + r3.content + (r3.east_door.status ? ' ' : '#'))
      stry += '\n'

      stry += (r1 === null ? '~~~' : '#' + (r1.south_door.status ? ' ' : '#') + '#') 
      stry += (r2 === null ? '~~~' : '#' + (r2.south_door.status ? ' ' : '#') + '#') 
      stry += (r3 === null ? '~~~' : '#' + (r3.south_door.status ? ' ' : '#') + '#') 
      stry += '\n'

      stry += (r4 === null ? '~~~' : '#' + (r4.north_door.status ? ' ' : '#') + '#') 
      stry += (r5 === null ? '~~~' : '#' + (r5.north_door.status ? ' ' : '#') + '#') 
      stry += (r6 === null ? '~~~' : '#' + (r6.north_door.status ? ' ' : '#') + '#') 
      stry += '\n'

      stry += (r4 === null ? '~~~' : (r4.west_door.status ? ' ' : '#') + r4.content + (r4.east_door.status ? ' ' : '#'))
      stry += (r5 === null ? '~~~' : (r5.west_door.status ? ' ' : '#') + r5.content + (r5.east_door.status ? ' ' : '#'))
      stry += (r6 === null ? '~~~' : (r6.west_door.status ? ' ' : '#') + r6.content + (r6.east_door.status ? ' ' : '#'))
      stry += '\n'

      stry += (r4 === null ? '~~~' : '#' + (r4.south_door.status ? ' ' : '#') + '#') 
      stry += (r5 === null ? '~~~' : '#' + (r5.south_door.status ? ' ' : '#') + '#') 
      stry += (r6 === null ? '~~~' : '#' + (r6.south_door.status ? ' ' : '#') + '#') 
      stry += '\n'


      stry += (r7 === null ? '~~~' : '#' + (r7.north_door.status ? ' ' : '#') + '#') 
      stry += (r8 === null ? '~~~' : '#' + (r8.north_door.status ? ' ' : '#') + '#') 
      stry += (r9 === null ? '~~~' : '#' + (r9.north_door.status ? ' ' : '#') + '#') 
      stry += '\n'

      stry += (r7 === null ? '~~~' : (r7.west_door.status ? ' ' : '#') + r7.content + (r7.east_door.status ? ' ' : '#'))
      stry += (r8 === null ? '~~~' : (r8.west_door.status ? ' ' : '#') + r8.content + (r8.east_door.status ? ' ' : '#'))
      stry += (r9 === null ? '~~~' : (r9.west_door.status ? ' ' : '#') + r9.content + (r9.east_door.status ? ' ' : '#'))
      stry += '\n'

      stry += (r7 === null ? '~~~' : '#' + (r7.south_door.status ? ' ' : '#') + '#') 
      stry += (r8 === null ? '~~~' : '#' + (r8.south_door.status ? ' ' : '#') + '#') 
      stry += (r9 === null ? '~~~' : '#' + (r9.south_door.status ? ' ' : '#') + '#') 
      stry += '\n'


      let a = '--\n|**|\n--'

      const newText = a.split('\n').map(s => <>{s}<br/></>);
      setRoomsString(newText)

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