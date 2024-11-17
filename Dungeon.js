// const Room = require('./Room.js');
import Room from './Room.js';
class Dungeon {
    /** Multiplier to determine the size of the room given the difficulty level */
    static DIFFICULTY_MULTIPLIER = 5;
    /** Probability that a room contains a healing potion */
    static PROB_HEALING_POTION = 0.1;
    /** Probability that a room contains a vision potion */
    static PROB_VISION_POTION = 0.1;
    /** Probability that a room contains a monster */
    static PROB_MONSTER = 0.15;
    /** Probability that a monster is an ogre */
    static PROB_OGRE = 0.6;
    /** Probability that a monster is a gremlin */
    static PROB_GREMLIN = 0.1;
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
        this.createRooms();
        // this.generateTraversableMaze();
        this.fillRooms();
    }

    /** 
     * Sets the dimensions of the maze and the access points of the maze (entrance and exit).
     */
    generateTraversableMaze() {

    }

    /**
     * Creates the rooms of the dungeon (excluding the entrance and exit)
     */
    createRooms() {
        // Rooms structure
        // door (N, S, E, W), entrance exit pillar, has Potion
        this.#myRooms = [];
        for (let row = 0; row < this.#myDimension; row++) {
            this.#myRooms[row] = [];
            for (let col = 0; col < this.#myDimension; col++) {
                this.#myRooms[row][col] = new Room();
            }
        }
    }

    /**
     * Key:
     * 
     *     Items
     *     H - Healing Potion
     *     V - Vision Potion
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

        // 1. place entrance and exit
        // 2. place pillars
        // 2a. place monsters in rooms adjacent to pillars
        // 3. place remaining monsters and items at designated rates

        let occupiedRooms = [];
        let roomLocation;

        roomLocation = this.#placeSingleContent('-', occupiedRooms);
        roomLocation = this.#placeSingleContent('+', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('A', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('E', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('I', occupiedRooms);
        this.#surroundWithMonsters(roomLocation[0], roomLocation[1]);
        roomLocation = this.#placeSingleContent('P', occupiedRooms);
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
                console.log('yeet');
                this.#placeMonster(northRoom);
                console.log(northRoom.toString());
            }
        }
        if (theRow + 1 < this.#myDimension && room.hasDoor('S')) {
            //console.log('has south');
            let southRoom = this.#myRooms[theRow + 1][theCol];
            if (southRoom.isEmpty()) {
                this.#placeMonster(southRoom);
            }
        }
        if (theCol - 1 >= 0 && room.hasDoor('W')) {
            //console.log('has west');
            let westRoom = this.#myRooms[theRow][theCol - 1];
            if (westRoom.isEmpty()) {
                this.#placeMonster(westRoom);
            }
        }
        if (theCol + 1 < this.#myDimension && room.hasDoor('E')) {
            //console.log('has east');
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

        /*
        console.log('rand: ' + rand);
        switch(rand) {
            case rand < this.PROB_OGRE:
                theRoom.setContent('o');
                console.log('boom ogre');
                break;
            case rand < this.PROB_GREMLIN + this.PROB_OGRE:
                theRoom.setContent('g');
                console.log('boom grem');
                break;
            case rand < this.PROB_SKELETON + this.PROB_GREMLIN + this.PROB_OGRE:
                theRoom.setContent('s');
                console.log('boom skel');
                break;
            default:
        }
        console.log(theRoom.toString());
        */
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