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
    /** 
     * Creates a Dungeon that stores the entrance, exit, dimensions, and rooms of the game.
     */
    constructor(theDifficulty) {
        if (!Number.isInteger(theDifficulty) 
            || theDifficulty < Dungeon.DIFFICULTY.Easy 
            || theDifficulty > Dungeon.DIFFICULTY.Hard) {
            throw new RangeError(`${theDifficulty} is not a valid difficulty level."
                                 + "Select for the DIFFICULTY object.`);
        }
        this.#myDimension = theDifficulty * Dungeon.#DIFFICULTY_MULTIPLIER;
        this.#makeDungeon();
    } 

    getEntrance() {
        return this.#myEntrance;
    }

    getExit() {
        return this.#myExit;
    }

    getDimensions() {
        return this.#myDimension;
    }

    /**
     * 
     * @param {*} theCoordinate the Coordinate of the room to get.
     * @returns 
     */
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
        let str = " ";
        let currentRoom;
        for (let col = 0; col < this.#myDimension; col++) {
            currentRoom = this.getRoom(new Coordinate(0, col));
            str += (currentRoom.isNorthDoorOpen()) ? "  " : "- ";
        }
        str += "\n";
        for (let row = 1; row < this.#myDimension - 1; row++) {
            for (let col = 0; col < this.#myDimension; col++) {
                currentRoom = this.getRoom(new Coordinate(row, col));
                str += (currentRoom.isWestDoorOpen()) ? "/" : "|";
                str += currentRoom.getContent();
            }
            str += (currentRoom.isEastDoorOpen()) ? "/" : "|";
            str += "\n ";
            for (let col = 0; col < this.#myDimension; col++) {
                currentRoom = this.getRoom(new Coordinate(row, col));
                str += (currentRoom.isSouthDoorOpen()) ? "  " : "- ";
            }
            str += "\n";
        }
        return str;
    }
    
    /**
     * Makes a dungeon by calling relavent private methods.
     */
    #makeDungeon() {
        const doors = this.#createDoors();
        this.#generateTraversableMaze(doors);
        this.#createRooms(doors);
        this.#fillRooms();
    }   

    /**
     * An object of the doors to create rooms with.
     * @returns an object of two 2D arrays one for the east doors the other for the west doors/
     */
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
    #generateTraversableMaze(theDoors) {
        const visited = this.#createBufferedBooleanArray();
        const x = Math.floor(Math.random() * this.#myDimension) + 1;
        const y = Math.floor(Math.random() * this.#myDimension) + 1;
        this.#createPath(visited, theDoors, x, y);
    }

    /**
     * Creates a 2D buffered boolean array that keeps track of the visited rooms. 
     * @returns a 2D buffered boolean array that will mark true if the node has been visited and false if it hasn't.
     */
    #createBufferedBooleanArray() {
        const visitedArray = [];
        visitedArray[0] = [];
        visitedArray[this.#myDimension + 1] = [];
        for (let col = 0; col < this.#myDimension + 2; col++) {
            visitedArray[0][col] = true;
            visitedArray[this.#myDimension + 1][col] = true;
        } 
        for (let row = 1; row < this.#myDimension + 1; row++) {
            visitedArray[row] = [];
            visitedArray[row][0] = true;
            visitedArray[row][this.#myDimension + 1] = true;
            for (let col = 1; col < this.#myDimension + 1; col++) {
                visitedArray[row][col] = false;
            }
        }
        return visitedArray;
    }

    /**
     * This will open doors to make the maze traversable using recursion. 
     * Source of inspiration: 
     * https://medium.com/swlh/how-to-create-a-maze-with-javascript-36f3ad8eebc1 
     * https://en.wikipedia.org/wiki/Maze_generation_algorithm
     * @param {*} theVisited a 2D boolean array tracking which rooms have been visited and are already connected.
     * @param {*} theDoors a 2D array of doors which maintains the state of the doors of the rooms.
     * @param {*} theX the X coordinate of the room's location.
     * @param {*} theY the Y coordinate of the room's location.
     */
    #createPath(theVisited, theDoors, theX, theY) {
        theVisited[theX][theY] = true;
        if (theVisited[theX - 1][theY] === false) {
            theDoors.east[theX - 1][theY].open();
            this.#createPath(theVisited, theDoors, theX - 1, theY);
        } else if (theVisited[theX + 1][theY] === false) {
            theDoors.east[theX + 1][theY].open();
            this.#createPath(theVisited, theDoors, theX + 1, theY);
        } else if (theVisited[theX][theY - 1] === false) {
            theDoors.south[theX][theY - 1].open();
            this.#createPath(theVisited, theDoors, theX, theY - 1);
        } else if (theVisited[theX][theY + 1] === false) {
            theDoors.south[theX][theY + 1].open();
            this.#createPath(theVisited, theDoors, theX, theY + 1);
        }
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
        this.#placeRequiredContent();
        this.#placeRepeatedItems();
    }

    #placeRequiredContent() {
        let occupiedRooms = [];
        let roomLocation;

        roomLocation = this.#placeSingleContent(Room.CONTENT.entrance, occupiedRooms);
        this.#myEntrance = this.#myRooms[roomLocation[0]][roomLocation[1]];

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
}

const d = new Dungeon(Dungeon.DIFFICULTY.Easy);
console.log(d.toString());