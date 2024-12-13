/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import fs from 'fs';

/**
 * View for console-based version of the game.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class GameDisplay {
    /**
     * Displays the game page which contains 
     * the authors, version and game name as ascii art.
     */
    static displayGamePage() {
        try {
            const gameNameArt = fs.readFileSync('console_based_game/view/ascii_art/dungeon_adventure_ascii_art.txt', 'utf8');
            console.log(gameNameArt);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Displays the rules of the game.
     * @param {string[]} rules the rules to display.
     */
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

    /**
     * Displays the difficulty options of the game.
     * @param {string[]} theDifficultyOptions the difficulty options.
     */
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

    /** 
     * Displays the hero types and stats offered in the game.
     * @param {object[]} theHeroOptions the hero options as an array of objects containing hero stats.
     */
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
    
    /**
     * Displays a breaker that says "current move".
     */
    static displayBreaker() {
        try {
            const heroPromptArt = fs.readFileSync('console_based_game/view/ascii_art/current_move_ascii_art.txt', 'utf8');
            console.log(heroPromptArt);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Displays the adventurer's stats
     * @param {object} theAdventurer an object representing the adventurer's stats.
     */
    static displayAdventureStats(theAdventurer) {
        const adventure = theAdventurer.hero.dungeon_character;
        console.log();
        console.log(adventure.name, " HP: ", adventure.hp, "DP-min:", adventure.dp_min, "DP-max:", adventure.dp_max);
        const items = theAdventurer.hero.inventory.items;
        console.log("Inventory [ Healing Potions: ", items.healing_potion, ", Vision Potions: ", items.vision_potion, 
                                ", Pillars: (Abstraction: ", items.pillars.abstraction, ", Encapsulation: ", items.pillars.encapsulation,
                                ", Inheritance", items.pillars.inheritance, ", Polymorphism: ", items.pillars.polymorphism, ")]");
    }

    /**
     * Displays the state of the room.
     * @param {object} theRoomInfo displays the rooms and its state (doors)
     */
    static displayRoom(theRoomInfo) {
        console.log("Row:", theRoomInfo.coordinate.row, "Col:", theRoomInfo.coordinate.col);
        console.log("*", (theRoomInfo.north_door.status) ? " " : "-", "*");
        console.log((theRoomInfo.west_door.status) ? " " : "|", theRoomInfo.content, (theRoomInfo.east_door.status) ? " " : "|");
        console.log("*", (theRoomInfo.south_door.status) ? " " : "-", "*");
    }

    /**
     * Displays the valid moves that can be made (north/east/south/west).
     * @param {object} theValidMoves the valid moves
     */
    static displayValidMoves(theValidMoves) {
        console.log("North: ", theValidMoves.north);
        console.log("East: ", theValidMoves.east);
        console.log("South: ", theValidMoves.south);
        console.log("West: ", theValidMoves.west);
    }

    /**
     * Displays the state of the adjacent rooms (doors + content). 
     * @param {object[][]} theAdjacentRooms the adjacent rooms to be displayed.
     */
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

    /**
     * Displays the basic info of the adventurer and opponent.
     * @param {object} theAdventurer the adventurer's info
     * @param {object} theOpponent the opponent's info
     */
    static displayFightProgress(theAdventurer, theOpponent) {
        const adventure = theAdventurer.hero.dungeon_character;
        console.log("YOU:", adventure.name);
        console.log("HP: ", adventure.hp, "DP-min:", adventure.dp_min, "DP-max:", adventure.dp_max);
        const opponent = theOpponent.dungeon_character;
        console.log("OPPONENT:", opponent.name);
        console.log("HP: ", opponent.hp, "DP-min:", opponent.dp_min, "DP-max:", opponent.dp_max);
    }

    /**
     * Displays an ascii art of 'You Won'.
     */
    static diplayWinMessage() {
        try {
            const wonArt = fs.readFileSync('console_based_game/view/ascii_art/won_ascii_art.txt', 'utf8');
            console.log(wonArt);
        } catch (err) {
            console.log("You Won");
        }
    }
    /**
     * Displays an ascii art of 'You Lost'.
     */
    static displayLoseMessage() {
        try {
            const lostArt = fs.readFileSync('console_based_game/view/ascii_art/lost_ascii_art.txt', 'utf8');
            console.log(lostArt);
        } catch (err) {
            console.log("You Lost");
        }
    }

    /**
     * Displays an ascii art of 'Exit Successful'.
     */
    static displayExitScreen() {
        try {
            const exitArt = fs.readFileSync('console_based_game/view/ascii_art/exited_ascii_art.txt', 'utf8');
            console.log(exitArt);
        } catch (err) {
            console.log("Exit successful");
        }
    }
}