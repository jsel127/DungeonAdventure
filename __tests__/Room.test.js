/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Room from "../dungeon/Room.js";
import Coordinate from "../dungeon/Coordinate.js";
import Door from "../dungeon/Door.js";
import Dungeon from "../dungeon/Dungeon.js";
import MonsterFactory from "../characters/MonsterFactory.js";
import Monster from "../characters/Monster.js";
/**
 * Tests Room class consists of doors, content, and coordinates.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Default room status", () => {
    const defaultRoom = new Room();
    test("Coordinates are set to 1, 1 by default", () => {
        const coord = defaultRoom.getCoordinate();
        expect(coord.getCol()).toBe(1);
        expect(coord.getRow()).toBe(1);
    });

    test("Doors are all closed", () => {
        expect(defaultRoom.isNorthDoorOpen()).toBeFalsy();
        expect(defaultRoom.isEastDoorOpen()).toBeFalsy();
        expect(defaultRoom.isSouthDoorOpen()).toBeFalsy();
        expect(defaultRoom.isWestDoorOpen()).toBeFalsy();
    });

    test("Content is empty", () => {
        expect(defaultRoom.getContent()).toBe(Room.CONTENT.empty);
    });
});

describe("Test methods in Room class", () => {
    describe("Set method", () => {
        let room;
        beforeEach(() => {
            room = new Room();
        });
        test("Healing potion", () => {
            room.setContent(Room.CONTENT.healingPotion);
            expect(room.getContent()).toBe(Room.CONTENT.healingPotion);
        });

        test("Abstraction pillar", () => {
            room.setContent(Room.CONTENT.abstractionPillar);
            expect(room.getContent()).toBe(Room.CONTENT.abstractionPillar);
        });
        
        test("Ogre", () => {
            room.setContent(Room.CONTENT.ogre);
            expect(room.getContent()).toBe(Room.CONTENT.ogre);
        });

        test("Invalid data: integer", () => {
            expect(() => room.setContent(1)).toThrow(TypeError);
        });

        test("Invalid data: boolean", () => {
            expect(() => room.setContent(true)).toThrow(TypeError);
        });
    });

    test("Clear Contents", () => {
        const room = new Room();
        room.setContent(Room.CONTENT.healingPotion);
        room.clearContent();
        expect(room.isEmpty()).toBeTruthy();
    });

    describe("getContent", () => {
        test("empty", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.empty).getContent()).toBe(' ');
        });
        test("healing potion", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.healingPotion).getContent()).toBe('#');
        });
        test("vision potion", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.visionPotion).getContent()).toBe('/');
        });
        test("abstraction pillar", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.abstractionPillar).getContent()).toBe('A');
        });
        test("encapsulation pillar", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.encapsulationPillar).getContent()).toBe('E');
        });
        test("inheritance pillar", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.inheritancePillar).getContent()).toBe('I');
        });
        test("polymorphism pillar", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.polymorphismPillar).getContent()).toBe('P');
        });
        test("pit", () => {
            expect((new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.pit)).getContent()).toBe('x');
        });

        test("exit", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.exit).getContent()).toBe('+');
        });

        test("entrance", () => {
            expect(new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
            new Door(), new Door(), new Door(), Room.CONTENT.entrance).getContent()).toBe('-');
        });
    });

    describe("getCoordinate", () => {
        test("Row: 1, Col: 1", () => {
            const roomR0C0 = new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
                             new Door(), new Door(), new Door(), Room.CONTENT.empty);
            const coordinate = roomR0C0.getCoordinate();
            expect(coordinate.getCol()).toBe(1);
            expect(coordinate.getRow()).toBe(1);
        });

        test("Row: 567, Col: 111", () => {
            const roomR0C0 = new Room(new Coordinate(567, 111), new Door(), 
                             new Door(), new Door(), new Door(), Room.CONTENT.empty);
            const coordinate = roomR0C0.getCoordinate();
            expect(coordinate.getCol()).toBe(111);
            expect(coordinate.getRow()).toBe(567);
        });

        test("Row: 2, Col:42", () => {
            const roomR0C0 = new Room(new Coordinate(2, 42), new Door(), 
                             new Door(), new Door(), new Door(), Room.CONTENT.empty);
            const coordinate = roomR0C0.getCoordinate();
            expect(coordinate.getCol()).toBe(42);
            expect(coordinate.getRow()).toBe(2);
        });
    });

    describe("Door setting correct", () => {
        test("Create room with north door open. isNorthDoorOpen", () => {
            const roomN = new Room(new Coordinate(1, 1), new Door(true), 
                             new Door(), new Door(), new Door(), Room.CONTENT.empty);
            expect(roomN.isNorthDoorOpen()).toBeTruthy();
            expect(roomN.isEastDoorOpen()).toBeFalsy();
            expect(roomN.isSouthDoorOpen()).toBeFalsy();
            expect(roomN.isWestDoorOpen()).toBeFalsy();
        });

        test("Create room with north door open. isEastDoorOpen", () => {
            const roomE = new Room(new Coordinate(1, 1), new Door(), 
                             new Door(true), new Door(), new Door(), Room.CONTENT.empty);
            expect(roomE.isNorthDoorOpen()).toBeFalsy();
            expect(roomE.isEastDoorOpen()).toBeTruthy();
            expect(roomE.isSouthDoorOpen()).toBeFalsy();
            expect(roomE.isWestDoorOpen()).toBeFalsy();
        });

        test("Create room with north door open. isSouthDoorOpen", () => {
            const roomS = new Room(new Coordinate(1, 1), new Door(), 
                             new Door(), new Door(true), new Door(), Room.CONTENT.empty);
            expect(roomS.isNorthDoorOpen()).toBeFalsy();
            expect(roomS.isEastDoorOpen()).toBeFalsy();
            expect(roomS.isSouthDoorOpen()).toBeTruthy();
            expect(roomS.isWestDoorOpen()).toBeFalsy();
        });

        test("Create room with north door open. isWestDoorOpen", () => {
            const roomN = new Room(new Coordinate(1, 1), new Door(), 
                             new Door(), new Door(), new Door(true), Room.CONTENT.empty);
            expect(roomN.isNorthDoorOpen()).toBeFalsy();
            expect(roomN.isEastDoorOpen()).toBeFalsy();
            expect(roomN.isSouthDoorOpen()).toBeFalsy();
            expect(roomN.isWestDoorOpen()).toBeTruthy();
        });
    });

    describe("Tests content checker methods", () => {
        test("isEmpty", () => {
            const emptyRoom = new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
                                      new Door(), new Door(), new Door(), Room.CONTENT.empty);
            expect(emptyRoom.isEmpty()).toBeTruthy();
            expect(emptyRoom.isExit()).toBeFalsy();
            expect(emptyRoom.isPit()).toBeFalsy();
            expect(emptyRoom.isEntrance()).toBeFalsy();
        });

        test("isExit", () => {
            const exitRoom = new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
                                      new Door(), new Door(), new Door(), Room.CONTENT.exit);
            expect(exitRoom.isEmpty()).toBeFalsy();
            expect(exitRoom.isExit()).toBeTruthy();
            expect(exitRoom.isPit()).toBeFalsy();
            expect(exitRoom.isEntrance()).toBeFalsy();
        });

        test("isPit", () => {
            const pitRoom = new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
                                      new Door(), new Door(), new Door(), Room.CONTENT.pit);
            expect(pitRoom.isEmpty()).toBeFalsy();
            expect(pitRoom.isExit()).toBeFalsy();
            expect(pitRoom.isPit()).toBeTruthy();
            expect(pitRoom.isEntrance()).toBeFalsy();        
        });

        test("isEntrance", () => {
            const entranceRoom = new Room(new Coordinate(Dungeon.BUFFER, Dungeon.BUFFER), new Door(), 
                                      new Door(), new Door(), new Door(), Room.CONTENT.entrance);
            expect(entranceRoom.isEmpty()).toBeFalsy();
            expect(entranceRoom.isExit()).toBeFalsy();
            expect(entranceRoom.isPit()).toBeFalsy();
            expect(entranceRoom.isEntrance()).toBeTruthy();           
        });
    });
});

describe("Tests spawnMonster method", () => {
    let room;
    beforeEach(() => {
        room = new Room();
    });

    test("Ogre spawn", () => {
        room.setContent(Room.CONTENT.ogre);
        const result = room.spawnMonster();
        expect(result instanceof Monster).toBeTruthy();
        expect(JSON.stringify(result)).toBe(JSON.stringify(MonsterFactory.createMonster("Ogre")));
    });

    test("Gremlin spawn", () => {
        room.setContent(Room.CONTENT.gremlin);
        const result = room.spawnMonster();
        expect(result instanceof Monster).toBeTruthy();
        expect(JSON.stringify(result)).toBe(JSON.stringify(MonsterFactory.createMonster("Gremlin")));
    });

    test("Skeleton spawn", () => {
        room.setContent(Room.CONTENT.skeleton);
        const result = room.spawnMonster();
        expect(result instanceof Monster).toBeTruthy();
        expect(JSON.stringify(result)).toBe(JSON.stringify(MonsterFactory.createMonster("Skeleton")));
    });

    test("If no monster false is returned", () => {
        expect(room.spawnMonster()).toBeFalsy();
    });
});

describe("Tests Saves and Loads Room class", () => {
    test("Saves and Loads Room class properly (No chances made from initialization)", () => {
        const roomToSave = new Room();  
        const roomFromSave = Room.fromJSON(JSON.parse(JSON.stringify(roomToSave)));
        expect(JSON.stringify(roomFromSave)).toBe(JSON.stringify(roomToSave));
    });

    test("Saves and Loads Room class properly (content changed)", () => {
        const roomToSave = new Room();  
        roomToSave.setContent(Room.CONTENT.healingPotion);
        const roomFromSave = Room.fromJSON(JSON.parse(JSON.stringify(roomToSave)));
        expect(JSON.stringify(roomFromSave)).toBe(JSON.stringify(roomToSave));
    });

    test("Save and Load on invalid data", () => {
        expect(() => Room.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});