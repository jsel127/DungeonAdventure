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
});

describe("Invalid input constructor and setter methods", () => {
    test("String col", () => {
        expect(() => new Coordinate("invalid", 1)).toThrow(TypeError);
    });
    test("String row", () => {
        expect(() => new Coordinate(1, "invalid")).toThrow(TypeError);
    });
    test("Negative col", () => {
        expect(() => new Coordinate(-1, 1)).toThrow(RangeError);
    });
    test("Negative row", () => {
        expect(() => new Coordinate(1, -1)).toThrow(RangeError);
    });

    test("less than buffer col", () => {
        expect(() => new Coordinate(Dungeon.BUFFER - 1, 1)).toThrow(RangeError);
    });
    test("less than buffer row", () => {
        expect(() => new Coordinate(1, Dungeon.BUFFER - 1)).toThrow(RangeError);
    });
});

describe("Tests Saves and Loads Coordinate class", () => {
    test("Saves and Loads Coordinate class properly (No chances made from initialization)", () => {
        const coordinateToSave = new Coordinate(10, 11);  
        const coordinateFromSave = Coordinate.fromJSON(JSON.parse(JSON.stringify(coordinateToSave)));
        expect(JSON.stringify(coordinateFromSave)).toBe(JSON.stringify(coordinateToSave));
    });

    test("Save and Load on invalid data", () => {
        expect(() => Coordinate.fromJSON({x:1, row:2, z:3})).toThrow(TypeError);
    });
});
