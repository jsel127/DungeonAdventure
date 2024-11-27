import Coordinate from "../dungeon/Coordinate";

describe("Basic behavior of a coordinate no invalid input", () => {
    const coord = new Coordinate(1, 2);
    test("Creating a coordinate", () => {
        expect(coord.getX()).toBe(1);
        expect(coord.getY()).toBe(2);
    });

    test("Changing x coordinate 1 -> 2", () => {
        coord.setX(2);
        expect(coord.getX()).toBe(2);
    });

    test("Changing y coordinate 2 -> 5", () => {
        coord.setY(5);
        expect(coord.getY()).toBe(5);
    });
});