/**
 * Express router providing routes for communication between model and view.  
 */

import express from "express"
import cors from "cors"
import DungeonAdventure from "../DungeonAdventure.js"    

/** sets up an express app */
const app = express()
/** instance of DungeonAdventure that the server will interact with */
let model = new DungeonAdventure()       
 
/**
 * Stores the character type selected on the CharacterSelection screen, 
 * to be used in a call to the model once the character name is recieved. 
 */
let selectedCharacter  

app.use(express.json())  
app.use(cors()) 

/**
 * Root path on server.
 * @name get/
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/", (req, res) => {    
    console.log('Server: get request /')
    res.send("Welcome to the Dungeon Adventure server!");       
}); 

/**
 * Route handling game saving.
 * @name get/api/save-game
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get('/api/save-game', (req, res) => {
    console.log('Server: get request /api/save-game')              
    res.json(JSON.stringify(model))  
})
  
/**
 * Route handling game loading.
 * @name post/api/load-game
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/load-game", (req, res) => {
    console.log('Server: post request /api/load-game', req.body.loadModel)                
    model = DungeonAdventure.fromJSON(JSON.parse(req.body.loadModel))
    res.send('success')
})  
   
/**
 * Route for retrieving character type data from model.
 * @name get/api/characters
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/characters", (req, res) => { 
    console.log("Server: request to /api/characters")                 
    res.json(DungeonAdventure.getHeroes())
})  

/**
 * Route for transfering user-selected character to model. 
 * @name post/api/selected-character
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/selected-character", (req, res) => {     
    selectedCharacter = req.body.character
    console.log("Server: request to /api/selected-character:", selectedCharacter.name)
})

/**
 * Route for transfering user-selected name to model. 
 * @name post/api/selected-name
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/selected-name", (req, res) => { 
    console.log('Server: post request to /api/selected-name', req.body.heroName)  
    model.setAdventurer(selectedCharacter.name, req.body.heroName) 
}) 

/**
 * Route for retrieving difficulty levels from model.
 * @name get/api/difficulties
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/difficulties", (req, res) => {
    console.log("Server: request to /api/difficulties")           
    res.json(DungeonAdventure.getDifficulties())   
})   

/**
 * Route for transfering user-selected difficulty to model. 
 * @name post/api/selected-difficulty
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/selected-difficulty", (req, res) => { 
    console.log('Server: recieved selected difficulty from react:', req.body.difficulty) 
    model.setDifficulty(req.body.difficulty) 
    model.startGame() 
})

/**
 * Route for fetching valid moves in the current room. 
 * @name get/api/valid-moves
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/valid-moves", (req, res) => {    
    console.log('Server: request to /api/valid-moves', model.getValidMoves())
    res.json(model.getValidMoves())    
})
 
/**
 * Route handling a move north input. 
 * @name post/api/move-north
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/move-north", (req, res) => {
    console.log('Server: post request to /api/move-north')         
    const message = model.moveNorth()
    res.json(message) 
})

/**
 * Route handling a move east input. 
 * @name post/api/move-east
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/move-east", (req, res) => {
    console.log('Server: post request to /api/move-east')  
    const message = model.moveEast()  
    res.json(message)
})

/**
 * Route handling a move south input. 
 * @name post/api/move-south
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/move-south", (req, res) => { 
    console.log('Server: post request to /api/move-south')   
    const message = model.moveSouth()
    res.json(message)
})

/**
 * Route handling a move west input. 
 * @name post/api/move-west
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.post("/api/move-west", (req, res) => {
    console.log('Server: post request to /api/move-west') 
    const message = model.moveWest()  
    res.json(message)
})

/**
 * Route handling a move input for any direction. 
 * @name post/api/move-direction
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
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

/**
 * Route serving dungeon map from model to view. 
 * @name get/api/dungeon-map
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/dungeon-map", (req, res) => { 
    console.log('Server: get request to /api/dungeon-map')
    res.json(model.viewDungeon())
})

/**
 * Route serving player inventory from model to view. 
 * @name get/api/inventory
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/inventory", (req, res) => { 
    console.log('Server: get request to /api/inventory')       
    const adventurer = JSON.parse(model.getAdventurerInfo())
    console.log('Server: adventurer', adventurer)
    console.log('Server: ADVENTURER.INVENTORY', adventurer.inventory)
    res.json(adventurer.hero.inventory)  
})

/**
 * Route serving adventurer fighting status from model to view. 
 * @name get/api/fighting-status
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/fighting-status", (req, res) => {
    console.log('Server: get request to /api/fighting-status')
    res.json(model.isAdventurerFighting()) 
})

/**
 * Route serving adventurer data from model to view. 
 * @name get/api/adventurer
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/adventurer", (req, res) => {
    console.log('Server: get request to /api/adventurer')
    res.json(JSON.parse(model.getAdventurerInfo()))
})

/**
 * Route serving opponent data from model to view. 
 * @name get/api/opponent
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/opponent", (req, res) => {
    console.log('Server: get request to /api/opponent')
    res.json(JSON.parse(model.getOpponentInfo()))    
})

/**
 * Route handling an attack input.
 * @name get/api/attack
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/attack", (req, res) => {
    console.log('Server: get request /api/attack')        
    model.attackOpponent() 
    res.json({ fightingStatus:model.isAdventurerFighting(), adventurerDead:model.isAdventurerDead() })   
})

/**
 * Route handling a special attack input.
 * @name get/api/special-attack
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/special-attack", (req, res) => {  
    console.log('Server: get request /api/special-attack')              
    model.specialAttackOpponent()
    res.json({ fightingStatus:model.isAdventurerFighting(), adventurerDead:model.isAdventurerDead() })        
})

/**
 * Route retrieving game win status.
 * @name get/api/has-won-game
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/has-won-game", (req, res) => {
    console.log('Server: get request /api/has-won-game')      
    res.json(model.hasWonGame())   
})

/**
 * Route that handles using a healing potion. 
 * @name get/api/use-healing-potion
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/use-healing-potion", (req, res) => { 
    console.log('Server: get request /api/use-healing-potion')                                           
    res.json(model.useHealingPotion())
})

/**
 * Route that handles using a vision potion. 
 * @name get/api/use-vision-potion
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/use-vision-potion", (req, res) => {
    console.log('Server: get request /api/use-vision-potion')         
    res.json(model.useVisionPotion())
})

/**
 * Route that retrives the coordinates of the current room from the model. 
 * @name get/api/coordinates
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/coordinates", (req, res) => {
    console.log('Server: get request /api/room-info')      
    const room = JSON.parse(model.getCurrentRoomInfo()) 
    res.json(room.coordinate) 
})

/**
 * Route for retrieving hero death status from model. 
 * @name get/api/is-hero-dead
 * @param {string} path - Express path on server
 * @param {callback} middleware - Express middleware for handling request and response
 */
app.get("/api/is-hero-dead", (req, res) => {
    console.log('Server: get request /api/is-hero-dead')
    res.json(model.isAdventurerDead())
})
     
/**
 * Starts server on localhost port 5001. 
 */
app.listen(5001, () => { console.log("Server started on port 5001") })                    