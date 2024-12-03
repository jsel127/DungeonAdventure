/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Door from "../dungeon/Door.js";

describe("Tests basic functionality of the Door class (keep track of state of door and open door)", () => {
    const closedDoor = new Door();

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
        const openDoor = new Door(true);
        expect(openDoor.isOpen()).toBeTruthy();
    });
    test("Checks open door stays open if opened again.", () => {
        const openDoor = new Door(true);
        expect(openDoor.isOpen()).toBeTruthy();
        openDoor.open();
        expect(openDoor.isOpen()).toBeTruthy();
    });

});