/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';
import Inventory from './Inventory.js';

/**
 * Class containing common methods and data for all thief character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Thief extends Hero {
    /** The hit rate of the suprise attack. */
    static #HIT_RATE_SUPRISE_ATTACK = 40;
    /** The fail rate of the suprise attack. */    
    static #FAIL_RATE_SUPRISE_ATTACK = 20;
    /** The max number of suprise attacks the thief can get in. */
    static #NUMBER_SUPRISE_ATTACK = 2;
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields and create a Thief. 
     * @param {string} theName the name of the thief as a string
     * @param {number} theHP the health points of the thief as an integer (>=0)
     * @param {number} theDPMin the min damage points of the thief as an integer (>0)
     * @param {number} theDPMax the max damage points of the thief as an integer (>=0)
     * @param {number} theAttackSpeed the attack speed of the thief as an integer (>=0)
     * @param {number} theHitChance the hit chance of the thief as an integer [1-100]
     * @param {number} theBlockChance the block chance of the thief.
     * @param {Inventory} theInventory the inventory of the thief
     * @param {boolean} theFightingStatus the fighting status of the thief (true=fighting)
     */
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
        theHitChance, theBlockChance, theInventory, theFightingStatus) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
            theHitChance, theBlockChance, theInventory, theFightingStatus);
    }

    /**
     * Creates a Thief instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Thief object loaded with the given data.
     * @throws {TypeError} If the __type property is not Thief.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Thief.name) {
            throw new TypeError("The JSON is not of thief type.");
        }
        return new Thief(theJSON.hero.dungeon_character.name, theJSON.hero.dungeon_character.hp, 
                         theJSON.hero.dungeon_character.dp_min, theJSON.hero.dungeon_character.dp_max, 
                         theJSON.hero.dungeon_character.attack_speed, theJSON.hero.dungeon_character.hit_chance,
                         theJSON.hero.block_chance, Inventory.fromJSON(theJSON.hero.inventory), theJSON.hero.fighting_status);
    }

    /**
     * Returns a JSON representation of the Thief object. 
     * @returns a JSON representation of the Thief object.
     */
    toJSON() {
        return {
            __type: Thief.name, 
            hero: super.toJSON()
        }
    }

    /**
     * Special attack of thief which allows it to get in extra attacks.
     * @param {Monster} theOpponent the opponent the character is facing.
     * @returns true if a successful attack was made and false otherwise.
     */
    specialAttack(theOpponent) {
        super.specialAttack(theOpponent);
        const randomInt = Math.round(Math.random() * 100);
        if (!this.isDead()) {
            if (randomInt < Thief.#HIT_RATE_SUPRISE_ATTACK) {
                for (let i = 0; i < Thief.#NUMBER_SUPRISE_ATTACK; i++) {
                    this.attack(theOpponent, true);
                }
                return true;
            } else if (randomInt > Thief.#HIT_RATE_SUPRISE_ATTACK + Thief.#FAIL_RATE_SUPRISE_ATTACK) {
                this.attack(theOpponent, true);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}