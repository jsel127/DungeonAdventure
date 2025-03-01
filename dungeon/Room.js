/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import MonsterFactory from "../characters/MonsterFactory.js";
import Coordinate from "./Coordinate.js";
import Door from "./Door.js";
import Dungeon from "./Dungeon.js";
/**
 * Coordinate class Negative coordinates are not supported 
 * and cannot be less than the buffer of the dungeon.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Room {
    /** Object of content in the room and their corresponding symbol */
    static CONTENT = Object.freeze({
        healingPotion: '#',
        visionPotion: '/',
        abstractionPillar: 'A',
        encapsulationPillar: 'E',
        inheritancePillar: 'I',
        polymorphismPillar: 'P',
        ogre: 'o',
        gremlin: 'g',
        skeleton: 's',
        entrance: '-',
        exit: '+',
        pit: 'x',
        empty: ' '
    });

    /** The coordinate of the room in the dungeon. */
    #myCoordinate;
    /** The north door of the room. */
    #myNorthDoor;
    /** The east door of the room. */
    #myEastDoor;
    /** The south door of the room. */
    #mySouthDoor;
    /** The west door of the room. */
    #myWestDoor;
    /** 
     * The content of the room which can be any of the 
     * things specified in the CONTENT static field. 
     */
    #myContent;
    /**
     * Creates a room which contains the doors to other rooms, content, and a 
     * coordinate to track its location in the dungeon.
     * @param {Coordinate} theCoordinate the coordinate of the room in the dungeon.
     * @param {Door} theNorthDoor the north door shared with the room north to it (if present).
     * @param {Door} theEastDoor the east door shared with the room east to it (if present).
     * @param {Door} theSouthDoor the south door shared with the room south to it (if present).
     * @param {Door} theWestDoor the west door shared with the room west to it (if present).
     * @param {string} theContent the contents of the room
     * @throws {TypeError} if given doors are not of Door type, coordinates not Coordinate type,
     *                     of content is not a string.
     */
    constructor(theCoordinate = new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), theNorthDoor = new Door(), 
                theEastDoor = new Door(), theSouthDoor = new Door(), theWestDoor = new Door(), 
                theContent = Room.CONTENT.empty) {
        if (theCoordinate === undefined || !(theCoordinate instanceof Coordinate)) {
            throw TypeError("The given coordinate was not a Coordinate type.");
        }
        if (theNorthDoor === undefined || !(theNorthDoor instanceof Door)) {
            throw TypeError("The North Door was not a Door type.");
        }
        if (theEastDoor === undefined || !(theEastDoor instanceof Door)) {
            throw TypeError("The East Door was not a Door type.");
        }
        if (theSouthDoor === undefined || !(theSouthDoor instanceof Door)) {
            throw TypeError("The South Door was not a Door type.");
        }
        if (theWestDoor === undefined || !(theWestDoor instanceof Door)) {
            throw TypeError("The West Door was not a Door type. Coordinate");
        }
        if (typeof theContent !== "string") {
            throw TypeError("The content was not a string.");
        }
        this.#myCoordinate = theCoordinate;
        this.#myNorthDoor = theNorthDoor;      
        this.#myEastDoor = theEastDoor;
        this.#mySouthDoor = theSouthDoor;
        this.#myWestDoor = theWestDoor;
        this.#myContent = theContent;
    }

    /**
     * Creates a Room instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Room object loaded with the given data.
     * @throws {TypeError} If the __type property is not Room.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Room.name) {
            throw new TypeError("The JSON is not a room type");
        }
        return new Room(Coordinate.fromJSON(theJSON.coordinate), 
                        Door.fromJSON(theJSON.north_door), 
                        Door.fromJSON(theJSON.east_door), 
                        Door.fromJSON(theJSON.south_door),
                        Door.fromJSON(theJSON.west_door), 
                        theJSON.content);
    }

    /**
     * Returns a JSON representation of the Room object. 
     * @returns a JSON representation of the Room object.
     */
    toJSON() {
        return {
            __type: Room.name,
            coordinate: this.#myCoordinate,
            north_door: this.#myNorthDoor,
            east_door: this.#myEastDoor,
            south_door: this.#mySouthDoor,
            west_door: this.#myWestDoor,
            content: this.#myContent
        }
    }

    /**
     * Creates the corresponding monster if present and clears the contents
     * of the room.
     * @returns the monster in the room if present.
     */
    spawnMonster() {
        const content = this.#myContent;
        if (content === 'o') {
            this.clearContent();
            return MonsterFactory.createMonster("Ogre");
        } else if (content === 'g') {
            this.clearContent();
            return MonsterFactory.createMonster("Gremlin");
        } else if (content === 's') {
            this.clearContent();
            return MonsterFactory.createMonster("Skeleton");
        }
        return false;
    }
    
    /**
     * Checks if the north door is open.
     * @returns true if the north door is open.
     */
    isNorthDoorOpen() {
        return this.#myNorthDoor.isOpen();
    }

    /**
     * Checks if the east door is open.
     * @returns true if the east door is open.
     */
    isEastDoorOpen() {
        return this.#myEastDoor.isOpen();
    }
    /**
     * Checks if the south door is open.
     * @returns true if the south door is open.
     */
    isSouthDoorOpen() {
        return this.#mySouthDoor.isOpen();
    }
    /**
     * Checks if the west door is open.
     * @returns true if the west door is open.
     */
    isWestDoorOpen() {
        return this.#myWestDoor.isOpen();
    }

    /**
     * Checks if the room is empty.
     * @returns true if the room is empty.
     */
    isEmpty() {
        return this.#myContent === Room.CONTENT.empty;
    }

    /**
     * Checks if the room is an exit.
     * @returns true if the room is an exit.
     */
    isExit() {
        return this.#myContent === Room.CONTENT.exit;
    }

    /**
     * Checks if the room is the entrance.
     * @returns true if the room is the entrance.
     */
    isEntrance() {
        return this.#myContent === Room.CONTENT.entrance;
    }

    /**
     * Checks if the room is a pit.
     * @returns true if the room is a pit.
     */
    isPit() {
        return this.#myContent === Room.CONTENT.pit;
    }

    

    /**
     * Gets the contents of the room.
     * @returns the contents of the room as a character.
     */
    getContent() {
        return this.#myContent;
    }

    /**
     * Gets the coordinates of the room in the dungeon.
     * @returns a coordinate object of the room in the dungeon.
     */
    getCoordinate() {
        return this.#myCoordinate;
    }
    
    /**
     * Sets the content to the given content.
     * @param {string} theContent the content to set the room's content to.
     * @throws {TypeError} if the content is not part of the valid room content.
     */
    setContent(theContent) {
        if (!Object.values(Room.CONTENT).includes(theContent)) {
            throw new TypeError("This is not a valid type of content. " + 
                                "The valid content is in the static field CONTENT")
        }
        if (this.isEmpty()) {
            this.#myContent = theContent;
        }
    }

    /**
     * Clears the contents of the room.
     */
    clearContent() { 
        this.#myContent = Room.CONTENT.empty;
    }

    /**
     * Returns a string representation of the room. 
     * This includes the status of the doors and the content of the room.
     * @returns a string representation of the room.
     */
    toString() {
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
