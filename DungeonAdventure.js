import Hero from "./characters/Hero.js";
import HeroFactory from "./characters/HeroFactory.js";
import Inventory from "./characters/Inventory.js";
import Dungeon from "./dungeon/Dungeon.js";
import Coordinate from "./dungeon/Coordinate.js";
import Monster from "./characters/Monster.js";
import fs from 'fs';
// source: https://stackoverflow.com/questions/20572016/javascript-string-concatenation-behavior-with-null-or-undefined-values 

export default class DungeonAdventure {
    static #PIT_MAX_DAMAGE = 10;
    #myDungeon
    #myAdventurer
    #myCurrentRoom
    #myDifficulty
    #myCurrentOpponent
    #myStarted;
    
    constructor(theLoading = false, theDungeon = null, theAdventurer = null, 
                theCurrentRoomCoordinate = null, theDifficulty = null, theCurrentOpponent = null) {
        if (theLoading) {
            if (!Number.isInteger(theDifficulty) || theDifficulty < Dungeon.DIFFICULTY.Easy || theDifficulty > Dungeon.DIFFICULTY.Hard) {
                throw new RangeError("The difficulty must be between easy and hard.");
            }
            if (!(theDungeon instanceof Dungeon && theAdventurer instanceof Hero
                && theCurrentRoomCoordinate instanceof Coordinate 
                && (theCurrentOpponent === null || theCurrentOpponent instanceof Monster))) {
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

    getGameDescription() {
        return "Welcome to the Dungeon Adventure Game. There are three major heroes in the worlds of Dungeon Adventure, the Warrior, the Priestess, and the Thief. Your goal is to find the missing pillars of OOP which are currently somewhere in the dungeon. Once you find all pillars find the exit to save the world of OOP."
    }

    static getHeroes() {
        const heroes = [HeroFactory.getWarriorData(), 
                       HeroFactory.getPriestessData(), 
                       HeroFactory.getThiefData()];
        return heroes; 
    }

    static getDifficulties() {
        return Object.keys(Dungeon.DIFFICULTY);
    }

    setDifficulty(theDifficulty) {
        const difficulty = Dungeon.DIFFICULTY[theDifficulty];
        if (difficulty === undefined) {
            throw new TypeError("The given difficulty was invalid");
        }
        this.#myDifficulty = difficulty;
    }

    setAdventurer(theHeroType, theName) {
        if (typeof theName !== "string") {
            throw new TypeError("Invalid name provided");
        }
        if (!HeroFactory.getHeroTypes().includes(theHeroType)) {
            throw new TypeError("Invalid Hero Type provided");
        }
        this.#myAdventurer = HeroFactory.createHero(theHeroType, theName);
    }

    startGame() {
        //const fileDungeon = fs.readFileSync('__tests__/test_files/easyDA.txt')
        //this.#myDungeon = DungeonAdventure.fromJSON(JSON.parse(fileDungeon.toString().trim()))
        this.#myDungeon = new Dungeon(this.#myDifficulty);
        this.#myCurrentRoom = this.#myDungeon.getEntrance();    
        this.#myStarted = true;
    }

    getValidMoves() {
        this.#checkStarted();
        return {
            north: this.#myCurrentRoom.isNorthDoorOpen(),
            east: this.#myCurrentRoom.isEastDoorOpen(),
            south: this.#myCurrentRoom.isSouthDoorOpen(),
            west: this.#myCurrentRoom.isWestDoorOpen()
        }
    }

    moveNorth() {  
        this.#checkStarted();
        if (this.#myCurrentRoom.isNorthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow() - 1, location.getCol());
            return this.#processContent();
        }
    }

    moveEast() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isEastDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow(), location.getCol() + 1);
            return this.#processContent();
        }
    }

    moveSouth() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isSouthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow() + 1, location.getCol());
            return this.#processContent();
        }
    }

    moveWest() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isWestDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow(), location.getCol() - 1);
            return this.#processContent();
        }
    }

    attackOpponent() { 
        this.#checkStarted();
        console.log('DungeonAdventure: fightingStatus', this.#myAdventurer.getFightingStatus())
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
    
    isAdventurerFighting() {
        return this.#myAdventurer.getFightingStatus();
    }

    isAdventurerDead() {
        this.#checkStarted();
        return this.#myAdventurer.isDead();
    }

    isOpponentDead() {
        this.#checkStarted();
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting");
        }
        return this.#myCurrentOpponent.isDead();
    }

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
     * This method will check what is in the room and call the appropriate methods.
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
    
    #doesAdventurerAttackFirst() {
        if (!this.#myCurrentOpponent instanceof Monster) {
            throw new EvalError("There is not opponent to fight.");
        }
        return this.#myAdventurer.getAttackSpeed() - this.#myCurrentOpponent.getAttackSpeed() >= 0;
    }
    
    /**
     * Sets the current opponent.
     * @param {*} theOpponent 
     */
    #setOpponentToFight(theOpponent) {
        if (!theOpponent instanceof Monster) {
            throw new TypeError("The given opponent was not a dungeon character.");
        }
        this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        this.#myCurrentOpponent = theOpponent;
    }

    hasWonGame() {
        if (this.#myCurrentRoom.isExit()) {
            return this.#myAdventurer.hasAllRequiredItems();
        } 
        return false;
    }
    
    viewDungeon() {
        return this.#myDungeon.toString();
    }

    getDifficulty() {
        return this.#myDifficulty;
    }

    getStartStatus() {
        return this.#myStarted;
    }

    getAdventurerInfo() {
        return JSON.stringify(this.#myAdventurer.toJSON());
    }

    getCurrentRoomInfo() {
        return JSON.stringify(this.#myCurrentRoom.toJSON());
    }

    getOpponentInfo() {
        if (!this.isAdventurerFighting()) {
            throw EvalError("There is not opponent to fight currently.");
        } else {
            return JSON.stringify(this.#myCurrentOpponent.toJSON());
        }
    }

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

    #checkStarted() {
        if (!this.#myStarted) {
            throw new EvalError("The game has not been started yet. This method cannot be called yet");
        }
    }
}