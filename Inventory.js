/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import InventorySlot from './InventorySlot.js';
import Item from './Item.js';
import HealingPotion from './HealingPotion.js';
import VisionPotion from './VisionPotion.js';
import Pillar from './Pillar.js';

/**
 * The inventory that holds the Items collected by the player. 
 * HealingPotions and VisionPotions can stack; Pillars cannot. 
 * 
 * @author Boyd Bouck
 * @verison 1.0
 */
export default class Inventory {

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
        if (!(theItem instanceof Item)) {
            throw new TypeError('theItem must be a subclass of Item');
        }
        let leftmostEmptySlot = Inventory.NUM_SLOTS;
        // if an identical item already exists in the inventory, increment its quantity
        for (let i in this.#myInventorySlots) {
            if (this.#myInventorySlots[i].getItem() === InventorySlot.EMPTY) {
                if (i < leftmostEmptySlot) {
                    leftmostEmptySlot = i;
                }
            }
            else if (theItem.getName() === this.#myInventorySlots[i].getItem().getName()) {
                this.#myInventorySlots[i].incrementQuantity();
                leftmostEmptySlot = 'item placed';
                // exit loop so leftmostEmptySlot doesn't get set back to a number
                // while checking the rest of the slots
                break; 
            }
        }
        // if an identical item does not exist in the inventory, add it to an empty slot
        if (leftmostEmptySlot != 'item placed') { 
            this.#myInventorySlots[leftmostEmptySlot].setItem(theItem);
            this.#myInventorySlots[leftmostEmptySlot].setQuantity(1);
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
        this.#myInventorySlots[this.getIndex(theItem)].decrementQuantity();
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
        for (let i in this.#myInventorySlots) {
            if (!this.#myInventorySlots[i].isEmpty() && 
                    theItem.getName() == this.#myInventorySlots[i].getItem().getName()) {
                return Number(i);
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
        for (let i in this.#myInventorySlots) {
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

    hasAllPillars() {
        return this.hasItem(new Pillar(Pillar.PillarType.ABSTRACTION))
                && this.hasItem(new Pillar(Pillar.PillarType.ENCAPSULATION))
                && this.hasItem(new Pillar(Pillar.PillarType.POLYMORPHISM))
                && this.hasItem(new Pillar(Pillar.PillarType.INHERITANCE))
    }

}