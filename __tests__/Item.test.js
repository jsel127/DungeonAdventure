/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Item from "../items/Item.js";

test('constructor; should throw Error because Item should not be instantiated', () => {
    expect(() => new Item('Healing Potion')).toThrow('Cannot instantiate Item class');
});
