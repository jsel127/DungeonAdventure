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
    /** The 2D array of east doors. */
    #myEastDoors;
    /** The 2D array of south doors. */
    #mySouthDoors;
    /** 
     * Creates a Dungeon that stores the entrance, exit, dimensions, and rooms of the game.
     */

    constructor(theDifficulty, theRoomContent = null, theEastDoors = null, 
                theSouthDoors = null, theEntranceCoordinate = null, 
                theExitCoordinate = null) {
        if (!Number.isInteger(theDifficulty) 
            || theDifficulty < Dungeon.DIFFICULTY.Easy 
            || theDifficulty > Dungeon.DIFFICULTY.Hard) {
            throw new RangeError(`${theDifficulty} is not a valid difficulty level."
                                 + "Select for the DIFFICULTY object.`);
        } 
        this.#myDimension = theDifficulty * Dungeon.#DIFFICULTY_MULTIPLIER;

        if (theRoomContent === null || theEastDoors === null || theSouthDoors === null
            || theEntranceCoordinate === null || theExitCoordinate === null) {
            this.#makeDungeon();
        } else {
            if (!theEntranceCoordinate instanceof Coordinate 
                || !theExitCoordinate instanceof Coordinate) {
                throw new TypeError("The exit and entrance must be coordinates");
            }
            for (let row = 0; row < this.#myDimension + 1; row++) {
                for (let col = 0; col < this.#myDimension + 1; col++) {
                    if (!theSouthDoors[row][col] instanceof Door 
                        || !theEastDoors[row][col] instanceof Door) {
                        throw new TypeError("The east and south array of doors must contain all doors.");
                    }
                }
            }
            this.#myEastDoors = theEastDoors;
            this.#mySouthDoors = theSouthDoors;
            this.#createRooms(theRoomContent);
// POTENTIAL SWAPPING ERROR (Y, X) V (X, Y)
            this.#myEntrance = this.#myRooms[theEntranceCoordinate.getRow()][theEntranceCoordinate.getCol()]; 
            this.#myExit = this.#myRooms[theExitCoordinate.getRow()][theExitCoordinate.getCol()];
        }
    }

    toString() {
        let str = " ";
        let currentRoom;
        for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {
            currentRoom = this.getRoomWithRowCol(Dungeon.BUFFER, col);
            str += (currentRoom.isNorthDoorOpen()) ? "  " : "- ";
        }
        str += "\n";
        for (let row = Dungeon.BUFFER; row < this.#myDimension + Dungeon.BUFFER; row++) {
            for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {
                currentRoom = this.getRoomWithRowCol(row, col);
                str += (currentRoom.isWestDoorOpen()) ? "\\" : "|";
                str += currentRoom.getContent();
            }
            str += (currentRoom.isEastDoorOpen()) ? "\\" : "|";
            str += "\n ";
            for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {                
                currentRoom = this.getRoomWithRowCol(row, col);
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
        return this.#myRooms[theCoordinate.getCol()][theCoordinate.getRow()];
    }

    getRoomWithRowCol(theRow, theCol) {
        if (!Number.isInteger(theRow) || !Number.isInteger(theCol)) {
            throw new TypeError("The row and/or the column is not of integer type");
        }
        if (theRow > this.#myDimension || theRow < Dungeon.BUFFER
            || theCol > this.#myDimension || theCol < Dungeon.BUFFER) {
            throw new RangeError("The row and/or column are not valid");
        }
        return this.#myRooms[theRow][theCol];
    }

    getAdjacentRooms(theRoom) {
        if (!theRoom instanceof Room) {
            throw new TypeError("The given value is not a room");
        }
        const coordinate = theRoom.getCoordinate();
        const curRow = coordinate.getCol();
        const curCol = coordinate.getRow();

        const adjacentRooms = new Array(3);
        for (let row = -1; row <= 1; row++) {
            adjacentRooms[row + 1] = new Array(3);
            for (let col = -1; col <= 1; col++) {
                adjacentRooms[row + 1][col + 1] = this.#myRooms[curRow + row][curCol + col];
            }
        }
        return adjacentRooms;
    }

    #makeDungeon() {
        this.#createDoors();
        this.#generateTraversableMaze();
        this.#createRooms();
        this.#fillRooms();
    }

    #createDoors() {
        this.#myEastDoors =new Array(this.#myDimension + Dungeon.BUFFER);
        this.#mySouthDoors = new Array(this.#myDimension + Dungeon.BUFFER);
        for (let row = 0; row < this.#myDimension + Dungeon.BUFFER; row++) {
            this.#myEastDoors[row] = new Array(this.#myDimension + Dungeon.BUFFER);
            this.#mySouthDoors[row] = new Array(this.#myDimension + Dungeon.BUFFER);
            for (let col = 0; col < this.#myDimension + Dungeon.BUFFER; col++) {
                this.#myEastDoors[row][col] = new Door();
                this.#mySouthDoors[row][col] = new Door();
            }
        }
    }

    #generateTraversableMaze() {
        const visited = this.#createBufferedBooleanArray();
        const row = Math.floor(Math.random() * this.#myDimension) + 1;
        const col = Math.floor(Math.random() * this.#myDimension) + 1;
        this.#createPath(visited, row, col);
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

    #createPath(theVisited, theRow, theCol) {
        theVisited[theRow][theCol] = true;
        if (theVisited[theRow - 1][theCol] === false) {
            this.#mySouthDoors[theRow - 1][theCol].open();
            this.#createPath(theVisited, theRow - 1, theCol);
        } 
        if (theVisited[theRow][theCol + 1] === false) {
            this.#myEastDoors[theRow][theCol].open();
            this.#createPath(theVisited, theRow, theCol + 1);
        } 
        if (theVisited[theRow + 1][theCol] === false) {
            this.#mySouthDoors[theRow][theCol].open();
            this.#createPath(theVisited, theRow + 1, theCol);
        } 
        if (theVisited[theRow][theCol - 1] === false) {
            this.#myEastDoors[theRow][theCol - 1].open();
            this.#createPath(theVisited, theRow, theCol - 1);
        }
    }

    #createRooms(theRoomContent = false) {
        const dimensionArray = this.#myDimension + Dungeon.BUFFER * 2;
        this.#myRooms = new Array(dimensionArray);
        this.#myRooms[0] = new Array(dimensionArray).fill(null);
        this.#myRooms[dimensionArray - Dungeon.BUFFER] = new Array(dimensionArray).fill(null);
        let content;
        for (let row = Dungeon.BUFFER; row < dimensionArray - Dungeon.BUFFER; row++) {
            this.#myRooms[row] = new Array(dimensionArray);
            this.#myRooms[row][0] = null;
            this.#myRooms[row][dimensionArray - Dungeon.BUFFER] = null;
            for (let col = Dungeon.BUFFER; col < dimensionArray - Dungeon.BUFFER; col++) {
                content = theRoomContent ? theRoomContent[row][col] : Room.CONTENT.empty;
                this.#myRooms[row][col] = new Room(new Coordinate(row, col),
                                                   this.#mySouthDoors[row - 1][col], 
                                                   this.#myEastDoors[row][col],
                                                   this.#mySouthDoors[row][col],
                                                   this.#myEastDoors[row][col - 1],
                                                   content);

            }
        }
    }

    #fillRooms() {
        this.#placeRequiredContent();
        this.#placeRepeatedItems();
    }

    #placeRequiredContent() {
        let roomLocation;

        roomLocation = this.#placeSingleContent(Room.CONTENT.entrance);
        this.#myEntrance = this.#myRooms[roomLocation[0]][roomLocation[1]];

        roomLocation = this.#placeSingleContent(Room.CONTENT.exit);
        this.#myExit = this.#myRooms[roomLocation[0]][roomLocation[1]];
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.abstractionPillar);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.encapsulationPillar);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.inheritancePillar);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        roomLocation = this.#placeSingleContent(Room.CONTENT.polymorphismPillar);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
    }

    /**
     * Finds a random, unoccupied room and places the given content there. 
     * 
     * @param {*} theContent content (item, monster, etc) to be placed in a room
     * @return an array containing the row and col of the room the content was placed in
     */
    #placeSingleContent(theContent) {
        let row;
        let col;
        do { 
            row = Math.floor(Math.random() * this.#myDimension) + Dungeon.BUFFER;
            col = Math.floor(Math.random() * this.#myDimension) + Dungeon.BUFFER;
        } while (!this.#myRooms[row][col].isEmpty()); 
        this.#myRooms[row][col].setContent(theContent);
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
                    let placed = false;
                    rand = Math.random();
                    if (rand < Dungeon.#PROB_HEALING_POTION) {
                        this.#myRooms[row][col].setContent(Room.CONTENT.healingPotion);
                        placed = true;
                    }
                    rand = Math.random();
                    if (!placed && rand < Dungeon.#PROB_VISION_POTION) {
                        this.#myRooms[row][col].setContent(Room.CONTENT.visionPotion);
                        placed = true;
                    }
                    rand = Math.random();
                    if (!placed && rand < Dungeon.#PROB_MONSTER) {
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
        if (room.isNorthDoorOpen() && room.isEmpty(theRow - 1, theCol)) {
            this.#placeMonster(theRow - 1, theCol);
        }
        if (room.isSouthDoorOpen() && room.isEmpty(theRow + 1, theCol)) {
            this.#placeMonster(theRow + 1, theCol);
        }
        if (room.isWestDoorOpen() && room.isEmpty(theRow, theCol - 1)){
            this.#placeMonster(theRow, theCol - 1);
        }
        if (room.isEastDoorOpen() && room.isEmpty(theRow, theCol + 1)) {
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

    toJSON() {
        const content = new Array(this.#myDimension);
        for (let row = Dungeon.BUFFER; row < this.#myDimension + Dungeon.BUFFER; row++) {
            content[row] = new Array(this.#myDimension);
            for (let col = Dungeon.BUFFER; col < this.#myDimension + Dungeon.BUFFER; col++) {
                content[row][col] = this.#myRooms[row][col].getContent();
            }
        }
        return {
            __type: Dungeon.name,            
            room_content: content,
            east_doors: this.#myEastDoors,
            south_doors: this.#mySouthDoors,
            entrance_coordinate: this.#myEntrance.getCoordinate(),
            exit_coordinate: this.#myExit.getCoordinate(),
            dimension: this.#myDimension
        }
    }

    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Dungeon.name) {
            throw new TypeError("The JSON is not a dungeon type");
        }
        for (let row = 0; row < theJSON.dimension + Dungeon.BUFFER; row++) {
            for (let col = 0; col < theJSON.dimension + Dungeon.BUFFER; col++) {
                theJSON.east_doors[row][col] = Door.fromJSON(theJSON.east_doors[row][col]);
                theJSON.south_doors[row][col] = Door.fromJSON(theJSON.south_doors[row][col]);
            }
        }
        return new Dungeon(theJSON.dimension/Dungeon.#DIFFICULTY_MULTIPLIER,
                           theJSON.room_content,
                           theJSON.east_doors, 
                           theJSON.south_doors,
                           Coordinate.fromJSON(theJSON.entrance_coordinate), 
                           Coordinate.fromJSON(theJSON.exit_coordinate));
    }
}