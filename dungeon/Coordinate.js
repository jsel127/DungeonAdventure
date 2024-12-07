export default class Coordinate {
    #myRow
    #myCol
    constructor(theRow, theCol) {
        if (!Number.isInteger(theRow) || !Number.isInteger(theCol) 
            || theRow < 0 || theCol < 0) {
            throw new RangeError("Non-integer and negative coordinates are not supported");
        }
        this.#myRow = theRow;
        this.#myCol = theCol;
    }
    getRow() {
        return this.#myRow;
    }

    getCol() {
        return this.#myCol;
    }

    setRow(theRow) {
        if (!Number.isInteger(theRow) || theRow < 0) {
            throw new RangeError("Negative coordinates are not supported");
        }
        this.#myRow = theRow;
    }

    setCol(theCol) {
        if (!Number.isInteger(theCol) || theCol < 0) {
            throw new RangeError("Negative coordinates are not supported");
        }
        this.#myCol = theCol;
    }    
    
    toString() {
        return `${this.#myRow} ${this.#myCol}`;
    }

    toJSON() {
        return {
            __type: Coordinate.name,
            row: this.#myRow,
            col: this.#myCol
        };
    }

    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Coordinate.name) {
            throw new TypeError("The JSON is not of coordinate type.");
        }
        return new Coordinate(theJSON.row, theJSON.col);
    }
}