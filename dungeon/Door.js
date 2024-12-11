/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

/**
 * Door class updates and stores state of doors.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Door {
    /** Stores the expected state for open and closed door. */
    static STATUS = Object.freeze({
        open: true,
        closed: false
    });
    /** The status of the door (open = true, close = false). */
    #myStatus;
    /**
     * Creates a door that can be open or closed.
     * @param {boolean} theStatus the status to set the door (open/closed).
     */
    constructor(theStatus = Door.STATUS.closed) {
        if (typeof theStatus !== "boolean") {
            throw new TypeError("Door expects a boolean type to be passed");
        }
        this.#myStatus = theStatus;
    }

    /**
     * Creates a Door instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Door object loaded with the given data.
     * @throws {TypeError} If the __type property is not Door.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || !theJSON.__type === Door.type) {
            throw new TypeError("The JSON is not of door type");
        }
        return new Door(theJSON.status);
    }

    /**
     * Returns a JSON representation of the Door object. 
     * @returns a JSON representation of the Door object.
     */
    toJSON() {
        return {
            __type: Door.name,
            status: this.#myStatus
        }
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
        this.#myStatus = Door.STATUS.open;
    }
}