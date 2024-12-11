/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Dungeon from "./Dungeon.js";
/**
 * Test Coordinate class Negative coordinates are not supported 
 * and cannot be less than the buffer of the dungeon.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Coordinate {
    /** The row of the coordinate in a 2D array. */
    #myRow
    /** The col of the coordinate in a 2D array. */
    #myCol
    /**
     * Stores and adjusts the row and col of some location in a 2D array. 
     * @param {number} theRow the row of the coordinate
     * @param {number} theCol the column of the coordinate
     * @throws {TypeError} if the given arguments are not integers.
     * @throws {RangeError} if the given col/row is not in a valid range (less than 1)
     */
    constructor(theRow, theCol) {
        if (!Number.isInteger(theRow) || !Number.isInteger(theCol)) {
            throw new TypeError("The given arguments are not valid types (expecting integers)");
        }
        if (theRow < Dungeon.BUFFER || theCol < Dungeon.BUFFER) {
            throw new RangeError("Non-integer and negative coordinates are not supported");
        }
        this.#myRow = theRow;
        this.#myCol = theCol;
    }
    /**
     * Creates a Coordinate instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Coordinate object loaded with the given data.
     * @throws {TypeError} If the __type property is not Coordinate.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Coordinate.name) {
            throw new TypeError("The JSON is not of coordinate type.");
        }
        return new Coordinate(theJSON.row, theJSON.col);
    }

    /**
     * Returns a JSON representation of the Coordinate object. 
     * @returns a JSON representation of the Coordinate object.
     */
    toJSON() {
        return {
            __type: Coordinate.name,
            row: this.#myRow,
            col: this.#myCol
        };
    }

    /**
     * Returns the row of the coordinate.
     * @returns the row of the coordinate.
     */
    getRow() {
        return this.#myRow;
    }

    /**
     * Returns the col of the coordinate.
     * @returns the col of the coordinate.
     */
    getCol() {
        return this.#myCol;
    }

    /**
     * The new row to set the coordinate to.
     * @param {numeric} theRow the new row number to set coordinate to.
     * @throws {TypeError} if the row is not an integer.
     * @throws {RangeError} if the row is less than the Dungeon's buffer
     */
    setRow(theRow) {
        if (!Number.isInteger(theRow)) {
            throw new TypeError("Expecting an integer received a " + (typeof theRow));
        } 
        if (theRow < Dungeon.BUFFER) {
            throw new RangeError("Negative coordinates are not supported");
        }
        this.#myRow = theRow;
    }

    /**
     * The new col to set the coordinate to.
     * @param {numeric} theCol the new col number to set coordinate to.
     * @throws {TypeError} if the col is not an integer.
     * @throws {RangeError} if the col is less than the Dungeon's buffer
     */
    setCol(theCol) {
        if (!Number.isInteger(theCol)) {
            throw new TypeError("Expecting an integer received a " + (typeof theCol));
        } 
        if (theCol < 0) {
            throw new RangeError("Negative coordinates are not supported");
        }
        this.#myCol = theCol;
    }    
    
    /**
     * A string of the row col
     * @returns a string of the row col
     */
    toString() {
        return `${this.#myRow} ${this.#myCol}`;
    }
}