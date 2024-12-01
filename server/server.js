import express from "express";
import DungeonAdventure from "../DungeonAdventure.js";

const app = express();
const model = new DungeonAdventure()

app.get("/api/characters", (req, res) => { 
    console.log("request to server /api/characters")
    res.json(model.getHeroes())
})  

app.listen(5001, () => { console.log("Server started on port 5001") }) 