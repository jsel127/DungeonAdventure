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
        return [
            {
                name: "Warrior",
                hp: 125,
                dpmin: 35,
                dpmax: 60,
                attack_speed: 4,
                hit_chance: 80,
                block_chance: 20
            },
            {
                name: "Priestess",
                hp: 75,
                dpmin: 25,
                dpmax: 45,
                attack_speed: 5,
                hit_chance: 70,
                block_chance: 30
            },
            {
                name: "Thief",
                hp: 75,
                dpmin: 20,
                dpmax: 40,
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
        this.#myAdventurer = new Adventurer(HeroFactory.createHero(theHeroType));
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
            this.#processMove();
        }
    }

    moveEast() {
        if (this.#myCurrentRoom.isEastDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX() + 1, location.getY());
            this.#processMove();
        }
    }

    moveSouth() {
        if (this.#myCurrentRoom.isSouthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX(), location.getY() + 1);
            this.#processMove();
        }
    }

    moveWest() {
        if (this.#myCurrentRoom.isWestDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX() - 1, location.getY());
            this.#processMove();
        }
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
    }

    #pickUpItem() {
        // NEED TO ADJUST BASED ON HOW ITEMS classes are adjusted
        const inventory = this.#myAdventurer.getInventory();
        const item = this.#myCurrentRoom.collectItem();
        if (item) {
            inventory.add(item);
        }
    }

    #processMonster() {
        const monster = this.#myCurrentRoom.spawnMonster();
        if (monster) {
            this.#setMonsterFight(monster);
        }
    }

    attackOpponent() { 
        // if the attack speed of the adventurer is slower the monster can attack first otherwise it is the opposite
        // after each attack the status of the player must be checked if it has died a gameover needs to run.
        if (this.#myAdventurer.attack(this.#myCurrentOpponent)) {
            return "Successful Attack";
        } else {
            return "Failed to Attack";
        };
    }

    specialAttackOpponent() {
        const hero = this.#myAdventurer.getHero();
        const heroFaster = hero.getAttackSpeed() - this.#myCurrentOpponent.getAttackSpeed();
        if (heroFaster) {
            hero.specialAttack(this.#myCurrentOpponent);
            if (this.#isDead(this.#myCurrentOpponent())) {
// MONSTER HAS DIED
            } else {
                this.#myCurrentOpponent.attack(hero);
// CHECK HERO ALIVE
            }
        } else {
// OPPOSITE OF ABOVE (LIKELY MODULARIZE)
        }
    }

    blockOpponent() {   
        const blockResult = this.#myAdventurer.block();
        this.#myCurrentOpponent.attack(this.#myAdventurer.getHero(), blockResult);
        if (blockResult) {
            return "Successful Block";
        } else {
            if (this.#isDead(this.#myAdventurer.getHero())) {
                return "Failed to Block, You have Died.";
            }
            return "Failed to Block";
        };    
    }

    #isDead(theDungeonCharacter) {
        if (!theDungeonCharacter instanceof DungeonCharacter) {
            throw new TypeError("Invalid argument. It must be a DungeonCharacter.");
        }
        return theDungeonCharacter.isDead();
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
    }

    loadGame() {
        //TODO: implement loading game
    }
}