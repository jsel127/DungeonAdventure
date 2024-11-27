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

describe("Invalid input constructor and setter methods", () => {
    test("Negative x", () => {
        expect(() => new Coordinate(-1, 1)).toThrow(RangeError);
    });
    test("Negative y", () => {
        expect(() => new Coordinate(1, -1)).toThrow(RangeError);
    });
    test("Setting valid coordinate to a negative x", () => {
        expect(() => {
            const coord = new Coordinate(1, 2);
            coord.setX(-1)
        }).toThrow(RangeError);
    });
    test("Setting valid coordinate to a negative y", () => {
        expect(() => {
            const coord = new Coordinate(1, 2);
            coord.setY(-1)
        }).toThrow(RangeError);
    });
})