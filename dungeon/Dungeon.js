import Coordinate from './Coordinate.js';
import Room from './Room.js';
import Door from './Door.js';
export default class Dungeon {
    /** An object that stores the difficulty levels offered in the game. */
    static DIFFICULTY = Object.freeze ({
       Hard: 3,
       Medium: 2,
       Easy: 1
    });
    /** Multiplier to determine the size of the room given the difficulty level */
    static #DIFFICULTY_MULTIPLIER = 5;
    /** Probability that a room contains a healing potion */
    static #PROB_HEALING_POTION = 0.1;
    /** Probability that a room contains a vision potion */
    static #PROB_VISION_POTION = 0.1;
    /** Probability that a room contains a monster */
    static #PROB_MONSTER = 0.1;
    /** Probability that a monster is an ogre */
    static #PROB_OGRE = 0.4;
    /** Probability that a monster is a gremlin */
    static #PROB_GREMLIN = 0.3;
    /** Probability that a monster is a skeleton */
    static #PROB_SKELETON = 0.3;
    /** Holds the information for the rooms in the dungeon. */
    #myRooms
    /** The entrance for the dungeon. */
    #myEntrance
    /** The exit for the dungeon. */
    #myExit
    /** The dimension of the maze. */
    #myDimension
    constructor(theDifficulty) {
        if (!Number.isInteger(theDifficulty) || theDifficulty < Dungeon.DIFFICULTY.Easy || theDifficulty > Dungeon.DIFFICULTY.Hard) {
            throw new RangeError(`${theDifficulty} is not a valid difficulty level. Select for the DIFFICULTY object.`);
        }
        this.#myDimension = theDifficulty * Dungeon.#DIFFICULTY_MULTIPLIER;
        this.makeDungeon();
    }

    makeDungeon() {
        const doors = this.#createDoors();
        this.#generateTraversableMaze(doors);
        this.#createRooms(doors);
        this.#fillRooms();
    }

