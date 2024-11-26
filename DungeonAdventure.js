import Adventurer from "./Adventurer.js";
import HeroFactory from "./characters/HeroFactory.js";
import Dungeon from "./dungeon/Dungeon.js";
export default class DungeonAdventure {
    static #HARDEST_DIFFICULTY = 3;
    #myDungeon
    #myAdventurer
    #myCurrentRoom
    #myDifficulty
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
        this.#createDungeon();
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
            processMove();
        }
    }

    moveEast() {
        if (this.#myCurrentRoom.isEastDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX() + 1, location.getY());
            processMove();
        }
    }

    moveSouth() {
        if (this.#myCurrentRoom.isSouthDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX(), location.getY() + 1);
            processMove();
        }
    }

    moveWest() {
        if (this.#myCurrentRoom.isWestDoorOpen()) {
            const location = this.#myCurrentRoom.getCoordinate();
            this.#myCurrentRoom = this.#myDungeon.getRoom(location.getX() - 1, location.getY());
            processMove();
        }
    }

    /**
     * This method will check what is in the room and call the appropriate methods.
     */
    #processMove() {
        const content = this.#myCurrentRoom.getContent();
    }

    #pickupItem() {

    }

    #fightMonster(theMonster) {
        // const adventurerHeroChar = this.#myAdventurer.getHero();
        // let time = 0;
        // while (!adventurerHeroChar.isDead() && !theMonster.isDead()) {
            
        // }
    }

    #gameOver() {

    }

    #hasWon() {

    }

    saveGame() {
        //TODO: implement saving game
    }

    loadGame() {
        //TODO: implement loading game
    }
}