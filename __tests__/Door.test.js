/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Door from "../dungeon/Door.js";

/**
 * Tests Door class updates and stores state of doors.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Tests basic functionality of the Door class (keep track of state of door and open door)", () => {
    let closedDoor;
    beforeEach(() => {
        closedDoor = new Door();
    });

    test("Creates a closed door if no state specified", () => {
        expect(closedDoor.isOpen()).toBeFalsy();
    });

    test("Opens a closed door", () => {
        closedDoor.open();
        expect(closedDoor.isOpen()).toBeTruthy();
    });
});

describe("Tests construction of the Door class. Ensure account for invalid input", () => {
    test("Creates a door with a null passed", () => {
        expect(() => new Door(null)).toThrow();
    });
    test("Creates an open door", () => {
        const openDoor = new Door(Door.STATUS.open);
        expect(openDoor.isOpen()).toBeTruthy();
    });
    test("Checks open door stays open if opened again.", () => {
        const openDoor = new Door(Door.STATUS.open);
        expect(openDoor.isOpen()).toBeTruthy();
        openDoor.open();
        expect(openDoor.isOpen()).toBeTruthy();
    });

});


describe("Tests Saves and Loads Door class", () => {
    test("Saves and Loads Door class properly (No chances made from initialization)", () => {
        const doorToSave = new Door();  
        const doorFromSave = Door.fromJSON(JSON.parse(JSON.stringify(doorToSave)));
        expect(JSON.stringify(doorFromSave)).toBe(JSON.stringify(doorToSave));
    });

    test("Saves and Loads Door class where door is open.", () => {
        const doorToSave = new Door(Door.STATUS.open);  
        const doorFromSave = Door.fromJSON(JSON.parse(JSON.stringify(doorToSave)));
        expect(JSON.stringify(doorFromSave)).toBe(JSON.stringify(doorToSave));
    });

    test("Save and Load on invalid data", () => {
        expect(() => Door.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});

