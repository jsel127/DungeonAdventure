/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Coordinate from "../dungeon/Coordinate.js";
import Dungeon from "../dungeon/Dungeon.js";

/**
 * Test Coordinate class.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Basic behavior of a coordinate no invalid input", () => {
    const coord = new Coordinate(1, 2);
    test("Creating a coordinate", () => {
        expect(coord.getRow()).toBe(1);
        expect(coord.getCol()).toBe(2);
    });

    test("Changing col coordinate 1 -> 2", () => {
        coord.setCol(2);
        expect(coord.getCol()).toBe(2);
    });

    test("Changing row coordinate 2 -> 5", () => {
        coord.setRow(5);
        expect(coord.getRow()).toBe(5);
    });
});

describe("Invalid input constructor and setter methods", () => {
    test("String x", () => {
        expect(() => new Coordinate("invalid", 1)).toThrow(TypeError);
    });
    test("String y", () => {
        expect(() => new Coordinate(1, "invalid")).toThrow(TypeError);
    });
    test("Negative x", () => {
        expect(() => new Coordinate(-1, 1)).toThrow(RangeError);
    });
    test("Negative y", () => {
        expect(() => new Coordinate(1, -1)).toThrow(RangeError);
    });

    test("less than buffer x", () => {
        expect(() => new Coordinate(Dungeon.BUFFER - 1, 1)).toThrow(RangeError);
    });
    test("less than buffer y", () => {
        expect(() => new Coordinate(1, Dungeon.BUFFER - 1)).toThrow(RangeError);
    });

    test("Setting valid coordinate to a negative x", () => {
        expect(() => {
            const coord = new Coordinate(1, 2);
            coord.setCol(-1)
        }).toThrow(RangeError);
    });
    test("Setting valid coordinate to a negative y", () => {
        expect(() => {
            const coord = new Coordinate(1, 2);
            coord.setRow(-1)
        }).toThrow(RangeError);
    });
});

describe("Tests Saves and Loads Coordinate class", () => {
    test("Saves and Loads Coordinate class properly (No chances made from initialization)", () => {
        const coordinateToSave = new Coordinate(10, 11);  
        const coordinateFromSave = Coordinate.fromJSON(JSON.parse(JSON.stringify(coordinateToSave)));
        expect(JSON.stringify(coordinateFromSave)).toBe(JSON.stringify(coordinateToSave));
    });

    test("Saves and Loads Coordinate class properly (col changed)", () => {
        const coordinateToSave = new Coordinate(10, 11);  
        coordinateToSave.setCol(1);
        const coordinateFromSave = Coordinate.fromJSON(JSON.parse(JSON.stringify(coordinateToSave)));
        expect(JSON.stringify(coordinateFromSave)).toBe(JSON.stringify(coordinateToSave));
    });

    test("Saves and Loads Coordinate class properly (row changed)", () => {
        const coordinateToSave = new Coordinate(10, 11);  
        coordinateToSave.setRow(19);
        const coordinateFromSave = Coordinate.fromJSON(JSON.parse(JSON.stringify(coordinateToSave)));
        expect(JSON.stringify(coordinateFromSave)).toBe(JSON.stringify(coordinateToSave));
    });

    test("Save and Load on invalid data", () => {
        expect(() => Coordinate.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});
