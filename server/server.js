import express from "express";
import DungeonAdventure from "../DungeonAdventure.js";

const app = express();

app.get("/select-character", (req, res) => { 
    console.log("request to server")
    DungeonAdventure.setAdventurer("Jacob", "Warrior")
    DungeonAdventure.getAdventurer()
    res.json({"characters": ["Warrior", "Priestess", "Thief"]})   
})  

app.listen(5001, () => { console.log("Server started on port 5001") }) 