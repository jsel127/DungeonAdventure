import Door from "../dungeon/Door";

describe("Tests basic functionality of the Door class (keep track of state of door and open door)", () => {
    const closedDoor = new Door();

    test("Creates a closed door if no state specified", () => {
        expect(closedDoor.isOpen()).toBeFalsy();
    });

    test("Opens a closed door", () => {
        closedDoor.open();
        expect(closedDoor.isOpen()).toBeTruthy();
    });
})