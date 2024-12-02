import Adventurer from "./Adventurer.js";
import DungeonCharacter from "./characters/DungeonCharacter.js";
import HeroFactory from "./characters/HeroFactory.js";
import Dungeon from "./dungeon/Dungeon.js";
export default class DungeonAdventure {
    static #HARDEST_DIFFICULTY = 3;
    #myDungeon
    #myAdventurer
    #myCurrentRoom
    #myDifficulty
    #myCurrentOpponent
    constructor() {
    }

    getGameDescription() {
        return "Welcome to the Dungeon Adventure Game. There are three major heroes in the worlds of Dungeon Adventure, the Warrior, the Priestess, and the Thief. Your goal is to find the missing pillars of OOP which are currently somewhere in the dungeon. Once you find all pillars find the exit to save the world of OOP."
    }

    getHeroes() {
// 
        return [
            {
                name: "Warrior",
                hp: 125,
                dp_min: 35,
                dp_max: 60,
                attack_speed: 4,
                hit_chance: 80,
                block_chance: 20
            },
            {
                name: "Priestess",
                hp: 75,
                dp_min: 25,
                dp_max: 45,
                attack_speed: 5,
                hit_chance: 70,
                block_chance: 30
            },
            {
                name: "Thief",
                hp: 75,
                dp_min: 20,
                dp_max: 40,
                attack_speed: 6,
                hit_chance: 80,
                block_chance: 40
            }
        ];
    }

    setAdventurer(theName, theHeroType) {
        if (typeof theName !== "string") {
            throw new TypeError("Invalid name provided");
        }
        this.#myAdventurer = HeroFactory.createHero(theHeroType, theName);
    }

    setDifficulty(theDifficulty) {
        if (!Number.isInteger(theDifficulty)) {
            throw new TypeError("The difficulty must be an integer");
        }
        if (theDifficulty < 0 || DungeonAdventure.#HARDEST_DIFFICULTY > 3) {
            throw new RangeError("The difficulty was out of range.");
        }
        this.#myDifficulty = theDifficulty;
    }

    startGame() {
        this.#createDungeon(this.#myDifficulty);
    }

    #createDungeon() {
        this.#myDungeon = new Dungeon(this.#myDifficulty);
        this.#myCurrentRoom = this.#myDungeon.getEntrance();
    }

    getValidMoves() {
        return {
            north: this.#myCurrentRoom.isNorthDoorOpen(),
            east: this.#myCurrentRoom.isEastDoorOpen(),
            south: this.#myCurrentRoom.isSouthDoorOpen(),
            west: this.#myCurrentRoom.isWestDoorOpen()
        }
    }

    moveNorth() {
        if (this.#myCurrentRoom.isNorthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX(), location.getY() - 1);
            return this.#processMove();
        }
    }

    moveEast() {
        if (this.#myCurrentRoom.isEastDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX() + 1, location.getY());
            return this.#processMove();
        }
    }

    moveSouth() {
        if (this.#myCurrentRoom.isSouthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX(), location.getY() + 1);
            return this.#processMove();
        }
    }

    moveWest() {
        if (this.#myCurrentRoom.isWestDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX() - 1, location.getY());
            return this.#processMove();
        }
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
    }

    #pickUpItem() {
        const item = this.#myCurrentRoom.collectItem();
        if (item) {
            inventory.add(item);
        }
    }

    #processMonster() {
        const monster = this.#myCurrentRoom.spawnMonster();
        if (monster) {
            this.#myAdventurer.setFightingStatus(true);
            this.#setMonsterFight(monster);
        }
    }

    attackOpponent() { 
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot attack.");
        }
        if (this.#doesAdventurerAttackFirst()) {
            this.#myAdventurer.attack(this.#myCurrentOpponent);
            this.#processAttack();
            this.#myCurrentOpponent.attack(this.#myAdventurer);
            this.#processAttack();
        } else {
            this.#myCurrentOpponent.attack(this.#myAdventurer);
            this.#processAttack();
            this.#myAdventurer.attack(this.#myCurrentOpponent);
            this.#processAttack();
        }
    }


    specialAttackOpponent() {
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot special attack.");
        }
        if (this.#doesAdventurerAttackFirst()) {
            this.#myAdventurer.specialAttack(this.#myCurrentOpponent);
            this.#processAttack();
            this.#myCurrentOpponent.specialAttack(this.#myAdventurer);
            this.#processAttack();
        } else {
            this.#myCurrentOpponent.specialAttack(this.#myAdventurer);
            this.#processAttack();
            this.#myAdventurer.specialAttack(this.#myCurrentOpponent);
            this.#processAttack();
        }
    }

    blockOpponent() {   
        if (!this.#myAdventurer.getFightingStatus()) {
            throw new EvalError("The adventurer is not currently fighting so it cannot block.");
        }
        const blockResult = this.#myAdventurer.block();
        this.#myCurrentOpponent.attack(this.#myAdventurer.getHero(), blockResult);
        if (blockResult) {
            return "Successful Block";
        } else {
        };    
    }

    /**
     * Checks if the character passed in is dead and chances the fighting status to not fighting if they died.
     * @param {*} theCharacter the character to check the death status of.
     */
    #processAttack() {
        if (theCharacter.isDead()) {
            this.#myAdventurer.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        }
    }
    
    #doesAdventurerAttackFirst() {
        if (!this.#myCurrentOpponent instanceof DungeonCharacter) {
            throw new EvalError("There is not opponent to fight.");
        }
        return this.#myAdventurer.getAttackSpeed() - this.#myCurrentOpponent.getAttackSpeed() >= 0;
    }
    
    /**
     * Fights the given monster. The method will return true if the hero won and false if the hero died. 
     * @param {*} theMonster 
     */
    #setMonsterFight(theMonster) {
        this.#myAdventurer.setFightingStatus(true);
        this.#myCurrentOpponent = monster;
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

    saveGame() {
        //TODO: implement saving game
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify (convert data to a string)
        //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (store savedState in browser)
    }

    loadGame() {
        //TODO: implement loading game
    }
}