/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonCharacter from "./DungeonCharacter.js";

/**
 * Class containing common methods and data for all monster character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Monster extends DungeonCharacter {
    /** The heal chance (0-100) of the monster. */
    #myHealChance;
    /** The min heal points the monster can get. */
    #myMinHeal;
    /** The max heal points the monster can get. */
    #myMaxHeal;
    /**
     * Constructor that will store the given arguments in the corresponding 
     * instance fields.
     * @param {string} theName the name of the monster as a string
     * @param {number} theHP the health points of the monster as an integer (>=0)
     * @param {number} theDPMin the min damage points of the monster as an integer (>0)
     * @param {number} theDPMax the max damage points of the monster as an integer (>=0)
     * @param {number} theAttackSpeed the attack speed of the monster as an integer (>=0)
     * @param {number} theHitChance the hit chance of the monster as an integer [1-100]
     * @param {number} theHealChance the heal chance success rate when healing as an integer [0, 100].
     * @param {number} theMinHeal the min heal points the monster can get during a heal as an integer (>=0).
     * @param {number} theMaxHeal the max heal points the monster can get during a heal as an integer (>=0).
     * @throws {TypeError} if the healing chance, min heal, or max heal is not a integer.
     * @throws {RangeError} if the min heal or max heal is negative or heal chance is not between [1-100]
     */
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance,
                theHealChance, theMinHeal, theMaxHeal) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance);
        if (!(Number.isInteger(theHealChance) && Number.isInteger(theMinHeal) && Number.isInteger(theMaxHeal))) {
            throw new TypeError("The Heal Chance, MinHeal, and/or MaxHeal is not an integer value. Invalid value.");
        }
        if (theHealChance < 0 || theHealChance > 100 ) {
            throw new RangeError("The Heal Chance is not within the valid range [0,100].");
        }     
        if (theMinHeal < 0 || theMaxHeal < 0) {
            throw new RangeError("The MinHeal or MaxHeal is not greater is negative.");
        }
        this.#myHealChance = theHealChance;
        this.#myMinHeal = theMinHeal;
        this.#myMaxHeal = theMaxHeal;
    }

    /**
     * Creates a Monster instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Monster object loaded with the given data.
     * @throws {TypeError} If the __type property is not Monster.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Monster.name) {
            throw new TypeError("The JSON is not of monster type.");
        }
        return new Monster(theJSON.dungeon_character.name, theJSON.dungeon_character.hp, 
                           theJSON.dungeon_character.dp_min, theJSON.dungeon_character.dp_max, 
                           theJSON.dungeon_character.attack_speed, theJSON.dungeon_character.hit_chance,
                           theJSON.heal_chance, theJSON.min_heal, theJSON.max_heal
        );
    }

    /**
     * Returns a JSON representation of the Monster object. 
     * @returns a JSON representation of the Monster object.
     */
    toJSON() {
        return {
            __type: Monster.name,
            dungeon_character: super.toJSON(),
            heal_chance: this.#myHealChance,
            min_heal: this.#myMinHeal,
            max_heal: this.#myMaxHeal
        }
    }

    /**
     * Applied damage to the monster and also applied heal if successful.
     * @param {number} theDamagePoints the damage points to apply.
     * @throws {TypeError} if the damage points to apply is not a number. 
     */
    applyHPChange(theDamagePoints) {
        if (!Number.isInteger(theDamagePoints)) {
            throw new TypeError("The change in HP should be an integer");
        }
        if (Math.random() * 100 < this.#myHealChance) {
            const rangeAddHP = this.#myMaxHeal - this.#myMinHeal;
            const addHP = Math.round(Math.random() * rangeAddHP) + this.#myMinHeal;
            super.applyHPChange(addHP + theDamagePoints);
        } else {
            super.applyHPChange(theDamagePoints);
        }
    }

    /**
     * Gets the heal change of the monster.
     * @returns the heal change of the monster 
     */
    getHealChance() {
        return this.#myHealChance;
    }

    /**
     * Gets the min heal points of the monster.
     * @returns the min heal points of the monster 
     */
    getMinHeal() {
        return this.#myMinHeal;
    }

    /**
     * Gets the max heal points of the monster.
     * @returns the max heal points of the monster 
     */
    getMaxHeal() {
        return this.#myMaxHeal;
    }

    /**
     * Returns the information of the monster including its name, HP, DPMin, DPMax, 
     * AttackSpeed, HitChange, HealChance, MinHeal, and MaxHeal.
     * @returns a string representation of the monster formatted by the information it contains 
     *          (name, HP, DPMin, DPMax, AttackSpeed, HitChange, HealChance, MinHeal, MaxHeal)
     */
    toString() {
        return super.toString() + ` ${this.#myHealChance} ${this.#myMinHeal} ${this.#myMaxHeal}`;
    }
}