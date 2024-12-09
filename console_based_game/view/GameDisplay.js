import fs from 'fs';

export default class GameDisplay {
    static displayGamePage() {
        try {
            const gameNameArt = fs.readFileSync('console_based_game/view/ascii_art/dungeon_adventure_ascii_art.txt', 'utf8');
            console.log(gameNameArt);
        } catch (err) {
            console.error(err);
        }
    }
    static displayRules(rules) {
        try {
            const rulesArt = fs.readFileSync('console_based_game/view/ascii_art/rules_ascii_art.txt', 'utf8');
            console.log(rulesArt, "\n");
        } catch (err) {
            console.log("Rules\n");
        }
        for (let row = 0; row < rules.length; row++) {
            console.log("*", rules[row]);
        }
    }

    static displayDifficultyOptions(theDifficultyOptions) {
        try {
            const difficultyPromptArt = fs.readFileSync('console_based_game/view/ascii_art/difficulty_prompt_ascii_art.txt', 'utf8');
            console.log(difficultyPromptArt);
        } catch (err) {
            console.log("Choose your difficulty: \n");
        }
        for (let dif = 0; dif < theDifficultyOptions.length; dif++) {
            console.log("*", theDifficultyOptions[dif]);
        }
    }

    static displayHeroOptions(theHeroOptions) {
        try {
            const heroPromptArt = fs.readFileSync('console_based_game/view/ascii_art/hero_prompt_ascii_art.txt', 'utf8');
            console.log(heroPromptArt);
        } catch (err) {
            console.log("Choose your Hero: \n");
        }
        for (let hero = 0; hero < theHeroOptions.length; hero++) {
            console.table(theHeroOptions[hero]);
        }
    }
    
    static displayBreaker() {
        try {
            const heroPromptArt = fs.readFileSync('console_based_game/view/ascii_art/current_move_ascii_art.txt', 'utf8');
            console.log(heroPromptArt);
        } catch (err) {
            console.error(err);
        }
    }

    static displayAdventureStats(theAdventurer) {
        const adventure = theAdventurer.hero.dungeon_character;
        console.log();
        console.log(adventure.name, " HP: ", adventure.hp, "DP-min:", adventure.dp_min, "DP-max:", adventure.dp_max);
        const items = theAdventurer.hero.inventory.items;
        console.log("Inventory [ Healing Potions: ", items.healing_potion, ", Vision Potions: ", items.vision_potion, 
                                ", Pillars: (Abstraction: ", items.pillars.abstraction, ", Encapsulation: ", items.pillars.encapsulation,
                                ", Inheritance", items.pillars.inheritance, ", Polymorphism: ", items.pillars.polymorphism, ")]");
    }

    static displayRoom(theRoomInfo) {
        console.log("Row:", theRoomInfo.coordinate.row, "Col:", theRoomInfo.coordinate.col);
        console.log("*", (theRoomInfo.north_door.status) ? " " : "-", "*");
        console.log((theRoomInfo.west_door.status) ? " " : "|", theRoomInfo.content, (theRoomInfo.east_door.status) ? " " : "|");
        console.log("*", (theRoomInfo.south_door.status) ? " " : "-", "*");
    }

    static displayValidMoves(theValidMoves) {
        console.log("North: ", theValidMoves.north);
        console.log("East: ", theValidMoves.east);
        console.log("South: ", theValidMoves.south);
        console.log("West: ", theValidMoves.west);
    }

    static displayAdjacentRooms(theAdjacentRooms) {
        for (let row = 0; row < theAdjacentRooms.length; row++) {
            let str = theAdjacentRooms[row][0] === null ? "  " : "* ";
            for (let col = 0; col < theAdjacentRooms[row].length; col++) {
                str += theAdjacentRooms[row][col] === null ? "  ": (theAdjacentRooms[row][col].north_door.status ? "  * " : "- * ");
            }
            console.log(str);
            str = (theAdjacentRooms[row][0] === null || theAdjacentRooms[row][0].west_door.status) ? "  " : "| ";
            for (let col = 0; col < theAdjacentRooms[row].length; col++) {
                str += theAdjacentRooms[row][col] === null ? "   " : (theAdjacentRooms[row][col].content + (theAdjacentRooms[row][col].east_door.status ? "   " : " | "));
            }
            console.log(str);
        }
        let bottomStr = theAdjacentRooms[2][0] === null ? "  " : "* ";
        for(let col = 0; col < theAdjacentRooms.length; col++) {
            bottomStr += theAdjacentRooms[2][col] === null? "  ": (theAdjacentRooms[2][col].south_door.status ? "  * " : "- * ");
        }
        console.log(bottomStr);
    }

    static displayFightProgress(theAdventurer, theOpponent) {
        const adventure = theAdventurer.hero.dungeon_character;
        console.log("YOU:", adventure.name);
        console.log("HP: ", adventure.hp, "DP-min:", adventure.dp_min, "DP-max:", adventure.dp_max);
        const opponent = theOpponent.dungeon_character;
        console.log("OPPONENT:", opponent.name);
        console.log("HP: ", opponent.hp, "DP-min:", opponent.dp_min, "DP-max:", opponent.dp_max);
    }

    static diplayWinMessage() {
        try {
            const wonArt = fs.readFileSync('console_based_game/view/ascii_art/won_ascii_art.txt', 'utf8');
            console.log(wonArt);
        } catch (err) {
            console.log("You Won");
        }
    }

    static displayLoseMessage() {
        try {
            const lostArt = fs.readFileSync('console_based_game/view/ascii_art/lost_ascii_art.txt', 'utf8');
            console.log(lostArt);
        } catch (err) {
            console.log("You Lost");
        }
    }


    static displayExitScreen() {
        try {
            const exitArt = fs.readFileSync('console_based_game/view/ascii_art/exited_ascii_art.txt', 'utf8');
            console.log(exitArt);
        } catch (err) {
            console.log("Exit successful");
        }
    }
}