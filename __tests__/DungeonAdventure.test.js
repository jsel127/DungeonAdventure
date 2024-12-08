/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import fs from 'fs';
import DungeonAdventure from "../DungeonAdventure.js";
import HeroFactory from "../characters/HeroFactory.js";
import Dungeon from "../dungeon/Dungeon.js";
import Room from "../dungeon/Room.js";

describe("Tests main starting functionality", () => {
    const gameWarriorEasy = new DungeonAdventure();

    test("Getting available heros", () => {
        const heroes = DungeonAdventure.getHeroes();
        expect(heroes[0]).toBe(HeroFactory.getWarriorData());
        expect(heroes[1]).toBe(HeroFactory.getPriestessData());
        expect(heroes[2]).toBe(HeroFactory.getThiefData());
    });

    test("Getting difficulty levels", () => {
        expect(DungeonAdventure.getDifficulties()).toStrictEqual(Object.keys(Dungeon.DIFFICULTY));
    });

    test("Setting difficulty", () => {
        const levels = Object.keys(Dungeon.DIFFICULTY);
        for (let i = 0; i < levels.length; i++) {
            gameWarriorEasy.setDifficulty(levels[i]);
            expect(gameWarriorEasy.getDifficulty()).toBe(Dungeon.DIFFICULTY[levels[i]]);
        }
    });

    test("Setting Hero type", () => {
        const heroes = DungeonAdventure.getHeroes();
        for (let i = 0; i < heroes.length; i++) {
            gameWarriorEasy.setAdventurer(heroes[i].name, "Bob");
            const defaultHero = HeroFactory.createHero(heroes[i].name, "Bob");
            expect(gameWarriorEasy.getAdventurerInfo()).toStrictEqual(defaultHero.toJSON());
        }
    });

    describe("Starting the game", () => {
        gameWarriorEasy.setAdventurer("Warrior", "Tester");
        gameWarriorEasy.setDifficulty("Easy");
        gameWarriorEasy.startGame();

        test("Check current room is the entrance", () => {
            const currentRoom = gameWarriorEasy.getCurrentRoomInfo();
            expect(currentRoom.__type === Room.name).toBeTruthy();
            expect(currentRoom.content).toBeTruthy();
        });

        test("Check status of game is now started", () => {
            expect(gameWarriorEasy.getStartStatus()).toBeTruthy();
        });
    });

    test("Get difficulty to return an the proper difficulty", () => {
        expect(gameWarriorEasy.getDifficulty()).toBe(Dungeon.DIFFICULTY.Easy);
    });
});

describe("Tests Saves and Loads DungeonAdventure class", () => {
    test("Saves and Loads DungeonAdventure properly (No chances made from initialization)", () => {
        const dungeonAdventureToSave = new DungeonAdventure();
        dungeonAdventureToSave.setDifficulty("Easy");
        dungeonAdventureToSave.setAdventurer("Warrior", "Jasmine");
        dungeonAdventureToSave.startGame();

        const dungeonAdventureFromSave = DungeonAdventure.fromJSON(JSON.parse(JSON.stringify(dungeonAdventureToSave)));
        expect(dungeonAdventureFromSave.toJSON()).toStrictEqual(dungeonAdventureToSave.toJSON());
    });

    test("Save and Load on invalid data", () => {
        expect(() => DungeonAdventure.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});


describe("Tests DungeonAdventure on Dungeon where move straight until you reach a wall then move down (top [entrance] to bottom [exit])", () => {
    const fileEasyDungeon = fs.readFileSync('easyDA.txt');
    const easyDungeonTopLeftBottomRight = DungeonAdventure.fromJSON(JSON.parse(fileEasyDungeon.toString().trim()));

    describe("Traverse maze until reach end of maze. Check functionality of DungeonAdventure navigation and parsing move (e.g. picking up items).", () => {
        test("Get valid starting moves", () => {
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeFalsy();
            expect(validMoves.east).toBeTruthy();
            expect(validMoves.south).toBeFalsy();
            expect(validMoves.west).toBeFalsy();
        });
        describe("Process moving east (1,2)", () => {
            test("Moving east", () => {
                easyDungeonTopLeftBottomRight.moveEast();
                const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
                expect(validMoves.north).toBeFalsy();
                expect(validMoves.east).toBeTruthy();
                expect(validMoves.south).toBeFalsy();
                expect(validMoves.west).toBeTruthy();
            });

            test("Abstraction pillar has been properly added to the inventory class", () => {
                const adventure = easyDungeonTopLeftBottomRight.getAdventurerInfo();
                expect(adventure.hero.inventory.items.healing_potion).toBe(0);
                expect(adventure.hero.inventory.items.vision_potion).toBe(0);
                expect(adventure.hero.inventory.items.pillars.abstraction).toBeTruthy();
                expect(adventure.hero.inventory.items.pillars.encapsulation).toBeFalsy();
                expect(adventure.hero.inventory.items.pillars.inheritance).toBeFalsy();
                expect(adventure.hero.inventory.items.pillars.polymorphism).toBeFalsy();
            });
        });
    });
});
