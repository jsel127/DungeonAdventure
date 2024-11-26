import express from "express";
import DungeonAdventure from "../DungeonAdventure.js";

const app = express();

const model = new DungeonAdventure()

app.get("/select-character", (req, res) => { 
    console.log("request to server")
    model.setAdventurer("Jacob", "Warrior")
    model.getAdventurer()
    res.json({"characters": ["Warrior", "Priestess", "Thief"]})   
})  

app.listen(5001, () => { console.log("Server started on port 5001") }) 