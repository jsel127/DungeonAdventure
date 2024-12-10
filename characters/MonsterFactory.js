/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Monster from "./Monster.js";

/**
 * Creates specified types of monsters of default stats.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class MonsterFactory {
    /**
     * Prevents default creation of a constructor.
     * @throws {EvalError} if the class is instanciated.
     */
    constructor() {
        throw new EvalError("This class cannot be instanciated.");
    }

    /**
     * Creates and returns a Monster.
     * @param {*} theName the name of the monster.
     * @returns a Monster instanciated with the corresponding default values.
     * @throws {UndefinedValueError} if the name does not match a prexisting monster.
     */
    static createMonster(theName) {
        if (theName === "Gremlin") {
            return new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);
        } else if (theName === "Ogre") {
            return new Monster("Ogre", 200, 30, 60, 2, 60, 10, 30, 60);
        } else if (theName === "Skeleton") {
            return new Monster("Skeleton", 100, 30, 50, 3, 80, 30, 30, 50);
        } else {
            throw new UndefinedValueError("The given monster type does not exist.");
        }
    }
}