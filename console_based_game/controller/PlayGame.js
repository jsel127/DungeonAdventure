/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import HeroFactory from "../../characters/HeroFactory.js";
import DungeonAdventure from "../../DungeonAdventure.js";
import GameDisplay from "../view/GameDisplay.js";
import readlineSync from 'readline-sync';
import fs from 'fs';
/**
 * Controller for console-based version of the game.
 * 
 * Sources:
 * https://medium.com/@cameronsanders88/basics-of-node-js-with-npm-readline-sync-c46406a3295f 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class PlayGame {
    /** 
     * Instance of the main class in the model which holds
     * all necessary gameplay logic.
     */
    #myDungeonAdventure;
    /**
     * Starts up the application and sets up the game (starts new or loads saved).
     * Then begins the game.
     */
    constructor() {
        this.#startApplication();
        this.#setUpGame();
        this.#navigateGame();
    }

    /**
     * Starts the application by displaying a home page then 
     * prompting the user to press enter to continue onto the game.
     */
    #startApplication() {
        GameDisplay.displayGamePage();
        readlineSync.question("Press enter to continue");
    }
    
    /**
     * If there is a saved game, prompts the user if they would 
     * like to load the game. Otherwise will set up the game settings.
     */
    #setUpGame() {
        if (fs.existsSync("serialized_game.txt")) {
            const startSaved = readlineSync.question("You have a saved game. Would you like to load? (y/n) ");
            if (this.#wasYesSelected(startSaved)) {
                this.#loadSavedGame();
                return;
            }
        }
        this.#setGameSettings();
    }

    /**
     * Navigates the game prompting users for their next move.
     * Will show valid moves, adventurer's stats, and the current room.
     */
    #navigateGame() {
        let nextMove;
        while(!this.#myDungeonAdventure.hasWonGame() && !this.#myDungeonAdventure.isAdventurerDead() 
              && nextMove !== "save" && nextMove !== "exit") {
            GameDisplay.displayBreaker();
            GameDisplay.displayAdventureStats(JSON.parse(this.#myDungeonAdventure.getAdventurerInfo()));
            GameDisplay.displayRoom(JSON.parse(this.#myDungeonAdventure.getCurrentRoomInfo()));
            GameDisplay.displayValidMoves(this.#myDungeonAdventure.getValidMoves());
            nextMove = readlineSync.question("Enter a direction to move in. To use a healing potion type 'healing'. To use a vision potion type 'vision' If you would like to save the game enter 'Save.': ");
            nextMove = nextMove.toLowerCase();
            while(!this.#validateProcessMoveResponse(nextMove)) {
                nextMove = readlineSync.question("Invalid response. Enter a direction to move in. If you would like to save the game enter 'Save.': ").toLowerCase();
            }
        }
        if (this.#myDungeonAdventure.isAdventurerDead()) {
            this.#processAdventurerDeath();
        } else if (nextMove === "save") {
            console.log(this.#myDungeonAdventure.saveGameAsFile());
            GameDisplay.displayExitScreen();
        } else if (this.#myDungeonAdventure.hasWonGame()) {
            GameDisplay.diplayWinMessage();
            this.#checkPlayAgain();
        } else {
            GameDisplay.displayExitScreen();
        }
    }

    /**
     * Checks if the given next move is a valid move (door is open)
     * Will process move if valid and prompt fighting if a monster
     * was encountered.
     * @param {string} theNextMove the direction the user want to move in.
     * @returns true if the move was valid and false otherwise.
     */
    #validateProcessMoveResponse(theNextMove) {
        const validMoves = this.#myDungeonAdventure.getValidMoves();
        let validProcess = true;
        if ((theNextMove === "n" || theNextMove === "north") && validMoves.north) {
            console.log(this.#myDungeonAdventure.moveNorth());
            this.#processIfNeedFight();
        } else if ((theNextMove === "e" || theNextMove === "east")&& validMoves.east) {
            console.log(this.#myDungeonAdventure.moveEast());
            this.#processIfNeedFight();
        } else if ((theNextMove === "s" || theNextMove === "south") && validMoves.south) {
            console.log(this.#myDungeonAdventure.moveSouth());
            this.#processIfNeedFight();
        } else if ((theNextMove === "w" || theNextMove === "west") && validMoves.west) {
            console.log(this.#myDungeonAdventure.moveWest());
            this.#processIfNeedFight();
        } else if (theNextMove === "healing") {
            console.log(this.#myDungeonAdventure.useHealingPotion());
        } else if (theNextMove === "vision") {
            const result = this.#myDungeonAdventure.useVisionPotion();
            if (result === "You have no vision potions") {
                console.log(result);
            } else {
                GameDisplay.displayAdjacentRooms(JSON.parse(result));
            }
        } else if (theNextMove === "save" || theNextMove === "exit") {
            validProcess = true;
        } else if (theNextMove === "seventeen") {
            console.log(this.#myDungeonAdventure.viewDungeon());
        } else {
            validProcess = false;
        }
        return validProcess;
    }

    /**
     * Displays the losing message and prompts the 
     * user if they would like to play again.
     */
    #processAdventurerDeath() {
        GameDisplay.displayLoseMessage();
        this.#checkPlayAgain();
    }

    /**
     * Checks if the user want to play again and 
     * starts the set up game if yes is chosen.
     * Else the program will end.
     */
    #checkPlayAgain() {
        let response = readlineSync.question("Would you like to play again? (y/n)? ");
        if (this.#wasYesSelected(response)) {
            this.#setUpGame();
            this.#navigateGame();
        } else {
            GameDisplay.displayExitScreen();
        }
    }
    
    /**
     * Checks if the adventurer is fighting.
     * If they are the fightMonster is prompted.
     */
    #processIfNeedFight() {
        if (this.#myDungeonAdventure.isAdventurerFighting()) {
            this.#fightMonster();
        };
    }

    /**
     * Displays the fighting progressions and prompts 
     * user if they would like to attack or special attack.
     */
    #fightMonster() {
        while(this.#myDungeonAdventure.isAdventurerFighting()) {
            GameDisplay.displayFightProgress(JSON.parse(this.#myDungeonAdventure.getAdventurerInfo()), 
                                             JSON.parse(this.#myDungeonAdventure.getOpponentInfo()));
            let fightingMove = readlineSync.question("Attack or Special Attack?").toLowerCase();
            let validResponse;
            do {
                validResponse = true;
                if (fightingMove === "attack" || fightingMove === "a") {
                    this.#myDungeonAdventure.attackOpponent();
                } else if (fightingMove === "special attack" || fightingMove === "s") {
                    this.#myDungeonAdventure.specialAttackOpponent();
                } else {
                    validResponse = false;
                    fightingMove = readlineSync.question("Invalid fighting move. Attack or Special Attack?").toLowerCase();
                }
            } while (!validResponse);
        }
        if (!this.#myDungeonAdventure.isAdventurerDead()) {
            console.log("You won the fight!");
        }
    }

    /**
     * Loads a saved game.
     */
    #loadSavedGame() {
        const gameFileData = fs.readFileSync("serialized_game.txt");
        try {
            this.#myDungeonAdventure = DungeonAdventure.fromJSON(JSON.parse(gameFileData.toString().trim()))
        } catch(error) {
            let startNewGame = readlineSync.question("Load Unsuccessful. Would you like to start a new game? (y/n) ");
            if (this.#wasYesSelected(startNewGame)) {
                this.#setGameSettings();
            }
        }
    }

    /**
     * Sets the diffculty of the game and the adventurer then starts the game.
     */
    #setGameSettings() {
        this.#myDungeonAdventure = new DungeonAdventure();
        this.#myDungeonAdventure.setDifficulty(this.#getUserChosenDifficulty());
        this.#myDungeonAdventure.setAdventurer(this.#getUserChosenHero(), this.#getAdventureName());
        this.#myDungeonAdventure.startGame();
    }

    /**
     * Prompts the user to choose a difficulty for the game.
     * @returns the difficulty chosen.
     */
    #getUserChosenDifficulty() {
        const difficulties = DungeonAdventure.getDifficulties();
        GameDisplay.displayDifficultyOptions(difficulties);
        let difficulty = readlineSync.question("Enter your chosen difficulty: ");
        while (!difficulties.includes(difficulty)) {
            difficulty = readlineSync.question("Invalid difficulty entered. Please enter your chosen difficulty again: ");
        }
        return difficulty;
    }

    /**
     * Gets the chosen hero type for the adventurer.
     * @returns a string representing the hero type the user chose.
     */
    #getUserChosenHero() {
        const heroes = DungeonAdventure.getHeroes();
        const validHeroes = HeroFactory.getHeroTypes();
        GameDisplay.displayHeroOptions(heroes);
        let hero = readlineSync.question("Enter your chosen hero name: ");
        while (!validHeroes.includes(hero)) {
            hero = readlineSync.question("Invalid difficulty entered. Please enter your chosen hero name again: ");
        }
        return hero;
    }

    /**
     * Gets the name for the adventurer.
     * @returns Gets the adventurer's name.
     */
    #getAdventureName() {
        return readlineSync.question("Enter a name for your character: ");
    }

    /**
     * Helper method which checks if the response if any version of yes (y/Y/Yes/yes).
     * @param {string} theResponse the response given to any prompt.
     * @returns 
     */
    #wasYesSelected(theResponse) {
        return theResponse === 'y' || theResponse === 'Y' || theResponse === "yes" || theResponse === "Yes"
    }
}

const g = new PlayGame(); 