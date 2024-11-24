/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

/**
 * Class containing common methods and data for all monster character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
import DungeonCharacter from "./DungeonCharacter.js";

export default class Monster extends DungeonCharacter {
    #myHealChance
    #myMinHeal
    #myMaxHeal
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
     * Heals the monster by a random HP within its min and max heal range. 
     */
    heal() {
        const rangeAddHP = this.#myMaxHeal - this.#myMinHeal;
        const addHP = Math.round(Math.random() * rangeAddHP);
        const healedHP = this.getHP() + addHP + this.#myMinHeal
        this.setHP(healedHP);
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
     * Returns the information of the monster including its name, HP, DPMin, DPMax, AttackSpeed, HitChange, HealChance, MinHeal, and MaxHeal.
     * @returns a string representation of the monster formatted by the information it contains (name, HP, DPMin, DPMax, AttackSpeed, HitChange, HealChance, MinHeal, MaxHeal)
     */
    toString() {
        return super.toString() + ` ${this.#myHealChance} ${this.#myMinHeal} ${this.#myMaxHeal}`;
    }
}