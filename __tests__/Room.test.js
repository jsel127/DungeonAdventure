/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Room from "../dungeon/Room.js";
describe("Tests the room class and its functionality", () => {
    test("By default the created room is empty", () => {
        const room = new Room();
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });
    test("Changing content of the room to healing potion", () => {
        const room = new Room();
        room.setContent(Room.CONTENT.healingPotion);
        expect(room.getContent() === Room.CONTENT.healingPotion);
    });
    
// Other test: constructor (specify coordinate and doors), spawning monsters, 

});

describe("Tests the room class with invalid input", () => {
    test("Testing if invalid content is placed an error is thrown", () => {

    });
});