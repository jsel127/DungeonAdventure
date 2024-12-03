/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import VisionPotion from "../items/VisionPotion";

test('constructor with no arguments', () => {
    expect(new VisionPotion().getName()).toBe('Vision Potion');
});
