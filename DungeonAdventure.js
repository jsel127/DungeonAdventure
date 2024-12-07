import DungeonCharacter from "./characters/DungeonCharacter.js";
import Hero from "./characters/Hero.js";
import HeroFactory from "./characters/HeroFactory.js";
import Inventory from "./characters/Inventory.js";
import Dungeon from "./dungeon/Dungeon.js";
import Coordinate from "./dungeon/Coordinate.js";
export default class DungeonAdventure {
    static #PIT_MAX_DAMAGE = 20;
    #myDungeon
    #myAdventurer
    #myCurrentRoom
    #myDifficulty
    #myCurrentOpponent
    #myStarted;
    
    constructor() {
        
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
            this.#myCurrentRoom = this.#myDungeon.getRoomWithRoomCol(location.getRow() + 1, location.getCol());
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
            return "You have not healing potions";
        }
        this.#myAdventurer.setHP(this.#myAdventurer.getHP() + Inventory.getHealingPotionHP());
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

    saveGame() {
        this.#checkStarted();
        //TODO: implement saving game
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify (convert data to a string)
        //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (store savedState in browser)
    }

    loadGame() {
        //TODO: implement loading game
        //https://stackoverflow.com/questions/6487699/best-way-to-serialize-unserialize-objects-in-javascript
    }

    #processMove() {
        this.#processContent();
        return this.#hasWonGame();
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
            throw new TypeError("The given opponenet was not a dungeon character.");
        }
        this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        this.#myCurrentOpponent = theOpponent;
    }

    #hasWonGame() {
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

    getAdventurer() {
        return this.#myAdventurer;
    }

    getDifficulty() {
        return this.#myDifficulty;
    }

    getCurrentRoom() {
        return this.#myCurrentRoom;
    }

    getStartStatus() {
        return this.#myStarted;
    }

    #checkStarted() {
        if (!this.#myStarted) {
            throw new EvalError("The game has not been started yet. This method cannot be called yet");
        }
    }
}


const d = new DungeonAdventure();
d.setDifficulty("Easy");
d.setAdventurer("Warrior", "Jasmine");
d.startGame();
console.log(d.viewDungeon());
console.log(d.getCurrentRoom().getCoordinate().toString());
console.log(d.getValidMoves());
console.log(d.moveNorth());
console.log(d.viewDungeon());
console.log(d.getCurrentRoom().getCoordinate().toString());
console.log(d.getValidMoves());