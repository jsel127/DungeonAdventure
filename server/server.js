import express from "express"
import DungeonAdventure from "../DungeonAdventure.js"

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
    console.log('Server: hero created sucessfully')
})

app.get("/api/difficulty", (req, res) => {
    console.log("Server: request for /api/difficulty")
    res.json(model.getDifficulies())
})

app.listen(5001, () => { console.log("Server started on port 5001") }) 