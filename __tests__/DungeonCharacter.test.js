/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import DungeonCharacter from "../characters/DungeonCharacter.js";

/**
 * Test DungeonCharacter class which stimulates an abstract class. 
 * Expected to not be able to instanciate this class.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Tests simulation of abstract class DungeonCharacter.", () => {
    test("Instanciates a DungeonCharacter object. Should throw an error", () => {
        expect(() => new DungeonCharacter("Incorrect", 125, 35, 60, 4, 80)).toThrow(TypeError);
    });
});