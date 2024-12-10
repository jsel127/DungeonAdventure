import { useState, useEffect } from 'react'

const UseVisionPotion = () => {

    const [adjacentRooms, setAdjacentRooms] = useState(null)

    const fetchAdjacentRooms = () => {
        fetch('/api/use-vision-potion')
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(data => {
            setAdjacentRooms(data)
            console.log(adjacentRooms)
          })
          .catch(error => console.error('UseVisionPotion: error fetchAdjacentRooms', error))
    }

    useEffect(() => {
        fetchAdjacentRooms()
    })

    return <>moo</>

}

export default UseVisionPotion