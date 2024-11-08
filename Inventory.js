/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

const InventorySlot = require('./InventorySlot');

/**
 * The inventory that holds the Items collected by the player. 
 * HealingPotions and VisionPotions can stack; Pillars cannot. 
 * 
 * @author Boyd Bouck
 * @verison 1.0
 */
class Inventory {

    static NUM_SLOTS = 6;
    
    #myInventorySlots;

    /**
     * Constructs a new Inventory object capable of holding
     * HealingPotions, VisionPotions, and Pillars. 
     */
    constructor() {
        this.#myInventorySlots = new Array(Inventory.NUM_SLOTS);
        for (let i = 0; i < Inventory.NUM_SLOTS; i++) {
            this.#myInventorySlots[i] = new InventorySlot();
        }
    }

    /**
     * Adds the given item to the inventory. HealingPotions and VisionPotions
     * stack in the same inventory slot. Pillars are unique, and therefore
     * each go in their own inventory slot. 
     * 
     * @param {*} theItem the Item to be added to the inventory
     */
    addItem(theItem) {
        let leftmostEmptySlot = Inventory.NUM_SLOTS;
        // if an identical item already exists in the inventory, increment its quantity
        for (i in this.#myInventorySlots) {
            if (this.#myInventorySlots[i].getItem() == InventorySlot.EMPTY) {
                if (i < leftmostEmptySlot) {
                    leftmostEmptySlot = i;
                }
            }
            else if (theItem.getName() == this.#myInventorySlots[i].getItem().getName()) {
                this.#myInventorySlots[i].increment();
                leftmostEmptySlot = 'item placed';
            }
        }
        // if an identical item does not exist in the inventory, add it to an empty slot
        if (typeof leftmostEmptySlot == 'number') { 
            this.#myInventorySlots[leftmostEmptySlot].setItem(theItem);
        }
    }

    /**
     * Uses the passed Item by applying its effect and removing it from the Inventory. 
     * 
     * @param {*} theItem the Item from the Inventory to be used
     * @throws Error if the inventory does not contain the given Item
     * @throws Error if a Pillar is passed, as Pillars do not currently have abilities.
     */
    useItem(theItem) {
        if (!this.hasItem(theItem)) {
            throw new Error('Inventory does not contain item ' + theItem.getName());
        }
        if (theItem instanceof Pillar) {
            throw new Error('Pillars do not currently have an ability');
        }
        this.#myInventorySlots[this.getIndex(theItem)].decrement();
        if (theItem instanceof HealingPotion) {
            theItem.heal();
        }
        if (theItem instanceof VisionPotion) {
            theItem.see();
        }
    }

    /**
     * Determines if the given Item is contained in the Inventory. 
     * 
     * @param {*} theItem the Item whose presence in the Inventory is to be determined
     * @returns true if theItem is in the Inventory, otherwise false
     */
    hasItem(theItem) {
        return this.getIndex(theItem) != -1;
    }

    /**
     * Returns the index of the given Item in the Inventory. If the Item
     * is not in the Inventory, -1 is returned. 
     * 
     * @param {*} theItem the Item to be searched for in the Inventory
     * @return the index of the Item in the Inventory, or -1 if the Item is not found
     */
    getIndex(theItem) {
        for (i in this.#myInventorySlots) {
            if (!this.#myInventorySlots[i].isEmpty() && 
                    theItem.getName() == this.#myInventorySlots[i].getItem().getName()) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Builds a string representation of the Inventory, including each 
     * InventorySlot and the Item and quantity of each. 
     * 
     * @returns a string representation of the Inventory. 
     */
    toString() {
        let str = '';
        for (i in this.#myInventorySlots) {
            str += '[' + i + '] ';
            str += this.#myInventorySlots[i].toString() + '\n';
        }
        return str;
    }

    /**
     * @returns the underlying Array of the Inventory (for testing purposes only)
     */
    getArray() {
        return this.#myInventorySlots;
    }

    /**
     * @returns the InventorySlot at the given index
     */
    getSlot(theIndex) {
        return this.#myInventorySlots[theIndex];
    }

}

module.exports = Inventory;