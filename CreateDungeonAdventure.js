import fs from "fs";
import DungeonAdventure from "./DungeonAdventure.js";

const d = new DungeonAdventure();
d.setDifficulty("Easy");
d.setAdventurer("Warrior", "Jasmine");
d.startGame();
d.viewDungeon();
fs.writeFile("./easyDA.txt", JSON.stringify(d), err => {
    if (err) {
        console.error(err);
    }
});