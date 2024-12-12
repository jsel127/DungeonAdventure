/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "./characters/Hero.js";
import HeroFactory from "./characters/HeroFactory.js";
import Dungeon from "./dungeon/Dungeon.js";
import Coordinate from "./dungeon/Coordinate.js";
import Monster from "./characters/Monster.js";
import fs from 'fs';

/**
 * Test DungeonAdventure class which holds the main logic of the game
 * play (fighting, dungeon creations, picking adventurer, updating state etc.).
 * 
 * source: https://stackoverflow.com/questions/20572016/javascript-string-concatenation-behavior-with-null-or-undefined-values 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class DungeonAdventure {
    /** The max damage that can be sustained from falling into a pit. */
    static #PIT_MAX_DAMAGE = 10;
    /** The dungeon associated to the game. Holds all rooms */
    #myDungeon
    /** The adventurer which is a specific hero chosen for this game. */
    #myAdventurer
    /** The current room in which the player is in. */
    #myCurrentRoom
    /** The difficulty of the game. */
    #myDifficulty
    /** The current opponent if any (null if none). */
    #myCurrentOpponent
    /** 
     * The status of if the game has been started or not. 
     * This is used to check if other methods can be called. 
     */
    #myStarted;
    
    /**
     * DungeonAdventure class which holds main methods to 
     * maintain, manipulate, and store information related to the game
     * such as moving, updating play's stats and inventory, and
     * setting up fights. 
     * @param {boolean} theLoading true if loading a game, false otherwise.
     * @param {Dungeon} theDungeon the dungeon to load if any.
     * @param {Hero} theAdventurer the hero to load if any.
     * @param {Coordinate} theCurrentRoomCoordinate the current room's coordinate if any.
     * @param {number} theDifficulty the difficulty of the game if any.
     * @param {Monster} theCurrentOpponent the current opponent if any.
     * @throws {RangeError} the difficulty is not withing the valid range (easy < x < hard)
     * @throws {TypeError} if the difficulty is not a number or theDungeon is not a dungeon,
     * or theAdventurer is not a hero, theCurrentRoomCoordinate is not a coordinate, 
     * theCurrentOpponent is null or not a Monster.
     */
    constructor(theLoading = false, theDungeon = null, theAdventurer = null, 
                theCurrentRoomCoordinate = null, theDifficulty = null, theCurrentOpponent = null) {
        if (theLoading) {
            if (!Number.isInteger(theDifficulty)) {
                throw new TypeError("The difficulty must be an integer.");
            }
            if (theDifficulty < Dungeon.DIFFICULTY.Easy || theDifficulty > Dungeon.DIFFICULTY.Hard) {
                throw new RangeError("The difficulty must be between easy and hard.");
            }
            if (!((theDungeon instanceof Dungeon) && (theAdventurer instanceof Hero)
                && (theCurrentRoomCoordinate instanceof Coordinate )
                && ((theCurrentOpponent === null) || (theCurrentOpponent instanceof Monster)))) {
                throw new TypeError("Invalid data was passed when loading. Actual types do not match expected ones.");
            }
            this.#myDungeon = theDungeon;
            this.#myAdventurer = theAdventurer;
            this.#myCurrentRoom = theDungeon.getRoom(theCurrentRoomCoordinate);
            this.#myDifficulty = theDifficulty;
            this.#myCurrentOpponent = theCurrentOpponent;
            this.#myStarted = true;
        } else {
            this.#myDungeon = null;
            this.#myAdventurer = null;
            this.#myCurrentRoom = null;
            this.#myDifficulty = Dungeon.DIFFICULTY.Easy;
            this.#myCurrentOpponent = null;
            this.#myStarted = false;
        }
    }
    /**
     * Creates a DungeonAdventure instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a DungeonAdventure object loaded with the given data.
     * @throws {TypeError} If the __type property is not DungeonAdventure.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== DungeonAdventure.name) {
            throw new TypeError("The JSON is not a dungeon adventure type");
        }
        const opponent = (theJSON.opponent === "null") ? Monster.fromJSON(theJSON.opponent) : null
        return new DungeonAdventure(true, Dungeon.fromJSON(theJSON.dungeon), 
                                    HeroFactory.loadHero(theJSON.adventurer),
                                    Coordinate.fromJSON(theJSON.current_room_coordinate),
                                    theJSON.difficulty,
                                    opponent);
    }

    /**
     * Creates a list of the valid hero types the game allows users to make.
     * @returns an array of objects with the differen the heros types and their stats.
     */
    static getHeroes() {
        const heroes = [HeroFactory.getWarriorData(), 
                       HeroFactory.getPriestessData(), 
                       HeroFactory.getThiefData()];
        return heroes;
    }

    /**
     * Gets the valid difficulties to set the dungeon.
     * @returns An array of strings representing available difficulties.
     */
    static getDifficulties() {
        return Object.keys(Dungeon.DIFFICULTY);
    }


    /**
     * Returns a JSON representation of the DungeonAdventure object. 
     * @returns a JSON representation of the DungeonAdventure object.
     */
    toJSON() {
        return {
            __type: DungeonAdventure.name,
            dungeon: this.#myDungeon,
            adventurer: this.#myAdventurer,
            current_room_coordinate: this.#myCurrentRoom.getCoordinate(),
            difficulty: this.#myDifficulty,
            opponent: this.#myCurrentOpponent
        }
    }

    /**
     * Returns a description of the objective of the game.
     * @returns a description of the game.
     */
    getGameDescription() {
        return "Welcome to the Dungeon Adventure Game. There are three major heroes in the worlds of Dungeon Adventure, the Warrior, the Priestess, and the Thief. Your goal is to find the missing pillars of OOP which are currently somewhere in the dungeon. Once you find all pillars find the exit to save the world of OOP."
    }

    /**
     * Takes a string representing the difficulty and matches it with a corresponding set
     * integer in the Dungeon then sets this to the difficulty of the dungeonAdventure game.
     * @param {string} theDifficulty a string representing the difficulty to set to.
     * @throws {TypeError} if the difficulty is not a valid value.
     */
    setDifficulty(theDifficulty) {
        const difficulty = Dungeon.DIFFICULTY[theDifficulty];
        if (difficulty === undefined) {
            throw new TypeError("The given difficulty was invalid");
        }
        this.#myDifficulty = difficulty;
    }

    /**
     * Creates and sets the adventurer to the proper field in the DungeonAdventure.
     * @param {string} theHeroType a string of the hero type.
     * @param {string} theName a string of the name of the adventurer.
     * @throws {TypeError} if the name is not a string or the hero type is not valid.
     */
    setAdventurer(theHeroType, theName) {
        if (typeof theName !== "string") {
            throw new TypeError("Invalid name provided");
        }
        if (!HeroFactory.getHeroTypes().includes(theHeroType)) {
            throw new TypeError("Invalid Hero Type provided");
        }
        this.#myAdventurer = HeroFactory.createHero(theHeroType, theName);
    }

    /**
     * Starts the game by creating the dungeon with the appropriate difficuly. 
     */
    startGame() {
        this.#myDungeon = new Dungeon(this.#myDifficulty);
        this.#myCurrentRoom = this.#myDungeon.getEntrance();    
        this.#myStarted = true;
    }

    /**
     * Returns an object representing the valid moves the adventurer
     * can make in the current room they are in.
     * @returns returns an object of the different directions with boolean values
     * true meaning the door is open and false meaning it isn't
     */
    getValidMoves() {
        this.#checkStarted();
        return {
            north: this.#myCurrentRoom.isNorthDoorOpen(),
            east: this.#myCurrentRoom.isEastDoorOpen(),
            south: this.#myCurrentRoom.isSouthDoorOpen(),
            west: this.#myCurrentRoom.isWestDoorOpen()
        }
    }

    /**
     * Moves north and processes the move (i.e. processing item, pit, and monster if any)
     * Does nothing if north is not a valid move. 
     * @returns a string summarizing what happened during the move (e.g. picked up a healing potion).
     */
    moveNorth() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isNorthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow() - 1, location.getCol());
            return this.#processContent();
        }
    }

    /**
     * Moves east and processes the move (i.e. processing item, pit, and monster if any)
     * Does nothing if east is not a valid move. 
     * @returns a string summarizing what happened during the move (e.g. picked up a healing potion).
     */
    moveEast() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isEastDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow(), location.getCol() + 1);
            return this.#processContent();
        }
    }

    /**
     * Moves south and processes the move (i.e. processing item, pit, and monster if any)
     * Does nothing if south is not a valid move. 
     * @returns a string summarizing what happened during the move (e.g. picked up a healing potion).
     */
    moveSouth() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isSouthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow() + 1, location.getCol());
            return this.#processContent();
        }
    }

    /**
     * Moves west and processes the move (i.e. processing item, pit, and monster if any)
     * Does nothing if west is not a valid move. 
     * @returns a string summarizing what happened during the move (e.g. picked up a healing potion).
     */
    moveWest() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isWestDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow(), location.getCol() - 1);
            return this.#processContent();
        }
    }

    /**
     * Processes an attack where the adventurer and opponent's speed 
     * are compared. If the opponent is faster it attacks first.
     * The attack is processed to and if the hero is still alive 
     * the hero will then attack the opponent. And the opposite occurs 
     * if the hero is faster.
     * @throws {EvalError} if the method is called when the adventurer is not fighting.
     */
    attackOpponent() { 
        this.#checkStarted();
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot attack.");
        }
        if (this.#doesAdventurerAttackFirst()) {
            this.#myAdventurer.attack(this.#myCurrentOpponent);
            if (this.#processAttack()) {
                this.#myCurrentOpponent.attack(this.#myAdventurer);
                this.#processAttack();
            }
        } else {
            this.#myCurrentOpponent.attack(this.#myAdventurer);
            if (this.#processAttack()) {
                this.#myAdventurer.attack(this.#myCurrentOpponent);
                this.#processAttack();
            }
        }
    }

    /**
     * Processes an special attack where the adventurer and opponent's speed 
     * are compared. If the opponent is faster it attacks first.
     * The attack is processed to and if the hero is still alive 
     * the hero will then special attack the opponent. And the opposite occurs 
     * if the hero is faster.
     * @throws {EvalError} if the method is called when the adventurer is not fighting.
     */
    specialAttackOpponent() {
        this.#checkStarted();
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot special attack.");
        }
        if (this.#doesAdventurerAttackFirst()) {
            this.#myAdventurer.specialAttack(this.#myCurrentOpponent);
            if (this.#processAttack()) {
                this.#myCurrentOpponent.attack(this.#myAdventurer);
                this.#processAttack();
            }
        } else {
            this.#myCurrentOpponent.attack(this.#myAdventurer);
            if (this.#processAttack()) {
                this.#myAdventurer.specialAttack(this.#myCurrentOpponent);
                this.#processAttack();
            }
        }
    }
    
    /**
     * Checks if the adventurer is fighting and returns true 
     * if they are and false otherwise.
     * @returns true if the adventurer is fighting and false otherwise.
     */
    isAdventurerFighting() {
        return this.#myAdventurer.getFightingStatus();
    }

    /**
     * Checks if the adventurer is dead and returns true 
     * if they are and false otherwise.
     * @returns true if the adventurer is dead and false otherwise.
     */
    isAdventurerDead() {
        this.#checkStarted();
        return this.#myAdventurer.isDead();
    }

    /**
     * Checks if the opponent is dead and returns true 
     * if they are and false otherwise.
     * @returns true if the opponent is dead and false otherwise.
     */
    isOpponentDead() {
        this.#checkStarted();
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting");
        }
        return this.#myCurrentOpponent.isDead();
    }

    /**
     * Checks if the game has started and then uses a healing potion
     * if there are any.
     * @returns the result of calling the adventure's useHealingPotion method.
     */
    useHealingPotion() {
        this.#checkStarted();
        return this.#myAdventurer.useHealingPotion();
    }

    /**
     * If there is a vision potion to use then the method
     * will get the adjacent rooms and return them otherwise
     * it will return a string stating they have no vision potions to use.
     * @returns 9 rooms total (8 adjacent rooms and itself);
     */
    useVisionPotion() {
        this.#checkStarted();
        if (!this.#myAdventurer.useVisionPotion()) {
            return "You have no vision potions";
        }
        return this.#myDungeon.getAdjacentRooms(this.#myCurrentRoom);
    }

    /**
         * Checks if the player has reached the exit and collected all pillars.
         * @returns true if the player has met the condition to win the game
         * and false otherwise.
         */
    hasWonGame() {
        if (this.#myCurrentRoom.isExit()) {
            return this.#myAdventurer.hasAllRequiredItems();
        } 
        return false;
    }

    /**
     * Returns a string representation of the current state of the 
     * dungeon.
     * @returns a string of the state of the dungeon (content and doors)
     */
    viewDungeon() {
        return this.#myDungeon.toString();
    }

    /**
     * Returns the difficulty of the game (number).
     * @returns a number representing the difficulty of the game.
     */
    getDifficulty() {
        return this.#myDifficulty;
    }

    /**
     * Checks if the game has been started (i.e. meaning the 
     * state has been initialized like the dungeon)
     * @returns true if the DungeonAdventure game has been started.
     */
    getStartStatus() {
        return this.#myStarted;
    }

    /**
     * Returns a string of the adventurer. This can be parse using JSON.parse() 
     * to turn it into an object. 
     * @returns a string representing the adventurer.
     */
    getAdventurerInfo() {
        return JSON.stringify(this.#myAdventurer.toJSON());
    }

    /**
     * Returns a string of the current room. This can be parse using JSON.parse() 
     * to turn it into an object. 
     * @returns a string representing the current room.
     */
    getCurrentRoomInfo() {
        return JSON.stringify(this.#myCurrentRoom.toJSON());
    }

    /**
     * Returns a string of the current opponent. This can be parse using JSON.parse() 
     * to turn it into an object. 
     * @returns a string representing the current opponent.
     */
    getOpponentInfo() {
        if (!this.isAdventurerFighting()) {
            throw EvalError("There is not opponent to fight currently.");
        } else {
            return JSON.stringify(this.#myCurrentOpponent.toJSON());
        }
    }

    /**
     * Save the file in a text file called "serialized_game.txt".
     * @returns a string message if the file was successfuly saved.
     */
    saveGameAsFile() {
        if (this.#checkStarted) {
            fs.writeFile("serialized_game.txt", JSON.stringify(this), err => {
                if (err) {
                    console.error(err);
                }
            });
            return "File saved successfully.";
        } 
    }


    /**
     * This method will check what is in the room and call the appropriate methods.
     * @return a string representing what was processed (e.g. "Healing Potion was collected.");
     */
    #processContent() {
        function addEmptyString(theValue) {
            return theValue || "";
        }
        let resultOfMove = "";
        resultOfMove += addEmptyString(this.#pickUpItem());
        resultOfMove += addEmptyString(this.#processMonster());
        resultOfMove += addEmptyString(this.#processPit());
        return resultOfMove;
    }

    /**
     * Checks if a pit is in the current room and decrements
     * the adventurer's HP by a range of HP. If a pit is fell into
     * a string is returned describing what happened.
     * @returns A description if a pit is fell into.
     */
    #processPit() {
        if (this.#myCurrentRoom.isPit()) {
            const damage = Math.round(Math.random() * DungeonAdventure.#PIT_MAX_DAMAGE);
            const newHP = this.#myAdventurer.getHP() - damage;

            if (newHP < 1) {
                this.#myAdventurer.setHP(0);
                return "You fell into a pit. Player has died";
            } else {
                this.#myAdventurer.setHP(newHP);
                return `You fell into a pit and lost ${damage}HP.`
            }
        }
    }

    /**
     * Picks up the item in the current room if any.
     * Item is added to the adventurer's inventory.
     * @returns 
     */
    #pickUpItem() {
        const roomContent = this.#myCurrentRoom.getContent();
        const result = this.#myAdventurer.collectItem(roomContent);
        if (result) {
            this.#myCurrentRoom.clearContent();
            return result;
        }
    }

    /**
     * Spawns and sets the current opponent to the monster
     * that was run into if any. Sets the adventure's fighting status to true.
     * @returns A string describing what monster was run into if any.
     */
    #processMonster() {
        const monster = this.#myCurrentRoom.spawnMonster();
        if (monster) {
            this.#myAdventurer.setFightingStatus(true);
            this.#setOpponentToFight(monster);
            return `You ran into a ${monster.getName()}.`
        }
    }

    /**
     * Checks if the character passed in is dead and chances the fighting status to not fighting if they died.
     * @param {*} theCharacter the character to check the death status of.
     * @return true if no deaths occured and false otherwise.
     */
    #processAttack() {
        if (this.isOpponentDead()) {
            this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
            this.#myCurrentOpponent = null;
            return false;
        }
        if (this.isAdventurerDead()) {
            this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
            return false;
        }
        return true;
    }
    
    /**
     * Compares the attack speed of the adventurer and the opponent. 
     * If the opponent is faster false is returned otherwise true is returned. 
     * @returns true if the adventurer attacks first and false otherwise.
     * @throws {EvalError} if the current opponent is not set or not a monster.
     */
    #doesAdventurerAttackFirst() {
        if (!(this.#myCurrentOpponent instanceof Monster)) {
            throw new EvalError("There is not opponent to fight.");
        }
        return this.#myAdventurer.getAttackSpeed() - this.#myCurrentOpponent.getAttackSpeed() >= 0;
    }
    
    /**
     * Sets the current opponent.
     * @param {Monster} theOpponent the opponent to set as the current opponent.
     * @throws {TypeError} if the opponent is not a Monster.
     */
    #setOpponentToFight(theOpponent) {
        if (!(theOpponent instanceof Monster)) {
            throw new TypeError("The given opponent was not a dungeon character.");
        }
        this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        this.#myCurrentOpponent = theOpponent;
    }

    /**
     * Checks if the game has been started. If the game has not been started
     * then a EvalError is thrown. this should be called by methods 
     * that should not be called before the game has been started (i.e.
     * state has been initialized). For example, getValidMoves should
     * not be called unless a Dungeon exists and currentRoom exists.
     * @throws {EvalError} if the game has not started yet.
     */
    #checkStarted() {
        if (!this.#myStarted) {
            throw new EvalError("The game has not been started yet. This method cannot be called yet");
        }
    }
}