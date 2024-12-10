import HeroFactory from "../../characters/HeroFactory.js";
import DungeonAdventure from "../../DungeonAdventure.js";
import GameDisplay from "../view/GameDisplay.js";
import readlineSync from 'readline-sync';
import fs from 'fs';
export default class PlayGame {
    #myDungeonAdventure;
    constructor() {
        this.startApplication();
        this.setUpGame();
        this.navigateGame();
    }

    startApplication() {
        GameDisplay.displayGamePage();
        readlineSync.question("Press enter to continue");
    }
    
    setUpGame() {
        if (fs.existsSync("serialized_game.txt")) {
            const startSaved = readlineSync.question("You have a saved game. Would you like to load? (y/n) ");
            if (this.#wasYesSelected(startSaved)) {
                this.#loadSavedGame();
                return;
            }
        }
        this.setGameSettings();
    }

    navigateGame() {
        let nextMove;
        while(!this.#myDungeonAdventure.hasWonGame() && !this.#myDungeonAdventure.isAdventurerDead() 
              && nextMove !== "save" && nextMove !== "exit") {
            GameDisplay.displayBreaker();
            GameDisplay.displayAdventureStats(JSON.parse(this.#myDungeonAdventure.getAdventurerInfo()));
            GameDisplay.displayRoom(JSON.parse(this.#myDungeonAdventure.getCurrentRoomInfo()));
            GameDisplay.displayValidMoves(this.#myDungeonAdventure.getValidMoves());
            nextMove = readlineSync.question("Enter a direction to move in. To use a healing potion type 'healing'. To use a vision potion type 'vision' If you would like to save the game enter 'Save.': ");
            nextMove = nextMove.toLowerCase();
            while(!this.validateProcessMoveResponse(nextMove)) {
                nextMove = readlineSync.question("Invalid response. Enter a direction to move in. If you would like to save the game enter 'Save.': ").toLowerCase();
            }
        }
        if (this.#myDungeonAdventure.isAdventurerDead()) {
            this.processAdventurerDeath();
        } else if (nextMove === "save") {
            console.log(this.#myDungeonAdventure.saveGameAsFile());
            GameDisplay.displayExitScreen();
        } else if (this.#myDungeonAdventure.hasWonGame()) {
            GameDisplay.diplayWinMessage();
            this.checkPlayAgain();
        } else {
            GameDisplay.displayExitScreen();
        }
    }

    validateProcessMoveResponse(theNextMove) {
        const validMoves = this.#myDungeonAdventure.getValidMoves();
        let validProcess = true;
        if ((theNextMove === "n" || theNextMove === "north") && validMoves.north) {
            console.log(this.#myDungeonAdventure.moveNorth());
            this.processIfNeedFight();
        } else if ((theNextMove === "e" || theNextMove === "east")&& validMoves.east) {
            console.log(this.#myDungeonAdventure.moveEast());
            this.processIfNeedFight();
        } else if ((theNextMove === "s" || theNextMove === "south") && validMoves.south) {
            console.log(this.#myDungeonAdventure.moveSouth());
            this.processIfNeedFight();
        } else if ((theNextMove === "w" || theNextMove === "west") && validMoves.west) {
            console.log(this.#myDungeonAdventure.moveWest());
            this.processIfNeedFight();
        } else if (theNextMove === "healing") {
            console.log(this.#myDungeonAdventure.useHealingPotion());
        } else if (theNextMove === "vision") {
            const result = this.#myDungeonAdventure.useVisionPotion();
            if (result === "You have no vision potions") {
                console.log(result);
            } else {
                GameDisplay.displayAdjacentRooms(JSON.parse(result));
            }
        } else if (theNextMove === "save") {
            validProcess = true;
        } else if (theNextMove === "exit") {
            
        } else if (theNextMove === "seventeen") {
            console.log(this.#myDungeonAdventure.viewDungeon());
        } else {
            validProcess = false;
        }
        return validProcess;
    }

    processAdventurerDeath() {
        GameDisplay.displayLoseMessage();
        this.checkPlayAgain();
    }

    checkPlayAgain() {
        let response = readlineSync.question("Would you like to play again? (y/n)? ");
        if (this.#wasYesSelected(response)) {
            this.setUpGame();
            this.navigateGame();
        } else {
            GameDisplay.displayExitScreen();
        }
    }
    
    processIfNeedFight() {
        if (this.#myDungeonAdventure.isAdventurerFighting()) {
            this.fightMonster();
        };
    }

    fightMonster() {
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

    #loadSavedGame() {
        const gameFileData = fs.readFileSync("serialized_game.txt");
        try {
            this.#myDungeonAdventure = DungeonAdventure.fromJSON(JSON.parse(gameFileData.toString().trim()))
        } catch(error) {
            let startNewGame = readlineSync.question("Load Unsuccessful. Would you like to start a new game? (y/n) ");
            if (this.#wasYesSelected(startNewGame)) {
                this.setGameSettings();
            }
        }
    }

    setGameSettings() {
        this.#myDungeonAdventure = new DungeonAdventure();
        this.#myDungeonAdventure.setDifficulty(this.getUserChosenDifficulty());
        this.#myDungeonAdventure.setAdventurer(this.getUserChosenHero(), this.getAdventureName());
        this.#myDungeonAdventure.startGame();
    }

    getUserChosenDifficulty() {
        const difficulties = DungeonAdventure.getDifficulties();
        GameDisplay.displayDifficultyOptions(difficulties);
        let difficulty = readlineSync.question("Enter your chosen difficulty: ");
        while (!difficulties.includes(difficulty)) {
            difficulty = readlineSync.question("Invalid difficulty entered. Please enter your chosen difficulty again: ");
        }
        return difficulty;
    }

    getUserChosenHero() {
        const heroes = DungeonAdventure.getHeroes();
        const validHeroes = HeroFactory.getHeroTypes();
        GameDisplay.displayHeroOptions(heroes);
        let hero = readlineSync.question("Enter your chosen hero name: ");
        while (!validHeroes.includes(hero)) {
            hero = readlineSync.question("Invalid difficulty entered. Please enter your chosen hero name again: ");
        }
        return hero;
    }

    getAdventureName() {
        return readlineSync.question("Enter a name for your character: ");
    }

    #wasYesSelected(theResponse) {
        return theResponse === 'y' || theResponse === 'Y' || theResponse === "yes" || theResponse === "Yes"
    }
}

const g = new PlayGame(); 