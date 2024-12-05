/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';

/**
 * Class containing common methods and data for all warrior character. 
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
     * @param {*} theName the name of the Warrior.
     * @param {*} theHP the health points of the Warrior.
     * @param {*} theDPMin the min damage points of the Warrior.
     * @param {*} theDPMax the max damage points of the Warrior.
     * @param {*} theAttackSpeed the attack speed of the Warrior.
     * @param {*} theHitChance the hit chance of the Warrior.
     * @param {*} theChanceToBlock the block chance of the Warrior.
     */
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
                theHitChance, theChanceToBlock) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
              theHitChance, theChanceToBlock);
    }

    /**
     * Special attack of warrior which allows it to cause more damage if a hit is landed.
     * @param {*} theOpponent the opponent the character is facing.
     * @returns true if a successful attack was made and false otherwise.
     */
    specialAttack(theOpponent) {
        super.specialAttack(theOpponent);
        if (!this.isDead() && Math.random() * 100 < Warrior.#HIT_RATE_CRUSHING_BLOW) {
            const rangeDP = this.getDPMax() - this.getDPMin();
            const attackDP = Warrior.#MULTIPLIER_CRUSHING_BLOW * 
                             (Math.round(Math.random() * rangeDP) + this.getDPMin());
            if (attackDP < theOpponent.getHP()) {
                theOpponent.setHP(theOpponent.getHP() - attackDP);
            } else {
                theOpponent.setHP(0);
            }
            return true;
        }
        return false;
    }

    toJSON() {
        return {
            __type: Warrior.name, 
            hero: super.toJSON()
        }
    }

    static fromJSON(theJSON) {
        if (theJSON.__type !== Warrior.name) {
            throw new TypeError("The JSON is not of warrior type.");
        }
        return new Warrior(theJSON.hero.dungeon_character.name, theJSON.hero.dungeon_character.hp, 
                           theJSON.hero.dungeon_character.dp_min, theJSON.hero.dungeon_character.dp_max, 
                           theJSON.hero.dungeon_character.attack_speed, theJSON.hero.dungeon_character.hit_chance,
                           theJSON.hero.block_chance, theJSON.hero.inventory, theJSON.hero.fighting_status);
    }
}