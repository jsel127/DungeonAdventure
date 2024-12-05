/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

export default class Door {
    /** The status of the door (open = true, close = false). */
    #myStatus;
    /**
     * Creates a door that can be open or closed.
     * @param {*} theStatus the status to set the door (open/closed).
     */
    constructor(theStatus = false) {
        if (typeof theStatus !== "boolean") {
            throw new TypeError("Door expects a boolean type to be passed");
        }
        this.#myStatus = theStatus;
    }

    /**
     * Checks if the door is open.
     * @returns true if the door is open false otherwise.
     */
    isOpen() {
        return this.#myStatus;
    }

    /**
     * Opens the door.
     */
    open() {
        this.#myStatus = true;
    }

    toJSON() {
        return {
            __type: Door.name,
            status: this.#myStatus
        }
    }

    static fromJSON(theJSON) {
        if (!theJSON.__type === Door.type) {
            throw new TypeError("The JSON is not of door type");
        }
        return new Door(theJSON.status);
    }
}