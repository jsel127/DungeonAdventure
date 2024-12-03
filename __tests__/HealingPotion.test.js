/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import HealingPotion from "../items/HealingPotion.js";

test('constructor with no arguments', () => {
    expect(new HealingPotion().getName()).toBe('Healing Potion');
});
