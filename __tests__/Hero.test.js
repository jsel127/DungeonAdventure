/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "../characters/Hero.js";

/**
 * Test Hero class which extends DungeonAdventure and stimulates an abstract class. 
 * Expected to not be able to instanciate this class.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe('Tests simulation of abstract class Hero.', () => {
    test('Instanciates a Hero object. Should throw an error', () => {
        expect(() => new Hero("Stone", 125, 35, 60, 4, 80, 20)).toThrow(TypeError);
    });
});