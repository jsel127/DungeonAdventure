/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

export default class Door {
    #myStatus;
    constructor(theStatus) {
        this.#myStatus = theStatus;
    }

    open() {
        this.#myStatus = true;
    }
}