/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

/**
 * Class containing common methods and data for all dungeon character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
class DungeonCharacter {
    #myName
    #myHP
    #myDPMin
    #myDPMax
    #myAttackSpeed
    #myHitChange
    /**
     * Class for Dungeon characters containing getter and setter methods for character' statistics.
     * @param {*} theName the name of the dungeon character
     * @param {*} theHP the health points of the dungeon character
     * @param {*} theDPMin the min damage points of the dungeon character
     * @param {*} theDPMax the max damage points of the dungeon character
     * @param {*} theAttackSpeed the attack speed of the dungeon character
     * @param {*} theHitChange the hit change of the dungeon character
     */
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChange) {
        this.#myName = theName;
        this.#myHP = theHP;
        this.#myDPMin = theDPMin;
        this.#myDPMax = theDPMax;
        this.#myAttackSpeed = theAttackSpeed;
        this.#myHitChange = theHitChange;
    }
    
    /**
     * Returns the name of the dungeon character
     * @returns the name of the dungeon character 
     */
    getName() {
        return this.#myName;
    }

    /**
     * Returns the HP of the dungeon character
     * @returns the HP of the dungeon character 
     */
    getHP() {
        return this.#myHP;
    }

    /**
     * Returns the damage point min of the dungeon character
     * @returns the damage point min of the dungeon character 
     */
    getDPMin() {
        return this.#myDPMin;
    }

    /**
     * Returns the damage point max of the dungeon character
     * @returns the damage point max of the dungeon character 
     */
    getDPMax() {
        return this.#myDPMax;
    }

    /**
     * Returns the attack speed of the dungeon character
     * @returns the attack speed of the dungeon character 
     */
    getAttackSpeed() {
        return this.#myAttackSpeed;
    }

    /**
     * Returns the hit chance of the dungeon character
     * @returns the hit chance of the dungeon character 
     */
    getHitChange() {
        return this.#myHitChange;
    }

    /**
     * Sets the HP to the new HP.
     * @param {*} theNewHP the new HP of the dungeon character.
     */
    setHP(theNewHP) {
        if (theNewHP < 0) {
            throw new RangeError("The HP value cannot be negative");
        }
        this.#myHP = theNewHP;
    }
    
    /**
     * This method carries out the attack on the opponent if a hit is landed on the monster.
     * @param {*} theOpponent the opponent the dungeon character is facing.
     * @returns true if the attack was successul and false otherwise.
     */
    attack(theOpponent, autoSuccess=false) {
        if (!this.isDead() && (autoSuccess || Math.random() * 100 < this.#myHitChange)) {
            const rangeDP = this.#myDPMax - this.#myDPMin;
            const attackDP = Math.round(Math.random() * rangeDP) + this.#myDPMin;
            if (attackDP < theOpponent.getHP()) {
                theOpponent.setHP(theOpponent.getHP() - attackDP);
            } else {
// NOTE FOR DEVELOPER: the opponent has died at this point
                theOpponent.setHP(0);
            }
            return true;
        }
        return false;
    }

    /**
     * Checks if the dungeon character has died or not. 
     * @returns true if the dungeon character died and false otherwise.
     */
    isDead() {
        return this.#myHP === 0;
    }

    /**
     * Returns the information of the dungeon character including its name, HP, DPMin, DPMax, AttackSpeed, and HitChange.
     * @returns a string representation of the dungeon character formatted by the information it contains (name, HP, DPMin, DPMax, AttackSpeed, HitChange)
     */
    toString() {
        return `${this.#myName} ${this.#myHP} ${this.#myDPMin} ${this.#myDPMax} ${this.#myAttackSpeed} ${this.#myHitChange}`;
    }
}
module.exports = DungeonCharacter;