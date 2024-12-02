/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

/**
 * Represents a generic item. Should not be instantiated. 
 * @author Boyd Bouck
 * @verison 1.0
 */
export default class Item {

    #myName;

    /**
     * Constructs a new Item given the name of the Item. 
     * @param {*} theName of the item
     * @throws Error if this constructor is directly called (as this class is abstract)
     */
    constructor(theName) {
        if (this.constructor == Item) {
            throw new Error('Cannot instantiate Item class');
        }
        this.#myName = theName;
    }

    /**
     * @returns the name of this Item (e.g. Healing Potion, Pillar of Abstraction, etc.)
     */
    getName() {
        return this.#myName;
    }

}