import express from "express"
import DungeonAdventure from "./DungeonAdventure.js"

const app = express()
const model = new DungeonAdventure()

app.use(express.json())

app.get("/api/characters", (req, res) => { 
    console.log("request to server /api/characters")
    res.json(model.getHeroes())
})  

app.post("/api/selected-character", (req, res) => {
    const selectedCharacter = req.body.character
    console.log("request to server /api/selected-character:", selectedCharacter.name)
    model.setAdventurer('name of hero', selectedCharacter.name)
})

app.listen(5001, () => { console.log("Server started on port 5001") }) 