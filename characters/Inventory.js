/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Room from "../dungeon/Room.js";
/**
 * Class that maintains obtained items.
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Inventory {
    /** The HP gained from using a health potion. */
    static #HEALTH_POTION_HP = 10;
    /** An object containing the quantity and precence of items. */
    #myItems;
    /**
     * Creates an inventory of the given values.
     * @param {number} theHealingPotionQuantity the number of healing potions (>=0).
     * @param {number} theVisionPotionQuantity the number of healing potions (>=0).
     * @param {object} thePillars an object holding pillar collection state.
     * @throws {TypeError} if the healing/vision quantity is not a number or if
     *                     the pillars is not an object, has more than 4 key-value pairs,
     *                     or values are not of boolean type.
     * @throws {RangeError} if the healing/vision quantity is negative.
     */
    constructor(theHealingPotionQuantity = 0, theVisionPotionQuantity = 0, 
                thePillars = {abstraction: false, encapsulation: false, 
                              inheritance: false, polymorphism: false}) {
        if (!Number.isInteger(theHealingPotionQuantity) 
            || !Number.isInteger(theVisionPotionQuantity)) {
            throw new TypeError("The quantity of healing and/or vision postions must be an integer");
        }
        if (theHealingPotionQuantity < 0 || theVisionPotionQuantity < 0) {
            throw new RangeError("The quantity of healing and/or vision potions cannot be negative.");
        }
        if (!typeof thePillars === "object") {
            throw new TypeError("The pillars status must be passed in as an object type.");
        }
        if (Object.keys(thePillars).length !== 4) {
            throw new TypeError("The pillars object should only contain 4 key-value pairs.");
        }
        if (!(typeof thePillars["abstraction"] === "boolean"
              && typeof thePillars["encapsulation"] === "boolean"
              && typeof thePillars["inheritance"] === "boolean"
              && typeof thePillars["polymorphism"] === "boolean")) {
            throw new TypeError("The pillar status should be booleans");
        }
        this.#myItems = {
            healing_potion: theHealingPotionQuantity,
            vision_potion: theVisionPotionQuantity,
            pillars: thePillars
        }
    }

    /**
     * Creates a Inventory instance based on the given structured data 
     * represended with JavaScript Object Notation (JSON).
     * @param {object} theJSON the data to create an instance based on.
     * @returns a Inventory object loaded with the given data.
     * @throws {TypeError} If the __type property is not Inventory.
     */
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Inventory.name) {
            throw new TypeError("The JSON is not of inventory type.");
        }
        return new Inventory(theJSON.items.healing_potion, theJSON.items.vision_potion, theJSON.items.pillars);
    }
    
    /**
     * Returns the HP gained by using a healing potion.
     * @returns the HP gained by using a healing potion.
     */
    static getHealingPotionHP() {
        return Inventory.#HEALTH_POTION_HP;
    }

    /**
     * Returns a JSON representation of the Inventory object. 
     * @returns a JSON representation of the Inventory object.
     */
    toJSON() {
        return {
            __type: Inventory.name,
            items: this.#myItems
        }
    }

    /**
     * Processes the content and adds them into the inventory if it is an item.
     * @param {string} theContent the content to process. 
     * @returns a string representation of the item collected if any
     *          and false if no item is collected.
     */
    processContentToItem(theContent) {
        let item;
        if (theContent === Room.CONTENT.healingPotion) {
            this.addHealingPotion();
            item = "Healing Potion";
        } else if (theContent === Room.CONTENT.visionPotion) {
            this.addVisionPotion();
            item = "Vision Potion";
        } else if (theContent === Room.CONTENT.abstractionPillar) {
            this.addAbstractionPillar();
            item = "Abstraction Pillar";
        } else if (theContent === Room.CONTENT.encapsulationPillar) {
            this.addEncapsulationPillar();
            item = "Encapsulation Pillar";
        } else if (theContent === Room.CONTENT.inheritancePillar) {
            this.addInheritancePillar();
            item = "Inheritance Pillar";
        } else if (theContent === Room.CONTENT.polymorphismPillar) {
            this.addPolymorphismPillar();
            item = "Polymorphism Pillar";
        } else {
            return false;
        }
        return item;
    }

    /**
     * Checks if the inventory has healing potion(s).
     * @returns true if the there are healing potions and false otherwise.
     */
    hasHealingPotion() {
        return this.#myItems.healing_potion > 0;
    }

    /**
     * Returns the number of healing potions. 
     * @returns the number of healing potions.
     */
    getHealingPotionQuantity() {
        return this.#myItems.healing_potion;
    }
    /**
     * Increments the number of healing potions by one.
     */
    addHealingPotion() {
        this.#myItems.healing_potion += 1;
    }

    /**
     * Decrements the healing potions quantity if there is a 
     * healing potion available. Does nothing if there are none. 
     */
    useHealingPotion() {
        if (this.hasHealingPotion()) {
            this.#myItems.healing_potion -= 1;
        }
    }
    /**
     * Checks if the inventory has vision potion(s).
     * @returns true if the there are vision potions and false otherwise.
     */
    hasVisionPotion() {
        return this.#myItems.vision_potion > 0;
    }

    /**
     * Returns the number of vision potions. 
     * @returns the number of vision potions.
     */
    getVisionPotionQuantity() {
        return this.#myItems.vision_potion;
    }

    /**
     * Increments the number of vision potions by one.
     */
    addVisionPotion() {
        this.#myItems.vision_potion += 1;
    }

    /**
     * Decrements the vision potions quantity if there is a 
     * vision potion available. Does nothing if there are none. 
     */
    useVisionPotion() {
        if (this.hasVisionPotion()) {
            this.#myItems.vision_potion -= 1;
        }
    }

    /**
     * Sets the state of the abstraction pillar to true.
     */
    addAbstractionPillar() {
        this.#myItems.pillars.abstraction = true;
    }

    /**
     * Checks if the abstraction pillar has been added to the inventory.
     * @returns true if the abstraction pillar is in the inventory.
     */
    hasAbstractionPillar() {
        return this.#myItems.pillars.abstraction;
    }

    /**
     * Sets the state of the encapsulation pillar to true.
     */
    addEncapsulationPillar() {
        this.#myItems.pillars.encapsulation = true;
    }

    /**
     * Checks if the encapsulation pillar has been added to the inventory.
     * @returns true if the encapsulation pillar is in the inventory.
     */
    hasEncapsulationPillar() {
        return this.#myItems.pillars.encapsulation;
    }

    /**
     * Sets the state of the inheritance pillar to true.
     */
    addInheritancePillar() {
        this.#myItems.pillars.inheritance = true;
    }

    /**
     * Checks if the inheritance pillar has been added to the inventory.
     * @returns true if the inheritance pillar is in the inventory.
     */
    hasInheritancePillar() {
        return this.#myItems.pillars.inheritance;
    }

    /**
     * Sets the state of the polymorphism pillar to true.
     */
    addPolymorphismPillar() {
        this.#myItems.pillars.polymorphism = true;
    }

    /**
     * Checks if the polymorphism pillar has been added to the inventory.
     * @returns true if the polymorphism pillar is in the inventory.
     */
    hasPolymorphismPillar() {
        return this.#myItems.pillars.polymorphism;
    }

    /**
     * Checks if all pillars are in the inventory.
     * @returns true if all pillars have been collected and false otherwise.
     */
    hasAllPillars() {
        return this.hasAbstractionPillar() &&
               this.hasEncapsulationPillar() &&
               this.hasInheritancePillar() && 
               this.hasPolymorphismPillar();
    }

    /**
     * The current contents of the inventory.
     * @returns a string representation of the status of the inventory.
     */
    toString() {
        return `Healing Potions: ${this.#myItems.healing_potion} \nVision Potions: ${this.#myItems.vision_potion}`
                + `\nPillars:\n\tAbstraction: ${this.#myItems.pillars.abstraction}`
                + `\n\tEncapsulation: ${this.#myItems.pillars.encapsulation}`
                + `\n\tInheritance: ${this.#myItems.pillars.inheritance}`
                + `\n\tPolymorphism: ${this.#myItems.pillars.polymorphism}`;
    }
}