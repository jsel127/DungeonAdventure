/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Monster from "./Monster";

/**
 * Will create a Monster.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class MonsterFactory {
    /**
     * Creates and returns a Monster.
     * @param {*} theName the name of the monster.
     * @param {*} theHP the health points of the monster.
     * @param {*} theDPMin the min damage points of the monster.
     * @param {*} theDPMax the max damage points of the monster.
     * @param {*} theAttackSpeed the attack speed of the monster.
     * @param {*} theHitChance the hit chance of the monster.
     * @param {*} theHealChance the heal chance (0-100) success rate when healing.
     * @param {*} theMinHeal the min heal points the monster can get during a heal.
     * @param {*} theMaxHeal the max heal points the monster can get during a heal.
     * @returns a Monster instanciated with the given values.
     */
    static createMonster(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance,
                  theHealChance, theMinHeal, theMaxHeal) {
        return new Monster(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance,
                           theHealChance, theMinHeal, theMaxHeal);
    }
}