/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Coordinate from "../dungeon/Coordinate.js";

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
    test("String x", () => {
        expect(() => new Coordinate("invalid", 1)).toThrow();
    });
    test("String y", () => {
        expect(() => new Coordinate(1, "invalid")).toThrow();
    });
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
});

describe("Tests Saves and Loads Coordinate class", () => {
    test("Saves and Loads Coordinate class properly (No chances made from initialization)", () => {
        const coordinateToSave = new Coordinate(10, 11);  
        const coordinateFromSave = Coordinate.fromJSON(JSON.parse(JSON.stringify(coordinateToSave)));
        expect(coordinateFromSave.toString()).toBe(coordinateToSave.toString());
    });

    test("Save and Load on invalid data", () => {
        expect(() => Coordinate.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});
