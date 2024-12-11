/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonCharacter from "./DungeonCharacter.js";
import Inventory from "./Inventory.js";
import Monster from "./Monster.js";
/**
 * Class containing common methods and data for all hero character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Hero extends DungeonCharacter {
    static FIGHTING_STATUS = Object.freeze({
        fighting: true,
        notFighting: false
    });
    /** The chance the hero has to block an attack */
    #myBlockChance;
    /** The inventory storing the items the adventurer will pick up. */
    #myInventory;
    /** Tracks if the hero is currently fighting an opponent. */
    #myFightingStatus;
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields.
     * A Hero cannot be directly instanciated.
     * @param {string} theName the name of the hero as a string
     * @param {number} theHP the health points of the hero as an integer (>=0)
     * @param {number} theDPMin the min damage points of the hero as an integer (>0)
     * @param {number} theDPMax the max damage points of the hero as an integer (>=0)
     * @param {number} theAttackSpeed the attack speed of the hero as an integer (>=0)
     * @param {number} theHitChance the hit chance of the hero as an integer [1-100]
     * @param {number} theBlockChance the block chance of the hero.
     * @param {Inventory} theInventory the inventory of the hero
     * @param {boolean} theFightingStatus the fighting status of the hero (true=fighting)
     * @throws {TypeError} if the Hero class is instanciated, block chance 
     *                     is not an integer, fighting status is not a boolean,
     *                     or the inventory is not an inventory type.
     * @throws {RangeError} the block chance is not between 0-100. 
     */
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance, theBlockChance, theInventory = new Inventory(),
                theFightingStatus = Hero.FIGHTING_STATUS.notFighting) {       
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance);
        if (this.constructor === Hero) {
            throw new TypeError("Hero cannot be instanciated directly.");
        }
        if (!Number.isInteger(theBlockChance)) {
            throw new TypeError("The given Block Chance value is not a integer.");
        }
        if (theBlockChance < 0 || theBlockChance > 100 ) {
            throw new RangeError("The Block Chance is not within the valid range [0,100].");
        }     
        if (typeof theFightingStatus !== "boolean") {
            throw new TypeError("Invalid fighting status. Must be of boolean type.");
        }
        if (!(theInventory instanceof Inventory)) {
            throw new TypeError("The inventory in not of Inventory type.");
        }
        this.#myBlockChance = theBlockChance;
        this.#myInventory = theInventory;
        this.#myFightingStatus = theFightingStatus;
    }

    /**
     * Returns a JSON representation of the Hero object. 
     * @returns a JSON representation of the Hero object.
     */
    toJSON() {
        return {
            dungeon_character: super.toJSON(),
            block_chance: this.#myBlockChance,
            inventory: this.#myInventory.toJSON(),
            fighting_status: this.#myFightingStatus
        }
    }

    /**
     * Will take in an amount of damage point to be inflicted if block
     * is unsucessful.
     * @return true if the damage is successfully inflicted and false otherwise.
     * @throws {EvalError} if the hero is not currently fighting
     * @throws {TypeError} if the damage points are not an integer.
     */
    applyHPChange(theDamagePoints) {
        if (this.#myFightingStatus !== Hero.FIGHTING_STATUS.fighting) {
            throw new EvalError("The hero is not currently fighting any monster. Blocks are not allowed.");
        }
        if (!Number.isInteger(theDamagePoints)) {
            throw new TypeError("The given damage point is not an integer type");
        }
        if (!(Math.random() * 100 < this.#myBlockChance)) {
            super.applyHPChange(theDamagePoints);
            return true;
        } 
        return false;
    }

    /**
     * Carries out the attack specific to the Heroes. This is an abstract method.
     * @param {Monster} theOpponent the monster to fight.
     * @throws {EvalError} if the hero is not currently fighting and the method is called.
     * @throws {TypeError} if the opponent is not a Monster type.
     */
    attack(theOpponent) {
        if (this.#myFightingStatus !== Hero.FIGHTING_STATUS.fighting) {
            throw new EvalError("The hero is not currently fighting any monster. Attacks are not allowed.");
        }
        if (!(theOpponent instanceof Monster)) {
            throw new TypeError("The opponent should be of Monster type.");
        }
        super.attack(theOpponent);
    }

    /**
     * Carries out the special attack specific to the Heroes. This is an abstract method.
     * @param {Monster} theOpponent the monster to fight.
     * @throws {EvalError} if the hero is not currently fighting and the method is called.
     * @throws {TypeError} if the opponent is not a Monster type.
     */
    specialAttack(theOpponent) {
        if (this.#myFightingStatus !== Hero.FIGHTING_STATUS.fighting) {
            throw new EvalError("The hero is not currently fighting any monster. Special attacks are not allowed.");
        }
        if (!(theOpponent instanceof Monster)) {
            throw new TypeError("The opponent should be of Monster type.");
        }
    }

    /**
     * Checks if all required items have been
     * @returns true if all required items have been collected.
     */
    hasAllRequiredItems() {
        return this.#myInventory.hasAllPillars();
    }

    /**
     * Will call the inventory to add items if there is an item to pick up.
     * @param {string} theContentToProcess the content to process for an item.
     * @returns a string explaining what the adventurer picked up or false if 
     * no item was picked up.
     */
    collectItem(theContentToProcess) {
        const item =  this.#myInventory.processContentToItem(theContentToProcess);
        if (item) {
            return `You picked up a ${item}`;
        }
        return false;
    }

    /**
     * If no healing potions available will do nothing. Otherwise,
     * will call the inventory to decrement the number of healing potions.
     * The HP will be updated based on the healing potion effect.
     * @returns a string explaining what effect the healing potion had.
     */
    useHealingPotion() {
        if (!this.#myInventory.hasHealingPotion()) {
            return "You have no healing potions";
        }
        this.#myInventory.useHealingPotion();
        const gainedHP =  Inventory.getHealingPotionHP();
        this.setHP(this.getHP() + gainedHP);
        return `You used a healing potion and gained ${gainedHP} HP.`;
    }

    /**
     * If not vision postions are available nothing will be done.
     * If there is an available vision potion the quantity will be 
     * reduced and true is returned.
     * @returns true if the vision potion was available and decremented
     * and false otherwise.
     */
    useVisionPotion() {
        if (!this.#myInventory.hasVisionPotion()) {
            return false;
        } 
        this.#myInventory.useVisionPotion();
        return true;
    }
    
    /**
     * Sets the fighting status of the hero.
     * @param {boolean} theFightingStatus Sets the fighting status of the hero to true if the hero is fighting and false if they are not fighting. 
     * @throws {TypeError} if the given parameter is not of boolean type.
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

    /**
     * A string representation of the inventory is returned.
     * @returns a string representing the state of the inventory.
     */
    getInventory() {
        return JSON.stringify(this.#myInventory);
    }

    /**
     * Returns the information of the hero including its name, HP, DPMin, DPMax, AttackSpeed, HitChange, and BlockChance.
     * @returns a string representation of the hero formatted by the information it contains (name, HP, DPMin, DPMax, AttackSpeed, HitChange, BlockChance)
     */
    toString() {
        return super.toString() + ` ${this.#myBlockChance}`
    }
}