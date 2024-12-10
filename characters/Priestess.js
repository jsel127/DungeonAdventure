/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';
import Inventory from './Inventory.js';

/**
 * Class containing common methods and data for all priestess character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Priestess extends Hero {
    /** The min heal percent of the priestess. */
    static #HEAL_MIN_PERCENT = 10;
    /** The max heal percent of the priestess. */
    static #HEAL_MAX_PERCENT = 20;
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields and create a Priestess. 
     * @param {string} theName the name of the priestess as a string
     * @param {number} theHP the health points of the priestess as an integer (>=0)
     * @param {number} theDPMin the min damage points of the priestess as an integer (>0)
     * @param {number} theDPMax the max damage points of the priestess as an integer (>=0)
     * @param {number} theAttackSpeed the attack speed of the priestess as an integer (>=0)
     * @param {number} theHitChance the hit chance of the priestess as an integer [1-100]
     * @param {number} theBlockChance the block chance of the priestess.
     * @param {Inventory} theInventory the inventory of the priestess
     * @param {boolean} theFightingStatus the fighting status of the priestess (true=fighting)
     */
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
        theHitChance, theBlockChance, theInventory, theFightingStatus) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
            theHitChance, theBlockChance, theInventory, theFightingStatus);
    }

    /**
     * Creates a Priestess instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Priestess object loaded with the given data.
     * @throws {TypeError} If the __type property is not Priestess.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Priestess.name) {
            throw new TypeError("The JSON is not of priestess type.");
        }
        return new Priestess(theJSON.hero.dungeon_character.name, theJSON.hero.dungeon_character.hp, 
                             theJSON.hero.dungeon_character.dp_min, theJSON.hero.dungeon_character.dp_max, 
                             theJSON.hero.dungeon_character.attack_speed, theJSON.hero.dungeon_character.hit_chance,
                             theJSON.hero.block_chance, Inventory.fromJSON(theJSON.hero.inventory), theJSON.hero.fighting_status);
    }

    /**
     * Returns a JSON representation of the Priestess object. 
     * @returns a JSON representation of the Priestess object.
     */
    toJSON() {
        return {
            __type: Priestess.name,
            hero: super.toJSON()
        }
    }

    /**
     * Defines the heal special attack for the Priestess. The priestess can heal 
     * themselves based on the amount of HP they have remaining.
     * The heal may fail if they are too low on HP.
     * @param {Monster} theOpponent the opponent they are fighting.
     * @returns true if they were able to heal themselves (i.e. HP was gained) 
     * and false if no HP was gained.
     */
    specialAttack(theOpponent) {
        super.specialAttack(theOpponent);
        const minHeal = Math.round(this.getHP() * Priestess.#HEAL_MIN_PERCENT / 100);
        const maxHeal = Math.round(this.getHP() * Priestess.#HEAL_MAX_PERCENT / 100);
        const rangeHeal = maxHeal - minHeal;
        const gainedHP = Math.round(Math.random() * rangeHeal) + minHeal;
        if (gainedHP > 0) {
            this.setHP(this.getHP() + gainedHP);
            return true;
        }
        return false;
    }
}