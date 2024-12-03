/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import MonsterFactory from "../characters/MonsterFactory.js";
import HealingPotion from "../items/HealingPotion.js";
import VisionPotion from '../items/VisionPotion.js';
import Pillar from "../items/Pillar.js";
import Coordinate from "./Coordinate.js";
import Door from "./Door.js";
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
     * @param {*} theCoordinate the coordinate of the room in the dungeon.
     * @param {*} theNorthDoor the north door shared with the room north to it (if present).
     * @param {*} theEastDoor the east door shared with the room east to it (if present).
     * @param {*} theSouthDoor the south door shared with the room south to it (if present).
     * @param {*} theWestDoor the west door shared with the room west to it (if present).
     * @param {*} theContent 
     */
    constructor(theCoordinate = new Coordinate(0,0), theNorthDoor = new Door(), theEastDoor = new Door(), 
                theSouthDoor = new Door(), theWestDoor = new Door(), theContent = Room.CONTENT.empty) {
        if (theCoordinate === undefined || !theCoordinate instanceof Coordinate) {
            throw TypeError("The given coordinate was not a Coordinate type.");
        }
        if (theNorthDoor === undefined || !theNorthDoor instanceof Door) {
            throw TypeError("The North Door was not a Door type.");
        }
        if (theEastDoor === undefined || !theEastDoor instanceof Door) {
            throw TypeError("The East Door was not a Door type.");
        }
        if (theSouthDoor === undefined || !theSouthDoor instanceof Door) {
            throw TypeError("The South Door was not a Door type.");
        }
        if (theWestDoor === undefined || !theWestDoor instanceof Door) {
            throw TypeError("The West Door was not a Door type. Coordinate");
        }
        this.#myCoordinate = theCoordinate;
        this.#myNorthDoor = theNorthDoor;      
        this.#myEastDoor = theEastDoor;
        this.#mySouthDoor = theSouthDoor;
        this.#myWestDoor = theWestDoor;
        this.#myContent = theContent;
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
     * Checks if the room is a pit.
     * @returns true if the room is a pit.
     */
    isPit() {
        return this.#myContent === Room.CONTENT.pit;
    }

    /**
     * Creates the corresponding item if present and clears the contents
     * of the room.
     * @returns the item in the room if present.
     */
    collectItem() {
        if (this.#myContent === Room.CONTENT.abstractionPillar ) {
            this.#clearContent();
            return new Pillar(Pillar.PillarType.ABSTRACTION);
        } else if (this.#myContent === Room.CONTENT.encapsulationPillar) {
            this.#clearContent();
            return new Pillar(Pillar.PillarType.ENCAPSULATION);
        } else if (this.#myContent === Room.CONTENT.inheritancePillar) {
            this.#clearContent();
            return new Pillar(Pillar.PillarType.INHERITANCE);
        } else if (this.#myContent === Room.CONTENT.polymorphismPillar) {
            this.#clearContent();
            return new Pillar(Pillar.PillarType.POLYMORPHISM);
        } else if (this.#myContent === Room.CONTENT.visionPotion) {
            this.#clearContent();
            return new VisionPotion();
        } else if (this.#myContent === Room.CONTENT.healingPotion) {
            this.#clearContent();
            return new HealingPotion();
        }
        return false;
    }

    /**
     * Creates the corresponding monster if present and clears the contents
     * of the room.
     * @returns the monster in the room if present.
     */
    spawnMonster() {
        const content = this.#myContent;
        if (content === 'o') {
            this.#clearContent();
            return MonsterFactory.createMonster("Ogre");
        } else if (content === 'g') {
            this.#clearContent();
            return MonsterFactory.createMonster("Gremlin");
        } else if (content === 's') {
            this.#clearContent();
            return MonsterFactory.createMonster("Skeleton");
        }
        return false;
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
     * @param {*} theContent the content to set the room's content to.
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
    #clearContent() { 
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