    #createDoors() {
        const eastDoors = [];
        const southDoors = [];
        eastDoors[0] = [];
        southDoors[0] = []
        for (let buffer = 0; buffer <= this.#myDimension; buffer++) {
            eastDoors[0][buffer] = null;
            southDoors[0][buffer] = new Door();
        }
        for (let row = 1; row <= this.#myDimension; row++) {
            //buffer
            eastDoors[row] = [new Door()];
            southDoors[row] = [null];
            for (let col = 1; col <= this.#myDimension; col++) {
                eastDoors[row][col] = new Door();
                southDoors[row][col] = new Door();
            }
        }
        return {east: eastDoors, south: southDoors};
    }

    /** 
     * Sets the dimensions of the maze and the access points of the maze (entrance and exit).
     */
    #generateTraversableMaze() {

    }

    /**
     * Creates rooms with the appropriate doors.
     * @param {*} Doors 
     */
    #createRooms(Doors) {
        const eastDoors = Doors.east;
        const southDoors = Doors.south;
        this.#myRooms = [];
        for (let row = 0; row < this.#myDimension; row++) {
            this.#myRooms[row] = [];
            for (let col = 0; col < this.#myDimension; col++) {
                this.#myRooms[row][col] = new Room(new Coordinate(row, col),
                                                   southDoors[row][col + 1], 
                                                   eastDoors[row + 1][col + 1], 
                                                   southDoors[row + 1][col + 1], 
                                                   eastDoors[row + 1][col]);
            }
        }
    }

    #fillRooms() {
        this.#placeRequiredItems();
        this.#placeRepeatedItems();
    }

    #placeRequiredItems() {
        let occupiedRooms = [];
        let roomLocation;

        roomLocation = this.#placeSingleContent(Room.CONTENT.exit, occupiedRooms);
        this.#myExit = this.#myRooms[roomLocation[0]][roomLocation[1]];
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.abstractionPillar, occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.encapsulationPillar, occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.inheritancePillar, occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.polymorphismPillar, occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
    }

    /**
     * Finds a random, unoccupied room and places the given content there. 
     * 
     * @param {*} theContent content (item, monster, etc) to be placed in a room
     * @param {*} theOccupiedRooms array of coordinates of occupied rooms
     * @return an array containing the row and col of the room the content was placed in
     */
    #placeSingleContent(theContent, theOccupiedRooms) {
        do { 
            var row = Math.floor(Math.random() * this.#myDimension);
            var col = Math.floor(Math.random() * this.#myDimension);
        } while (theOccupiedRooms.includes([row, col])); 
        this.#myRooms[row][col].setContent(theContent);
        theOccupiedRooms.push([row, col]);
        return [row, col];
    }

    /**
     * This steps goes through the whole maze and places items (vision, healing, monsters) in rooms.
     */
    #placeRepeatedItems() {
        let rand;
        for (let row = 0; row < this.#myDimension; row++) {
            for (let col = 0; col < this.#myDimension; col++) {
                if (this.#myRooms[row][col].isEmpty()) {
                    rand = Math.random();
                    if (rand < Dungeon.#PROB_HEALING_POTION) {
                        this.#myRooms[row][col].setContent(Room.CONTENT.healingPotion);
                    }
                    else if (rand < Dungeon.#PROB_VISION_POTION + Dungeon.#PROB_HEALING_POTION) {
                        this.#myRooms[row][col].setContent(Room.CONTENT.visionPotion);
                    }
                    else if (rand < Dungeon.#PROB_MONSTER + Dungeon.#PROB_VISION_POTION + Dungeon.#PROB_HEALING_POTION) {
                        this.#placeMonster(row, col);
                    }
                }
            }
        }
    }

    /**
     * Given a room, places a monster in every adjacent room that connects to it through a door. 
     * Note that if an adjavent room already has a pillar, entrance, or exit, a monster will not be placed. 
     * 
     * @param {*} theRow row # of the room
     * @param {*} theCol col # of the room
     */
    #surroundWithMonsters(theRow, theCol) {
        let room = this.#myRooms[theRow][theCol];
        if (room.isNorthDoorOpen()) {
            this.#placeMonster(theRow - 1, theCol);
        }
        if (room.isSouthDoorOpen()) {
            this.#placeMonster(theRow + 1, theCol);
        }
        if (room.isWestDoorOpen()) {
            this.#placeMonster(theRow, theCol - 1);
        }
        if (room.isEastDoorOpen()) {
            this.#placeMonster(theRow, theCol + 1);
        }
    }

    #placeMonster(theRow, theCol) {
        const room = this.#myRooms[theRow][theCol];
        if (room.isEmpty()) {
            const rand = Math.random();
            if (rand < Dungeon.#PROB_OGRE) {
                room.setContent(Room.CONTENT.ogre);
            }
            else if (rand < Dungeon.#PROB_GREMLIN + Dungeon.#PROB_OGRE) {
                room.setContent(Room.CONTENT.gremlin);
            }
            else { 
                room.setContent(Room.CONTENT.skeleton);
            }
        }
    }

    getEntrance() {
        return this.#myEntrance;
    }

    getExit() {
        return this.#myExit;
    }

    getRoom(theCoordinate) {
        if (!theCoordinate instanceof Coordinate) {
            throw TypeError("The given coordinate was not a Coordinate type.");
        }
        return this.#myRooms[theCoordinate.getX()][theCoordinate.getY()];
    }

    /**
     * A string of the current state of the dungeon.
     * @returns a string of the contents of the rooms in the dungeon.
     */
    toString() {
        // TODO: make the string also print the state of the doors (open/closed) and the walls.
        let str = '';
        for (let row = 0; row < this.#myDimension; row++) {
            for (let col = 0; col < this.#myDimension; col++) {
                str += this.#myRooms[row][col].getContent();
            }
            str += '\n';
        }
        return str;
    }
}

const d = new Dungeon(Dungeon.DIFFICULTY.Easy);
console.log(d.toString());