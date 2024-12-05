export default class Coordinate {
    #myX
    #myY
    constructor(theX, theY) {
        if (!Number.isInteger(theX) || !Number.isInteger(theY) 
            || theX < 0 || theY < 0) {
            throw new RangeError("Non-integer and negative coordinates are not supported");
        }
        this.#myX = theX;
        this.#myY = theY;
    }
    getX() {
        return this.#myX;
    }

    getY() {
        return this.#myY;
    }

    setX(theX) {
        if (!Number.isInteger(theX) || theX < 0) {
            throw new RangeError("Negative coordinates are not supported");
        }
        this.#myX = theX;
    }

    setY(theY) {
        if (!Number.isInteger(theY) || theY < 0) {
            throw new RangeError("Negative coordinates are not supported");
        }
        this.#myY = theY;
    }    
    
    toString() {
        return `${this.#myX} ${this.#myY}`;
    }

    toJSON() {
        return {
            __type: Coordinate.name,
            x: this.#myX,
            y: this.#myY
        };
    }

    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON !== Coordinate.name) {
            throw new TypeError("The JSON is not of coordinate type.");
        }
        return new Coordinate(theJSON.x, theJSON.y);
    }
}