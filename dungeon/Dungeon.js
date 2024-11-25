import Coordinate from './Coordinate.js';
import Room from '../Room.js';
class Dungeon {
    /** Multiplier to determine the size of the room given the difficulty level */
    static DIFFICULTY_MULTIPLIER = 5;
    /** Probability that a room contains a healing potion */
    static PROB_HEALING_POTION = 0.1;
    /** Probability that a room contains a vision potion */
    static PROB_VISION_POTION = 0.1;
    /** Probability that a room contains a monster */
    static PROB_MONSTER = 0.1;
    /** Probability that a monster is an ogre */
    static PROB_OGRE = 0.4;
    /** Probability that a monster is a gremlin */
    static PROB_GREMLIN = 0.3;
    /** Probability that a monster is a skeleton */
    static PROB_SKELETON = 0.3;
    /** Holds the information for the rooms in the dungeon. */
    #myRooms
    /** The entrance for the dungeon. */
    #myEntrance
    /** The exit for the dungeon. */
    #myExit
    /** The dimension of the maze. */
    #myDimension
    constructor(theDifficulty) {
        this.#myDimension = theDifficulty * Dungeon.DIFFICULTY_MULTIPLIER;
        this.makeDungeon();
    }

    makeDungeon() {
        Doors = this.createDoors();
        this.generateTraversableMaze(Doors);
        this.createRooms(Doors);
        this.fillRooms();
    }

    #createDoors() {
        EastDoors = [];
        SouthDoors = [];
        for (let row = 0; row < this.#myDimension; row++) {
            EastDoors[row] = [];
            SouthDoors[row] = [];
            for (let col = 0; col < this.#myDimension; col++) {
                EastDoors[row][col] = new Door();
                SouthDoors[row][col] = new Door();
            }
        }
        return {eastdoors: EastDoors, southdoors: SouthDoors};
    }

    /** 
     * Sets the dimensions of the maze and the access points of the maze (entrance and exit).
     */
    generateTraversableMaze() {

    }

    /**
     * Creates the rooms of the dungeon (excluding the entrance and exit)
     */
    createRooms(Doors) {
        EastDoors = Doors.eastdoors;
        SouthDoors = Doors.southdoors;
        this.#myRooms = [];
        for (let row = 0; row < this.#myDimension; row++) {
            this.#myRooms[row] = [];
            for (let col = 0; col < this.#myDimension; col++) {
                this.#myRooms[row][col] = new Room(new Coordinate(row, col),
                                                   SouthDoors[row][col + 1], 
                                                   EastDoors[row + 1][col + 1], 
                                                   SouthDoors[row + 1][col + 1], 
                                                   EastDoors[row + 1][col]);
            }
        }
    }

    /**
     * Key:
     * 
     *     Items
     *     # - Healing Potion (# is leet H)
     *     / - Vision Potion (/ is leet V)
     *     A, E, I, P - Pillars
     * 
     *     Monsters
     *     o - ogre
     *     g - gremlin
     *     s - skeleton
     * 
     *     Other
     *     - - entrance
     *     + - exit
     *     x - pit (if included)
     *     * - empty
     */
    fillRooms() {
        // TODO: fill rooms with items based on their corresponding quantities (ratio based on 
        // number of rooms) if a rooms already contains an item it should put it somewhere else
        // where a pillar is placed a monster should be placed in one of the adjacent rooms

        let occupiedRooms = [];
        let roomLocation;

        // Place entrance, exit, pillars; surround exit and pillars with monsters
        roomLocation = this.#placeSingleContent('-', occupiedRooms);
        this.#myEntrance = this.#myRooms[roomLocation[0]][roomLocation[1]];
        roomLocation = this.#placeSingleContent('+', occupiedRooms);
        this.#myExit = this.#myRooms[roomLocation[0]][roomLocation[1]];
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('A', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('E', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('I', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('P', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);

        // Place potions and monsters throughout maze
        for (let row = 0; row < this.#myDimension; row++) {
            for (let col = 0; col < this.#myDimension; col++) {
                if (this.#myRooms[row][col].isEmpty()) {
                    let rand = Math.random();
                    if (rand < Dungeon.PROB_HEALING_POTION) {
                        this.#myRooms[row][col].setContent('#');
                    }
                    else if (rand < Dungeon.PROB_VISION_POTION + Dungeon.PROB_HEALING_POTION) {
                        this.#myRooms[row][col].setContent('/');
                    }
                    else if (rand < Dungeon.PROB_MONSTER + Dungeon.PROB_VISION_POTION + Dungeon.PROB_HEALING_POTION) {
                        this.#placeMonster(this.#myRooms[row][col]);
                    }
                }
            }
        }

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
     * Given a room, places a monster in every adjacent room that connects to it through a door. 
     * Note that if an adjavent room already has a pillar, entrance, or exit, a monster will not be placed. 
     * 
     * @param {*} theRow row # of the room
     * @param {*} theCol col # of the room
     */
    #surroundWithMonsters(theRow, theCol) {
        let room = this.#myRooms[theRow][theCol];
        if (theRow - 1 >= 0 && room.hasDoor('N')) {
            //console.log('has north');
            let northRoom = this.#myRooms[theRow - 1][theCol];
            if (northRoom.isEmpty()) {
                this.#placeMonster(northRoom);
            }
        }
        if (theRow + 1 < this.#myDimension && room.hasDoor('S')) {
            let southRoom = this.#myRooms[theRow + 1][theCol];
            if (southRoom.isEmpty()) {
                this.#placeMonster(southRoom);
            }
        }
        if (theCol - 1 >= 0 && room.hasDoor('W')) {
            let westRoom = this.#myRooms[theRow][theCol - 1];
            if (westRoom.isEmpty()) {
                this.#placeMonster(westRoom);
            }
        }
        if (theCol + 1 < this.#myDimension && room.hasDoor('E')) {
            let eastRoom = this.#myRooms[theRow][theCol + 1];
            if (eastRoom.isEmpty()) {
                this.#placeMonster(eastRoom);
            }
        }
    }

    #placeMonster(theRoom) {
        let rand = Math.random();

        if (rand < Dungeon.PROB_OGRE) {
            theRoom.setContent('o');
        }
        else if (rand < Dungeon.PROB_GREMLIN + Dungeon.PROB_OGRE) {
            theRoom.setContent('g');
        }
        else { // skeleton
            theRoom.setContent('s');
        }
    }

    getEntrance() {
        return this.#myEntrance;
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
                str += this.#myRooms[row][col].toString();
            }
            str += '\n';
        }
        return str;
    }
}

const test = new Dungeon(2);
console.log(test.toString());