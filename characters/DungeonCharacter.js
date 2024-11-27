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
export default class DungeonCharacter {
    /** The name of the dungeon character. */
    #myName
    /** The HP of the dungeon character. */
    #myHP
    /** The DP Min of the dungeon character. */
    #myDPMin
    /** The DP Max of the dungeon character. */
    #myDPMax
    /** The Attack Speed of the dungeon character. */
    #myAttackSpeed
    /** The Hit Chance (0-100) of the dungeon character. */
    #myHitChance
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields.
     * A DungeonCharacter cannot be directly instanciated.
     * @param {*} theName the name of the dungeon character
     * @param {*} theHP the health points of the dungeon character
     * @param {*} theDPMin the min damage points of the dungeon character
     * @param {*} theDPMax the max damage points of the dungeon character
     * @param {*} theAttackSpeed the attack speed of the dungeon character
     * @param {*} theHitChance the hit chance of the dungeon character
     */
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance) {
        if (this.constructor === DungeonCharacter) {
            throw new TypeError("DungeonCharacter cannot be instanciated directly.");
        }
        if (theName === null) {
            throw new TypeError("The name must be specified.");
        }
        if (!(Number.isInteger(theHP) && Number.isInteger(theDPMax) && Number.isInteger(theAttackSpeed) &&
            Number.isInteger(theDPMin) && Number.isInteger(theHitChance) && typeof theName === "string")) {
            throw new TypeError("The argument(s) do not match the expected type of data.");
        }
        if (theHP <= 0 || theDPMax <= 0 || theAttackSpeed <= 0) {
            throw new RangeError("The HP, DPMax, or AttackSpeed is not greater than 0.");
        } 
        if (theDPMin < 0) {
            throw new RangeError("The DPMin is negative");
        }
        if (theHitChance < 0 || theHitChance > 100 ) {
            throw new RangeError("The Hit Chance is not within the valid range [0,100].");
        }
        this.#myName = theName;
        this.#myHP = theHP;
        this.#myDPMin = theDPMin;
        this.#myDPMax = theDPMax;
        this.#myAttackSpeed = theAttackSpeed;
        this.#myHitChance = theHitChance;
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
    getHitChance() {
        return this.#myHitChance;
    }

    /**
     * Sets the HP to the new HP.
     * @param {*} theNewHP the new HP of the dungeon character.
     */
    setHP(theNewHP) {
        if (!Number.isInteger(theNewHP)) {
            throw new TypeError("The new HP value is not an integer.");
        }
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
    attack(theOpponent, theBlocked = false, autoSuccess=false) {
        if (theBlocked || !this.isDead() && (autoSuccess || Math.random() * 100 < this.#myHitChance)) {
            const rangeDP = this.#myDPMax - this.#myDPMin;
            const attackDP = Math.round(Math.random() * rangeDP) + this.#myDPMin;
            if (attackDP < theOpponent.getHP()) {
                theOpponent.setHP(theOpponent.getHP() - attackDP);
            } else {
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
        return `${this.#myName} ${this.#myHP} ${this.#myDPMin} ${this.#myDPMax} ${this.#myAttackSpeed} ${this.#myHitChance}`;
    }
}