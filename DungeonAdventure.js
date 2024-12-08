import DungeonCharacter from "./characters/DungeonCharacter.js";
import Hero from "./characters/Hero.js";
import HeroFactory from "./characters/HeroFactory.js";
import Inventory from "./characters/Inventory.js";
import Dungeon from "./dungeon/Dungeon.js";
import Coordinate from "./dungeon/Coordinate.js";
import Monster from "./characters/Monster.js";
export default class DungeonAdventure {
    static #PIT_MAX_DAMAGE = 20;
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
                                    HeroFactory.loadHero(theJSON.adventurer.__type, theJSON.adventurer),
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
        this.#myAdventurer = HeroFactory.createHero(theHeroType, theName);
    }

    startGame() {
        this.#myDungeon = new Dungeon(this.#myDifficulty);
        this.#myCurrentRoom = this.#myDungeon.getEntrance();    
        this.#myStarted = true;
// TESTING PURPOSES ONLY
        // const cur = this.#myCurrentRoom.getCoordinate();
        // this.#myDungeon.getRoomWithRowCol(cur.getRow() - 1, cur.getCol()).setContent(Room.CONTENT.ogre);
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
            return this.#processMove();
        }
    }

    moveEast() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isEastDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow(), location.getCol() + 1);
            return this.#processMove();
        }
    }

    moveSouth() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isSouthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow() + 1, location.getCol());
            return this.#processMove();
        }
    }

    moveWest() {
        this.#checkStarted();
        if (this.#myCurrentRoom.isWestDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRowCol(location.getRow(), location.getCol() - 1);
            return this.#processMove();
        }
    }

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

    specialAttackOpponent() {
        this.#checkStarted();
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot special attack.");
        }
        if (this.#doesAdventurerAttackFirst()) {
            this.#myAdventurer.specialAttack(this.#myCurrentOpponent);
            if (this.#processAttack()) {
                this.#myCurrentOpponent.specialAttack(this.#myAdventurer);
                this.#processAttack();
            }
        } else {
            this.#myCurrentOpponent.specialAttack(this.#myAdventurer);
            if (this.#processAttack()) {
                this.#myAdventurer.specialAttack(this.#myCurrentOpponent);
                this.#processAttack();
            }
        }
    }

    blockOpponent() {   
        this.#checkStarted();
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot block.");
        }
        const blockResult = this.#myAdventurer.block();
        this.#myCurrentOpponent.attack(this.#myAdventurer.getHero(), blockResult);
        if (blockResult) {
            return "Successful Block";
        } else {
            this.#processAttack();
        };    
    }

    isAdventurerDead() {
        this.#checkStarted();
        return this.#myAdventurer.isDead();
    }

    isOpponentDead() {
        this.#checkStarted();
        if (this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting");
        }
        return this.#myCurrentOpponent.isDead();
    }

    useHealingPotion() {
        this.#checkStarted();
        const inventory = this.#myAdventurer.getInventory();
        if (!inventory.hasHealingPotion()) {
            return "You have no healing potions";
        }
        inventory.useHealingPotion();
        const gainedHP =  Inventory.getHealingPotionHP();
        this.#myAdventurer.setHP(this.#myAdventurer.getHP() + gainedHP);
        return gainedHP;
    }

    /**
     * If there is a vision potion to use then the method
     * will get the adjacent rooms and return them otherwise
     * it will return a string stating they have no vision potions to use.
     * @returns 9 rooms total (8 adjacent rooms and itself);
     */
    useVisionPotion() {
        this.#checkStarted();
        const inventory = this.#myAdventurer.getInventory();
        if (!inventory.hasVisionPotion()) {
            return "You have no vision potions";
        } 
        inventory.useVisionPotion();
        return this.#myDungeon.getAdjacentRooms(this.#myCurrentRoom);
    }

    #processMove() {
        this.#processContent();
    }

    /**
     * This method will check what is in the room and call the appropriate methods.
     */
    #processContent() {
        this.#pickUpItem();
        this.#processMonster();
        this.#processPit();
    }

    #processPit() {
        if (this.#myCurrentRoom.isPit()) {
            const damage = Math.round(Math.random() * DungeonAdventure.#PIT_MAX_DAMAGE);
            const newHP = this.#myAdventurer.getHP() - damage;
            if (newHP < 1) {
                return "Player has died";
            } else {
                this.#myAdventurer.setHP(newHP);
            }
        }
    }

    #pickUpItem() {
        const inventory = this.#myAdventurer.getInventory();
        inventory.collectItemFromRoom(this.#myCurrentRoom);
    }

    #processMonster() {
        const monster = this.#myCurrentRoom.spawnMonster();
        if (monster) {
            this.#myAdventurer.setFightingStatus(true);
            this.#setOpponentToFight(monster);
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
        if (!this.#myCurrentOpponent instanceof DungeonCharacter) {
            throw new EvalError("There is not opponent to fight.");
        }
        return this.#myAdventurer.getAttackSpeed() - this.#myCurrentOpponent.getAttackSpeed() >= 0;
    }
    
    /**
     * Sets the current opponent.
     * @param {*} theOpponent 
     */
    #setOpponentToFight(theOpponent) {
        if (!theOpponent instanceof DungeonCharacter) {
            throw new TypeError("The given opponent was not a dungeon character.");
        }
        this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        this.#myCurrentOpponent = theOpponent;
    }

    hasWonGame() {
        if (this.#myCurrentRoom.isExit()) {
            const inventory = this.#myAdventurer.getInventory();
            if (inventory.hasAllPillars()) {
                return true;
            }
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

    #checkStarted() {
        if (!this.#myStarted) {
            throw new EvalError("The game has not been started yet. This method cannot be called yet");
        }
    }
}