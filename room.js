export default class Room {
    #myNorthDoor;
    #mySouthDoor;
    #myWestDoor;
    #myEastDoor;
    #myContent;
    constructor() {
        //Doors are present (N,S,W,E)
        this.#myNorthDoor = true;      
        this.#mySouthDoor = true;
        this.#myWestDoor = true;
        this.#myEastDoor = true;
        this.#myContent = '*';
    }
    setContent(theContent) {
        this.#myContent = theContent;
    }
    clearContent() { 
        this.#myContent = '*';
    }

    /**
     * Returns whether the door at the given side of the room exists. 
     * 
     * @param {*} theDoor must be 'N', 'S', 'W', or 'E'
     * @returns true if the requested door exists, otherwise false
     */
    hasDoor(theDoor) {
        switch(theDoor) {
            case 'N':
                return this.#myNorthDoor;
                break;
            case 'S':
                return this.#mySouthDoor;
                break;
            case 'W':
                return this.#myWestDoor;
                break;
            case 'E':
                return this.#myEastDoor;
                break;
            default:
                throw new TypeError('getDoor() only accepts char parameters N, S, W, E');
                break;
        }
    }

    isEmpty() {
        return this.#myContent === '*';
    }

    toString() {
        return this.#myContent;
    }
}

// module.exports = Room;