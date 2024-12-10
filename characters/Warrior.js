/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';
import Inventory from './Inventory.js';

/**
 * Class containing common methods and data for the warrior character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Warrior extends Hero {
    /** The hit rate of a hero's special attack. */
    static #HIT_RATE_CRUSHING_BLOW = 40;
    /** The multiplier of additional points the hero's special attack causes. */
    static #MULTIPLIER_CRUSHING_BLOW = 2;
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields and create a Warrior. 
     * @param {string} theName the name of the warrior as a string
     * @param {number} theHP the health points of the warrior as an integer (>=0)
     * @param {number} theDPMin the min damage points of the warrior as an integer (>0)
     * @param {number} theDPMax the max damage points of the warrior as an integer (>=0)
     * @param {number} theAttackSpeed the attack speed of the warrior as an integer (>=0)
     * @param {number} theHitChance the hit chance of the warrior as an integer [1-100]
     * @param {number} theBlockChance the block chance of the warrior.
     * @param {Inventory} theInventory the inventory of the warrior
     * @param {boolean} theFightingStatus the fighting status of the warrior (true=fighting)
     */
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
        theHitChance, theBlockChance, theInventory, theFightingStatus) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
            theHitChance, theBlockChance, theInventory, theFightingStatus);
    }

    /**
     * Creates a Warrior instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Warrior object loaded with the given data.
     * @throws {TypeError} If the __type property is not Warrior.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Warrior.name) {
            throw new TypeError("The JSON is not of warrior type.");
        }
        return new Warrior(theJSON.hero.dungeon_character.name, theJSON.hero.dungeon_character.hp, 
                           theJSON.hero.dungeon_character.dp_min, theJSON.hero.dungeon_character.dp_max, 
                           theJSON.hero.dungeon_character.attack_speed, theJSON.hero.dungeon_character.hit_chance,
                           theJSON.hero.block_chance, Inventory.fromJSON(theJSON.hero.inventory), theJSON.hero.fighting_status);
    }

    /**
     * Returns a JSON representation of the Warrior object. 
     * @returns a JSON representation of the Warrior object.
     */
    toJSON() {
        return {
            __type: Warrior.name, 
            hero: super.toJSON()
        }
    }

    /**
     * Special attack of warrior which allows it to cause more damage if a hit is landed.
     * @param {Monster} theOpponent the opponent the character is facing.
     * @returns true if a successful attack was made and false otherwise.
     */
    specialAttack(theOpponent) {
        super.specialAttack(theOpponent);
        if (!this.isDead() && Math.random() * 100 < Warrior.#HIT_RATE_CRUSHING_BLOW) {
            const rangeDP = this.getDPMax() - this.getDPMin();
            const attackDP = -1 * Warrior.#MULTIPLIER_CRUSHING_BLOW * 
                             (Math.round(Math.random() * rangeDP) + this.getDPMin());
            theOpponent.applyHPChange(attackDP);
            return true;
        }
        return false;
    }
}