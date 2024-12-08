import express from "express"
import cors from 'cors'
import DungeonAdventure from "../DungeonAdventure.js"

const app = express()
const model = new DungeonAdventure()    

// stores the character type selected on the CharacterSelection screen, 
// to be used in a call to the model once the character name is recieved. 
let selectedCharacter

app.use(express.json())      
app.use(cors())

app.get("/", (req, res) => {  
    res.send("Welcome to the Dungeon Adventure server!");     
}); 

app.get("/api/characters", (req, res) => { 
    console.log("Server: request to /api/characters") 
    res.json(DungeonAdventure.getHeroes())
})  

app.post("/api/selected-character", (req, res) => {  
    selectedCharacter = req.body.character
    console.log("Server: request to /api/selected-character:", selectedCharacter.name)
})

app.post("/api/selected-name", (req, res) => { 
    console.log('Server: post request to /api/selected-name', req.body.heroName)
    model.setAdventurer(selectedCharacter.name, req.body.heroName) 
})

app.get("/api/difficulties", (req, res) => {
    console.log("Server: request to /api/difficulties")  
    res.json(DungeonAdventure.getDifficulties())
})   

app.post("/api/selected-difficulty", (req, res) => {
    console.log('Server: recieved selected difficulty from react:', req.body.difficulty)
    model.setDifficulty(req.body.difficulty) 
    model.startGame() 
})

app.get("/api/valid-moves", (req, res) => {   
    console.log('Server: request to /api/valid-moves', model.getValidMoves())
    res.set('Cache-Control', 'no-store'); 
    res.json(model.getValidMoves())    
})
 
app.post("/api/move-north", (req, res) => {
    console.log('Server: post request to /api/move-north')        
    model.moveNorth()
})

app.post("/api/move-east", (req, res) => {
    console.log('Server: post request to /api/move-east')
    model.moveEast()
})

app.post("/api/move-south", (req, res) => {
    console.log('Server: post request to /api/move-south')
    model.moveSouth()
})

app.post("/api/move-west", (req, res) => {
    console.log('Server: post request to /api/move-west')
    model.moveWest()
})

/*
app.post("/api/move-direction", (req, res) => {
    console.log('Server: request to /api/move-direction')
    switch(req.body.dir) { 
        case 'North':
            model.moveNorth()
            break
        case 'East':
            model.moveEast()
            break
        case 'South':
            model.moveSouth()     
            break 
        case 'West':  
            model.moveWest()   
            break  
        default:
            throw new Error('ERROR Server: direction must be North, East, South, West')
    }
    console.log(model.getDungeon().toString())
})
    */

app.listen(5001, () => { console.log("Server started on port 5001") }) 