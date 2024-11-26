/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import MonsterFactory from "../characters/MonsterFactory.js";
import HealingPotion from "../HealingPotion.js";
import Pillar from "../Pillar.js";
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
        empty: '*'
    });
    #myCoordinate;
    #myNorthDoor;
    #myEastDoor;
    #mySouthDoor;
    #myWestDoor;
    #myContent;
    constructor(theCoordinate, theNorthDoor, theEastDoor, theSouthDoor, theWestDoor, theContent = Room.CONTENT.empty) {
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

    isEmpty() {
        return this.#myContent === Room.CONTENT.empty;
    }

    isExit() {
        return this.#myContent === Room.CONTENT.exit;
    }

    isPit() {
        return this.#myContent === Room.CONTENT.pit;
    }

    collectItem() {
        if (this.#myContent === Room.CONTENT.abstractionPillar ) {
            return new Pillar(Pillar.PillarType.ABSTRACTION);
        } else if (this.#myContent === Room.CONTENT.encapsulationPillar) {
            return new Pillar(Pillar.PillarType.ENCAPSULATION);
        } else if (this.#myContent === Room.CONTENT.inheritancePillar) {
            return new Pillar(Pillar.PillarType.INHERITANCE);
        } else if (this.#myContent === Room.CONTENT.polymorphismPillar) {
            return new Pillar(Pillar.PillarType.POLYMORPHISM);
        } else if (this.#myContent === Room.CONTENT.visionPotion) {
            return new VisionPotion();
        } else if (this.#myContent === Room.CONTENT.healingPotion) {
            return new HealingPotion();
        }
        return false;
    }

    spawnMonster() {
        if (this.#hasMonster()) {
            return MonsterFactory.createMonster(this.#myContent);
        }
        return false;
    }

    #hasItem() {
        return this.#myContent === Room.CONTENT.abstractionPillar ||
               this.#myContent === Room.CONTENT.encapsulationPillar ||
               this.#myContent === Room.CONTENT.inheritancePillar ||
               this.#myContent === Room.CONTENT.polymorphismPillar ||
               this.#myContent === Room.CONTENT.visionPotion ||
               this.#myContent === Room.CONTENT.healingPotion;
    }
    #hasMonster() {
        return this.#myContent === Room.CONTENT.gremlin ||
               this.#myContent === Room.CONTENT.ogre ||
               this.#myContent === Room.CONTENT.skeleton;
    }

    getContent() {
        return this.#myContent;
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
