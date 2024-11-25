/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

export default class Door {
    #myStatus;
    constructor(theStatus = false) {
        this.#myStatus = theStatus;
    }

    isOpen() {
        return this.#myStatus;
    }

    open() {
        this.#myStatus = true;
    }
}