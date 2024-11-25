/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Room from './Room.js';
import Door from './Door.js';
export default class Dungeon {
    /** Multiplier to determine the size of the room given the difficulty level */
    static #DIFFICULTY_MULTIPLIER = 5;
    /** Holds the information for the rooms in the dungeon. */
    #myRooms
    /** The entrance for the dungeon. */
    #myEntrance
    /** The exit for the dungeon. */
    #myExit
    /** The dimension of the maze. */
    #myDimension
    constructor(theDifficulty) {
        this.#myDimension = theDifficulty * Dungeon.#DIFFICULTY_MULTIPLIER;
        this.makeDungeon();
    }

    makeDungeon() {
        const doors = this.#createDoors();
        //this.#generateTraversableMaze(doors);
        this.#createRooms(doors);
        //this.#fillRooms();
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
     * Creates the rooms of the dungeon (excluding the entrance and exit)
     */
    #createRooms(Doors) {
        const eastDoors = Doors.east;
        const southDoors = Doors.south;
        this.#myRooms = [];
        for (let row = 0; row < this.#myDimension; row++) {
            this.#myRooms[row] = [];
            for (let col = 0; col < this.#myDimension; col++) {
                this.#myRooms[row][col] = new Room(southDoors[row][col + 1], 
                                                   eastDoors[row + 1][col + 1], 
                                                   southDoors[row + 1][col + 1], 
                                                   eastDoors[row + 1][col]);
            }
        }
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