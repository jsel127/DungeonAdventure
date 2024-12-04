/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Coordinate from "../dungeon/Coordinate.js";
import Dungeon from "../dungeon/Dungeon.js";
import Room from "../dungeon/Room.js";

describe("Test basic setup of the Dungeon", () => {
    const dungeonEasy = new Dungeon(Dungeon.DIFFICULTY.Easy);
    const entranceRoom = dungeonEasy.getEntrance();
    test("Entrance is set up properly", () => {
        expect(entranceRoom.getContent()).toBe(Room.CONTENT.entrance);
    });
    const exitRoom = dungeonEasy.getExit();
    test("Exit is set up.", () => {
        expect(exitRoom.getContent()).toBe(Room.CONTENT.exit);
    });

    test("Dimensions are set up correctly", () => {
        expect(dungeonEasy.getDimensions()).toBe(Dungeon.DIFFICULTY.Easy * 5);
    });

    test("Traversable from entrance to exit.", () => {
        // TODO figure out how to implement recursive test (DFS)
    });

    test("All four pillars are placed in dungeon", () => {
        let currentRoom;
        let abstractionPillarPlaced = false;
        let encapsulationPillarPlaced = false;
        let inheritancePillarPlaced = false;
        let polymorphismPillarPlaced = false;
        for (let row = 0; row < dungeonEasy.getDimensions(); row++) {
            for (let col = 0; col < dungeonEasy.getDimensions(); col++) {
                currentRoom = dungeonEasy.getRoom(new Coordinate(row, col));
                if (currentRoom.getContent() === Room.CONTENT.abstractionPillar) {
                    abstractionPillarPlaced = true;
                } else if (currentRoom.getContent() === Room.CONTENT.encapsulationPillar) {
                    encapsulationPillarPlaced = true;
                } else if (currentRoom.getContent() === Room.CONTENT.inheritancePillar) {
                    inheritancePillarPlaced = true;
                } else if (currentRoom.getContent() === Room.CONTENT.polymorphismPillar) {
                    polymorphismPillarPlaced = true;
                }
            }
        }
        expect(abstractionPillarPlaced).toBeTruthy();
        expect(encapsulationPillarPlaced).toBeTruthy();
        expect(inheritancePillarPlaced).toBeTruthy();
        expect(polymorphismPillarPlaced).toBeTruthy();
    });

    test("All edge rooms have corresponding doors closed", () => {
        let roomClosedNorth;
        let roomClosedEast;
        let roomClosedSouth;
        let roomClosedWest;
        const edge = dungeonEasy.getDimensions() - 1;
        for (let i = 0; i <= edge; i++) {
            roomClosedNorth = dungeonEasy.getRoom(new Coordinate(0, i));
            expect(roomClosedNorth.isNorthDoorOpen()).toBeFalsy();
            roomClosedEast = dungeonEasy.getRoom(new Coordinate(i, edge));
            expect(roomClosedEast.isEastDoorOpen()).toBeFalsy();
            roomClosedSouth = dungeonEasy.getRoom(new Coordinate(edge, i));
            expect(roomClosedSouth.isSouthDoorOpen()).toBeFalsy();
            roomClosedWest = dungeonEasy.getRoom(new Coordinate(i, 0));
            expect(roomClosedWest.isWestDoorOpen()).toBeFalsy();
        }
    });
});

describe("Tests Dungeon class with invalid input.", () => {
    test("Test Dungeon class created with negative difficulty.", () => {
        expect(() => new Dungeon(-1)).toThrow();
    });
    test("Test Dungeon class created with to large a difficulty", () => {
        expect(() => new Dungeon(Dungeon.DIFFICULTY.Hard + 1)).toThrow();
    });
});