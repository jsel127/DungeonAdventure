/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';

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
     * @param {*} theName the name of the Thief.
     * @param {*} theHP the health points of the Thief.
     * @param {*} theDPMin the min damage points of the Thief.
     * @param {*} theDPMax the max damage points of the Thief.
     * @param {*} theAttackSpeed the attack speed of the Thief.
     * @param {*} theHitChance the hit chance of the Thief.
     * @param {*} theChanceToBlock the block chance of the Thief.
     */
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
                theHitChance, theChanceToBlock) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
              theHitChance, theChanceToBlock);
    }

    /**
     * Special attack of thief which allows it to get in extra attacks.
     * @param {*} theOpponent the opponent the character is facing.
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

    toJSON() {
        return {
            __type: Thief.name, 
            hero: super.toJSON()
        }
    }

    static fromJSON(theJSON) {
        if (theJSON.__type !== Thief.name) {
            throw new TypeError("The JSON is not of thief type.");
        }
        return new Thief(theJSON.dungeon_character.name, theJSON.dungeon_character.hp, 
                        theJSON.dungeon_character.dp_min, theJSON.dungeon_character.dp_max, 
                        theJSON.dungeon_character.attack_speed, theJSON.dungeon_character.hit_chance,
                        theJSON.block_chance, theJSON.inventory, theJSON.fighting_status);
    }
}