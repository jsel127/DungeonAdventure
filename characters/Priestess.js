/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';
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
     * @param {*} theName the name of the Priestess.
     * @param {*} theHP the health points of the Priestess.
     * @param {*} theDPMin the min damage points of the Priestess.
     * @param {*} theDPMax the max damage points of the Priestess.
     * @param {*} theAttackSpeed the attack speed of the Priestess.
     * @param {*} theHitChance the hit chance of the Priestess.
     * @param {*} theChanceToBlock the block chance of the Priestess.
     */
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
                theHitChance, theChanceToBlock) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
              theHitChance, theChanceToBlock);
    }

    /**
     * Defines the heal special attack for the Priestess. The priestess can heal 
     * themselves based on the amount of HP they have remaining.
     * The heal may fail if they are too low on HP.
     * @param {*} theOpponent the opponent they are fighting.
     * @returns true if they were able to heal themselves (i.e. HP was gained) 
     * and false if no HP was gained.
     */
    specialAttack(theOpponent) {
        super.specialAttack(theOpponent);
        const minHeal = Math.round(this.getHP() * Priestess.#HEAL_MIN_PERCENT / 100);
        const maxHeal = Math.round(this.getHP() * Priestess.#HEAL_MAX_PERCENT / 100);
        const rangeHeal = maxHeal - minHeal;
        const gainedHP = Math.round(Math.random() * rangeHeal);
        if (gainedHP > 0) {
            this.setHP(this.getHP() + gainedHP);
            return true;
        }
        return false;
    }

    toJSON() {
        return {
            __type: Priestess.name,
            hero: super.toJSON()
        }
    }

    static fromJSON(theJSON) {
        if (theJSON.__type !== Priestess.name) {
            throw new TypeError("The JSON is not of priestess type.");
        }
        return new Priestess(theJSON.dungeon_character.name, theJSON.dungeon_character.hp, 
                             theJSON.dungeon_character.dp_min, theJSON.dungeon_character.dp_max, 
                             theJSON.dungeon_character.attack_speed, theJSON.dungeon_character.hit_chance,
                             theJSON.block_chance, theJSON.inventory, theJSON.fighting_status);
    }
}