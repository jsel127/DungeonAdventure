/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Door from "./Door";
export default class Room {
    #myNorthDoor;
    #myEastDoor;
    #mySouthDoor;
    #myWestDoor;
    #myContent;
    constructor(theNorthDoor, theEastDoor, theSouthDoor, theWestDoor, theContent = " ") {
        if (!theNorthDoor instanceof Door) {
            throw TypeError("The North Door was not a Door type.");
        }
        if (!theEastDoor instanceof Door) {
            throw TypeError("The East Door was not a Door type.");
        }
        if (!theSouthDoor instanceof Door) {
            throw TypeError("The South Door was not a Door type.");
        }
        if (!theWestDoor instanceof Door) {
            throw TypeError("The West Door was not a Door type.");
        }
        this.#myNorthDoor = theNorthDoor;      
        this.#myEastDoor = theEastDoor;
        this.#mySouthDoor = theSouthDoor;
        this.#myWestDoor = theWestDoor;
        this.#myContent = theContent;
    }
    
    setContent(theContent) {
        this.#myContent = theContent;
    }

    clearContent() { 
        this.#myContent = ' ';
    }

    toString() {
        return this.#myContent + ` ${this.#myNorthDoor} ${this.#myEastDoor} ${this.#mySouthDoor} ${this.#myWestDoor}`;
    }
}