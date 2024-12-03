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

    toJSON() {
        return {
          x: this.#myX,
          y: this.#myY
        };
    }

    toString() {
        return `${this.#myX} ${this.#myY}`;
    }
}