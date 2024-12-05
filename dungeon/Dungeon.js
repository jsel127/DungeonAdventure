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
    /** The buffer size of the room array */
    static BUFFER = 1;
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
    #myRooms;
    /** The entrance for the dungeon. */
    #myEntrance;
    /** The exit for the dungeon. */
    #myExit;
    /** The dimension of the maze. */
    #myDimension;
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

    toString() {
        let str = " ";
        let currentRoom;
        for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {
            currentRoom = this.getRoom(new Coordinate(Dungeon.BUFFER, col));
            str += (currentRoom.isNorthDoorOpen()) ? "  " : "- ";
        }
        str += "\n";
        for (let row = Dungeon.BUFFER; row < this.#myDimension + Dungeon.BUFFER; row++) {
            for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {
                currentRoom = this.getRoom(new Coordinate(row, col));
                str += (currentRoom.isWestDoorOpen()) ? "\\" : "|";
                str += currentRoom.getContent();
            }
            str += (currentRoom.isEastDoorOpen()) ? "\\" : "|";
            str += "\n ";
            for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {                
                currentRoom = this.getRoom(new Coordinate(row, col));
                str += (currentRoom.isSouthDoorOpen()) ? "  " : "- ";
            }
            str += "\n";
        }
        return str;
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

    getAdjacentRooms(theRoom) {
        if (!theRoom instanceof Room) {
            throw new TypeError("The given value is not a room");
        }
        const coordinate = theRoom.getCoordinate();
        const curX = coordinate.getX();
        const curY = coordinate.getY();

        const adjacentRooms = new Array(3);
        for (let row = -1; row <= 1; row++) {
            adjacentRooms[row + 1] = new Array(3);
            for (let col = -1; col <= 1; col++) {
                adjacentRooms[row + 1][col + 1] = this.#myRooms[curX + row][curY + col];
            }
        }
        return adjacentRooms;
    }

    #makeDungeon() {
        const doors = this.#createDoors();
        this.#generateTraversableMaze(doors);
        this.#createRooms(doors);
        this.#fillRooms();
    }

    #createDoors() {
        const doors = {
            east: new Array(this.#myDimension + Dungeon.BUFFER),
            south: new Array(this.#myDimension + Dungeon.BUFFER)
        }
        for (let row = 0; row < this.#myDimension + Dungeon.BUFFER; row++) {
            doors.east[row] = new Array(this.#myDimension + Dungeon.BUFFER);
            doors.south[row] = new Array(this.#myDimension + Dungeon.BUFFER);
            for (let col = 0; col < this.#myDimension + Dungeon.BUFFER; col++) {
                doors.east[row][col] = new Door();
                doors.south[row][col] = new Door();
            }
        }
        return doors;
    }

    #generateTraversableMaze(theDoors) {
        const visited = this.#createBufferedBooleanArray();
        const row = Math.floor(Math.random() * this.#myDimension) + 1;
        const col = Math.floor(Math.random() * this.#myDimension) + 1;
        this.#createPath(visited, theDoors, row, col);
    }

    #createBufferedBooleanArray() {
        const dimensionArray = this.#myDimension + Dungeon.BUFFER * 2;
        const visitedArray = new Array(dimensionArray);
        visitedArray[0] = new Array(dimensionArray).fill(true);
        visitedArray[dimensionArray - 1] = new Array(dimensionArray).fill(true);
        for (let row = Dungeon.BUFFER; row < dimensionArray - Dungeon.BUFFER; row++) {
            visitedArray[row] = new Array(dimensionArray);
            visitedArray[row][0] = true;
            visitedArray[row][dimensionArray - Dungeon.BUFFER] = true;
            for (let col = Dungeon.BUFFER; col < dimensionArray - Dungeon.BUFFER; col++) {
                visitedArray[row][col] = false;
            }
        }
        return visitedArray;
    }

    #createPath(theVisited, theDoors, theRow, theCol) {
        theVisited[theRow][theCol] = true;
        if (theVisited[theRow - 1][theCol] === false) {
            theDoors.south[theRow - 1][theCol].open();
            this.#createPath(theVisited, theDoors, theRow - 1, theCol);
        } 
        if (theVisited[theRow][theCol + 1] === false) {
            theDoors.east[theRow][theCol].open();
            this.#createPath(theVisited, theDoors, theRow, theCol + 1);
        } 
        if (theVisited[theRow + 1][theCol] === false) {
            theDoors.south[theRow][theCol].open();
            this.#createPath(theVisited, theDoors, theRow + 1, theCol);
        } 
        if (theVisited[theRow][theCol - 1] === false) {
            theDoors.east[theRow][theCol - 1].open();
            this.#createPath(theVisited, theDoors, theRow, theCol - 1);
        }
    }

    #createRooms(theDoors) {
        const dimensionArray = this.#myDimension + Dungeon.BUFFER * 2;
        this.#myRooms = new Array(dimensionArray);
        this.#myRooms[0] = new Array(dimensionArray).fill(null);
        this.#myRooms[dimensionArray - Dungeon.BUFFER] = new Array(dimensionArray).fill(null);
        for (let row = Dungeon.BUFFER; row < dimensionArray - Dungeon.BUFFER; row++) {
            this.#myRooms[row] = new Array(dimensionArray);
            this.#myRooms[row][0] = null;
            this.#myRooms[row][dimensionArray - Dungeon.BUFFER] = null;
            for (let col = Dungeon.BUFFER; col < dimensionArray - Dungeon.BUFFER; col++) {
                this.#myRooms[row][col] = new Room(new Coordinate(row, col),
                                                   theDoors.south[row - 1][col], 
                                                   theDoors.east[row][col],
                                                   theDoors.south[row][col],
                                                   theDoors.east[row][col - 1]);

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
        let row;
        let col;
        do { 
            row = Math.floor(Math.random() * this.#myDimension) + Dungeon.BUFFER;
            col = Math.floor(Math.random() * this.#myDimension) + Dungeon.BUFFER;
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
        for (let row = Dungeon.BUFFER; row < this.#myDimension + Dungeon.BUFFER; row++) {
            for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {
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

// const testDungeon = new Dungeon(Dungeon.DIFFICULTY.Easy);
// Tested createDoors
// const doors = testDungeon.createDoors();
// console.log(doors.east);
// console.log(doors.south);
// Tested createBufferedBooleanArray
// const bufferBoolean = testDungeon.createBufferedBooleanArray();
// console.log(bufferBoolean);
//testDungeon.makeDungeon();
// console.log(testDungeon.toString());
// console.log(testDungeon.getAdjacentRooms(new Room(new Coordinate(1, 1))));
// console.log(testDungeon.getAdjacentRooms(new Room(new Coordinate(5, 5))));
// console.log(testDungeon.getAdjacentRooms(new Room(new Coordinate(1, 5))));
// console.log(testDungeon.getAdjacentRooms(new Room(new Coordinate(4, 1))));



