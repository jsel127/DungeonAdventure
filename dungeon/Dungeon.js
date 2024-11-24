/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Room from './Room.js';
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
        this.createRooms();
        // this.generateTraversableMaze();
        // this.fillRooms();
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

    fillRooms() {
        // TODO: fill rooms with items based on their corresponding quantities (ratio based on number of rooms) if a rooms already contains an item it should put it somewhere else
        // where a pillar is placed a monster should be placed in one of the adjacent rooms
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