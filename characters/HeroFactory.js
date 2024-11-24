/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Warrior from './Warrior';
import Priestess from './Priestess';
import Thief from './Thief';

/**
 * Will create a specific type of Hero based on the name it is passed (e.g. Warrior). 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class HeroFactory {
    /**
     * Creates and returns a Hero of the specified type.
     * @param {*} theName the name of the hero.
     * @param {*} theHP the health points of the hero.
     * @param {*} theDPMin the min damage points of the hero.
     * @param {*} theDPMax the max damage points of the hero.
     * @param {*} theAttackSpeed the attack speed of the hero.
     * @param {*} theHitChance the hit chance of the hero.
     * @param {*} theChanceToBlock the block chance of the hero.
     * @returns an Hero instanciated with the given values.
     */
    static createHero(theName, theHP, theDPMin, theDPMax,
        theAttackSpeed, theHitChance, theChanceToBlock) {
        if (theName === "Warrior") {
            return new Warrior(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance, theChanceToBlock)
        } else if (theName === "Priestess") {
            return new Priestess(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance, theChanceToBlock);
        } else if (theName === "Thief") {
            return new Thief(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance, theChanceToBlock);
        } else {
            throw new UndefinedValueError("The given hero type does not exist.");
        }
    }
}