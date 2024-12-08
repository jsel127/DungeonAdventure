/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonCharacter from "./DungeonCharacter.js";
import Inventory from "./Inventory.js";
/**
 * Class containing common methods and data for all hero character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Hero extends DungeonCharacter {
    static FIGHTING_STATUS = Object.freeze({
        fighting: true,
        notFighting: false
    })
    /** The chance the hero has to block an attack */
    #myChanceToBlock
    /** The inventory storing the items the adventurer will pick up. */
    #myInventory
    /** Tracks if the hero is currently fighting an opponent. */
    #myFightingStatus
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields.
     * A Hero cannot be directly instanciated.
     * @param {*} theName the name of the hero.
     * @param {*} theHP the health points of the hero.
     * @param {*} theDPMin the min damage points of the hero.
     * @param {*} theDPMax the max damage points of the hero.
     * @param {*} theAttackSpeed the attack speed of the hero.
     * @param {*} theHitChance the hit chance of the hero.
     * @param {*} theChanceToBlock the block chance of the hero.
     */
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance, theChanceToBlock, theInventory = new Inventory(),
                theFightingStatus = Hero.FIGHTING_STATUS.notFighting) {       
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance);
        if (this.constructor === Hero) {
            throw new TypeError("Hero cannot be instanciated directly.");
        }
        if (!Number.isInteger(theChanceToBlock)) {
            throw new TypeError("The given Block Chance value is not a integer.");
        }
        if (theChanceToBlock < 0 || theChanceToBlock > 100 ) {
            throw new RangeError("The Block Chance is not within the valid range [0,100].");
        }     
        if (typeof theFightingStatus !== "boolean") {
            throw new TypeError("Invalid fighting status. Must be of boolean type.");
        }
        if (!theInventory instanceof Inventory) {
            throw new TypeError("The inventory in not of Inventory type.");
        }
        this.#myChanceToBlock = theChanceToBlock;
        this.#myInventory = theInventory;
        this.#myFightingStatus = theFightingStatus;
    }

    /**
     * Will take in an amount of damage point to be inflicted if block
     * is unsucessful.
     * @return true if the damage is successfully inflicted and false otherwise.
     */
    applyHPChange(theDamagePoints) {
        if (this.#myFightingStatus !== Hero.FIGHTING_STATUS.fighting) {
            throw new EvalError("The hero is not currently fighting any monster. Blocks are not allowed.");
        }
        if (!Number.isInteger(theDamagePoints)) {
            throw new TypeError("The given damage point is not an integer type");
        }
        if (!(Math.random() * 100 < this.#myChanceToBlock)) {
            super.applyHPChange(theDamagePoints);
            return true;
        } 
        return false;
    }

    attack(theOpponent) {
        if (this.#myFightingStatus !== Hero.FIGHTING_STATUS.fighting) {
            throw new EvalError("The hero is not currently fighting any monster. Attacks are not allowed.");
        }
        super.attack(theOpponent);
    }

    /**
     * Carries out the special attack specific to the Heroes. This is an abstract method.
     */
    specialAttack(theOpponent) {
        if (this.#myFightingStatus !== Hero.FIGHTING_STATUS.fighting) {
            throw new EvalError("The hero is not currently fighting any monster. Special attacks are not allowed.");
        }
    }

    /**
     * Sets the fighting status of the hero.
     * @throw TypeError if the given parameter is not of boolean type
     * @param {*} theFightingStatus Sets the fighting status of the hero to true if the hero is fighting and false if they are not fighting. 
     */
    setFightingStatus(theFightingStatus) {
        if (typeof theFightingStatus !== "boolean") {
            throw new TypeError("Invalid fighting status. Must be of boolean type.");
        }
        this.#myFightingStatus = theFightingStatus;
    }

    /**
     * Returns if the hero is currently fighting or not. 
     * @returns true if the hero is fighting and false otherwise.
     */
    getFightingStatus() {
        return this.#myFightingStatus;
    }

    getInventory() {
        return this.#myInventory;
    }

    /**
     * Returns the information of the hero including its name, HP, DPMin, DPMax, AttackSpeed, HitChange, and BlockChance.
     * @returns a string representation of the hero formatted by the information it contains (name, HP, DPMin, DPMax, AttackSpeed, HitChange, BlockChance)
     */
    toString() {
        return super.toString() + ` ${this.#myChanceToBlock}`
    }

    toJSON() {
        return {
            dungeon_character: super.toJSON(),
            block_chance: this.#myChanceToBlock,
            inventory: this.#myInventory.toJSON(),
            fighting_status: this.#myFightingStatus
        }
    }
}