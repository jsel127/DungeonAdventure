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
     * @param {*} theHeroType the type of the hero.
     * @param {*} theName the name of the hero.
     * @returns an Hero instanciated with the set values.
     */
    static createHero(theHeroType, theName) {
        if (theHeroType === "Warrior") {
            return new Warrior(theName, 125, 35, 60, 4, 80, 20);
        } else if (theHeroType === "Priestess") {
            return new Priestess(theName, 75, 25, 45, 5, 70, 30);
        } else if (theHeroType === "Thief") {
            return new Thief(theName, 75, 20, 40, 6, 80, 40);
        } else {
            throw new UndefinedValueError("The given hero type does not exist.");
        }
    }
}