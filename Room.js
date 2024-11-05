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

    toString() {
        return this.#myContent;
    }
}

// module.exports = Room;