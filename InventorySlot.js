/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Item from './Item.js';

/**
 * One of the six item 'slots' that make up the inventory. 
 * Composed of an Item and a quantity. 
 * 
 * @author Boyd Bouck
 * @version 1.0
 */
export default class InventorySlot {

    /** Placeholder for when an inventory slot does not contain an Item. */
    static EMPTY = 'empty';

    #myItem;
    #myQuantity;

    /**
     * Creates an InventorySlot containing the given Item at the given quantity. 
     * @param {*} theItem in the InventorySlot
     * @param {*} theQuantity of the Item
     */
    constructor(theItem = InventorySlot.EMPTY, theQuantity = 0) {
        this.setItem(theItem);
        this.setQuantity(theQuantity);
    }

    /**
     * @returns #myItem the Item contained by the InventorySlot
     */
    getItem() {
        return this.#myItem;
    }

    /**
     * @returns #myQuantity the quantity of the Item contained by this InventorySlot
     */
    getQuantity() {
        return this.#myQuantity; 
    }

    /**
     * Sets the Item contained by this InventorySlot to the given Item. 
     * 
     * @param {*} theItem the new Item to be contained by this InventorySlot
     * @throws TypeError if theItem is not an Item, or the string 'empty'
     */
    setItem(theItem) {
        if (!(theItem instanceof Item) && theItem != InventorySlot.EMPTY) {
            throw new TypeError('theItem must be a subclass of Item, or the string \'empty\'');
        }
        this.#myItem = theItem;
    }

    /**
     * Sets the quantity of the Item contained by this InventorySlot to the given number. 
     * 
     * @param {*} theQuantity the new quantity of the Item
     * @throws RangeError if theQuantity is less than 0. 
     */
    setQuantity(theQuantity) {
        if (theQuantity < 0) {
            throw new RangeError('theQuantity = ' + theQuantity + '; must be nonnegative');
        }
        if (theQuantity > 0 && this.#myItem == InventorySlot.EMPTY) {
            throw new Error('InventorySlot must contain an Item to set a positive quantity');
        }
        this.#myQuantity = theQuantity; 
        if (this.#myQuantity == 0) {
            this.setItem(InventorySlot.EMPTY);
        }
    }

    /**
     * Increases the quantity of the item by one. 
     */
    incrementQuantity() {
        this.setQuantity(this.#myQuantity + 1);
    }

    /**
     * Decreases the quantity of the item by one. 
     */
    decrementQuantity() {
        this.setQuantity(this.#myQuantity - 1);
    }

    /**
     * @returns true if this InventorySlot does not contain an Item, false otherwise
     */
    isEmpty() {
        return this.#myItem == InventorySlot.EMPTY;
    }

    /**
     * @returns a string representation of this InventorySlot
     */
    toString() {
        if (this.isEmpty()) {
            return InventorySlot.EMPTY;
        }
        return this.#myItem.getName() + ' (' + this.#myQuantity + ')';
    }

}