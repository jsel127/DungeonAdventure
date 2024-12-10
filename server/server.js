import express from "express"
import cors from "cors"
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
    //res.set('Cache-Control', 'no-store');     

    res.json(model.getValidMoves())    
})
 
app.post("/api/move-north", (req, res) => {
    console.log('Server: post request to /api/move-north')         
    const message = model.moveNorth()
    res.json(message) 
})

app.post("/api/move-east", (req, res) => {
    console.log('Server: post request to /api/move-east')  
    const message = model.moveEast()  
    res.json(message)
})

app.post("/api/move-south", (req, res) => { 
    console.log('Server: post request to /api/move-south')   
    const message = model.moveSouth()
    res.json(message)
})

app.post("/api/move-west", (req, res) => {
    console.log('Server: post request to /api/move-west') 
    const message = model.moveWest()  
    res.json(message)
})

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
    //console.log(model.getDungeon().toString())
})

app.get("/api/dungeon-map", (req, res) => { 
    console.log('Server: get request to /api/dungeon-map')
    res.json(model.viewDungeon())
})

app.get("/api/inventory", (req, res) => { 
    console.log('Server: get request to /api/inventory')       
    const adventurer = model.toJSON().adventurer
    res.json(adventurer.getInventory()) 
})

app.get("/api/fighting-status", (req, res) => {
    console.log('Server: get request to /api/fighting-status')
    res.json(model.isAdventurerFighting()) 
})

app.get("/api/adventurer", (req, res) => {
    console.log('Server: get request to /api/adventurer')
    res.json(JSON.parse(model.getAdventurerInfo()))
})

app.get("/api/opponent", (req, res) => {
    console.log('Server: get request to /api/opponent')
    res.json(JSON.parse(model.getOpponentInfo()))    
})

app.get("/api/attack", (req, res) => {
    console.log('Server: get request /api/attack')        
    model.attackOpponent() 
    res.json({ win:model.isOpponentDead(), lose:model.isAdventurerDead() })   
})

app.get("/api/special-attack", (req, res) => {  
    console.log('Server: get request /api/special-attack')         
    model.specialAttackOpponent()
    res.json({ win:model.isOpponentDead(), lose:model.isAdventurerDead() })        
})

app.get("/api/has-won-game", (req, res) => {
    console.log('Server: get request /api/has-won-game')     
    res.json(model.hasWonGame())   
})

app.get("/api/use-healing-potion", (req, res) => {
    console.log('Server: get request /api/use-healing-potion')       
    res.json(model.useHealingPotion())
})

app.get("/api/use-vision-potion", (req, res) => {
    console.log('Server: get request /api/use-vision-potion')        
    res.json(model.useVisionPotion())
})

app.get("/api/coordinates", (req, res) => {
    console.log('Server: get request /api/room-info')
    const room = JSON.parse(model.getCurrentRoomInfo()) 
    res.json(room.coordinate) 
})
     
app.listen(5001, () => { console.log("Server started on port 5001") })             