/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Coordinate from "../Coordinate.js";
import Door from "./Door.js";
export default class Room {
    #myCoordinate;
    #myNorthDoor;
    #myEastDoor;
    #mySouthDoor;
    #myWestDoor;
    #myContent;
    constructor(theCoordinate, theNorthDoor, theEastDoor, theSouthDoor, theWestDoor, theContent = " ") {
        if (!theCoordinate instanceof Coordinate) {
            throw TypeError("The given coordinate was not a Coordinate type.");
        }
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
        this.#myCoordinate = theCoordinate;
        this.#myNorthDoor = theNorthDoor;      
        this.#myEastDoor = theEastDoor;
        this.#mySouthDoor = theSouthDoor;
        this.#myWestDoor = theWestDoor;
        this.#myContent = theContent;
    }

    isNorthDoorOpen() {
        return this.#myNorthDoor.isOpen();
    }

    isEastDoorOpen() {
        return this.#myEastDoor.isOpen();
    }

    isSouthDoorOpen() {
        return this.#mySouthDoor.isOpen();
    }

    isWestDoorOpen() {
        return this.#myWestDoor.isOpen();
    }

    getCoordinate() {
        return this.#myCoordinate;
    }
    
    setContent(theContent) {
        this.#myContent = theContent;
    }

    clearContent() { 
        this.#myContent = ' ';
    }

    toString() {
        // ALL DOORS
        let str = "";
        if (this.#myNorthDoor.isOpen()) {
            str += "* *\n";
        } else {
            str += "*_*\n";
        }
        if (this.#myWestDoor.isOpen()) {
            str += " ";
        } else {
            str += "|";
        }
        str += this.#myContent;
        if (this.#myEastDoor.isOpen()) {
            str += " \n";
        } else {
            str += "|\n";
        }
        if (this.#mySouthDoor.isOpen()) {
            str += "* *";
        } else {
            str += "*_*";
        }
        return str;
    }
}
