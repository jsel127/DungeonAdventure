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
        function exitReachable(theDungeon, theRoom) {
            const visited = new Array(theDungeon.getDimensions() + Dungeon.BUFFER * 2);
            for (let row = 0; row < visited.length; row++) {
                visited[row] = new Array(theDungeon.getDimensions() + Dungeon.BUFFER * 2).fill(false);
            }
            return checkExitReached(visited, theDungeon, theRoom);
        }
        function checkExitReached(theVisited, theDungeon, theRoom) {
            const coordinate = theRoom.getCoordinate();
            theVisited[coordinate.getRow()][coordinate.getCol()] = true;
            if (theRoom.isExit()) {
                return true;
            } 
            if (theRoom.isNorthDoorOpen() && theVisited[coordinate.getRow() - 1][coordinate.getCol()]) {
                return checkExitReached(theVisited, theDungeon, theDungeon.getRoomWithRowCol(coordinate.getRow() - 1, coordinate.getCol()));
            }
            if (theRoom.isEastDoorOpen() && theVisited[coordinate.getRow()][coordinate.getCol() + 1]) {
                return checkExitReached(theVisited, theDungeon, theDungeon.getRoomWithRowCol(coordinate.getRow(), coordinate.getCol() + 1));
            }
            if (theRoom.isSouthDoorOpen() && theVisited[coordinate.getRow() + 1][coordinate.getCol() ]) {
                return checkExitReached(theVisited, theDungeon, theDungeon.getRoomWithRowCol(coordinate.getRow() + 1, coordinate.getCol()));
            }
            if (theRoom.isWestDoorOpen() && theVisited[coordinate.getRow()][coordinate.getCol() - 1]) {
                return checkExitReached(theVisited, theDungeon, theDungeon.getRoomWithRowCol(coordinate.getRow(), coordinate.getCol() - 1));
            } 
            return false;
        };
        expect(() => {
            const entrance = dungeonEasy.getEntrance();
            return exitReachable(dungeonEasy, entrance);
        }).toBeTruthy();
    });

    test("All four pillars are placed in dungeon", () => {
        let currentRoom;
        let abstractionPillarPlaced = false;
        let encapsulationPillarPlaced = false;
        let inheritancePillarPlaced = false;
        let polymorphismPillarPlaced = false;
        for (let row = Dungeon.BUFFER; row < dungeonEasy.getDimensions() + Dungeon.BUFFER; row++) {
            for (let col = Dungeon.BUFFER; col < dungeonEasy.getDimensions() + Dungeon.BUFFER; col++) {
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
        const edge = dungeonEasy.getDimensions();
        for (let i = Dungeon.BUFFER; i < dungeonEasy.getDimensions() + Dungeon.BUFFER; i++) {
            roomClosedNorth = dungeonEasy.getRoomWithRowCol(Dungeon.BUFFER, i);
            expect(roomClosedNorth.isNorthDoorOpen()).toBeFalsy();
            roomClosedEast = dungeonEasy.getRoomWithRowCol(i, edge);
            expect(roomClosedEast.isEastDoorOpen()).toBeFalsy();
            roomClosedSouth = dungeonEasy.getRoomWithRowCol(edge, i);
            expect(roomClosedSouth.isSouthDoorOpen()).toBeFalsy();
            roomClosedWest = dungeonEasy.getRoomWithRowCol(i, Dungeon.BUFFER);
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

describe("Tests Saves and Loads Dungeon class", () => {
    test("Saves and Loads Dungeon properly (No chances made from initialization)", () => {
        const dungeonToSave = new Dungeon(Dungeon.DIFFICULTY.Easy);
        const dungeonFromSave = Dungeon.fromJSON(JSON.parse(JSON.stringify(dungeonToSave)));
        expect(dungeonFromSave.toString()).toBe(dungeonToSave.toString());
    });

    test("Save and Load on invalid data", () => {
        expect(() => Dungeon.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});