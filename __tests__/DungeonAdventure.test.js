/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonAdventure from "../DungeonAdventure.js";
import HeroFactory from "../characters/HeroFactory.js";
import Dungeon from "../dungeon/Dungeon.js";
import Room from "../dungeon/Room.js";
import Hero from "../characters/Hero.js";
import Inventory from "../characters/Inventory.js";

describe("Tests main functionality", () => {
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
            expect(gameWarriorEasy.getAdventurer()).toStrictEqual(HeroFactory.createHero(heroes[i].name, "Bob"));
        }
    });

    describe("Starting the game", () => {
        gameWarriorEasy.setAdventurer("Warrior", "Tester");
        gameWarriorEasy.setDifficulty("Easy");
        gameWarriorEasy.startGame();

        test("Check current room is the entrance", () => {
            const currentRoom = gameWarriorEasy.getCurrentRoom();
            expect(currentRoom instanceof Room).toBeTruthy();
            expect(currentRoom.isEntrance()).toBeTruthy();
        });

        test("Check status of game is now started", () => {
            expect(gameWarriorEasy.getStartStatus()).toBeTruthy();
        });
    });
   

    test("Getting valid moves (makes sure getting status of correct door.", () => {
        const validMoves = gameWarriorEasy.getValidMoves();
        const currentRoom = gameWarriorEasy.getCurrentRoom();
        expect(validMoves.north).toBe(currentRoom.isNorthDoorOpen());
        expect(validMoves.east).toBe(currentRoom.isEastDoorOpen());
        expect(validMoves.south).toBe(currentRoom.isSouthDoorOpen());
        expect(validMoves.west).toBe(currentRoom.isWestDoorOpen());
    });

    describe("Vision potion returns an array of 9 adjacent rooms including itself.", () => {
        test("Vision potion properly returns an 2D array of rooms", () => {
            const adventurer = gameWarriorEasy.getAdventurer();
            const inventory = adventurer.getInventory();
            inventory.addVisionPotion();
            const adjacentRooms =  gameWarriorEasy.useVisionPotion();
            expect(Array.isArray(adjacentRooms)).toBeTruthy();
            for (let row = 0; row < adjacentRooms.length; row++) {
                for (let col = 0; col < adjacentRooms[row].length; col++) {
                    expect(adjacentRooms[row][col] instanceof Room || adjacentRooms[row][col] == null).toBeTruthy();
                }
            }
        });
    });

    describe("Healing potion increases the hero's HP by Inventorys set behavior for heal", () => {
        test("If no healing potion is avaiable", () => {
            expect(gameWarriorEasy.useHealingPotion()).toBe("You have not healing potions");
        })
        test("If healing potion is available", () => {
            const adventurer = gameWarriorEasy.getAdventurer();
            const inventory = adventurer.getInventory();
            const priorHP = adventurer.getHP();
            inventory.addHealingPotion();
            gameWarriorEasy.useHealingPotion();
            expect(adventurer.getHP() - priorHP).toBe(Inventory.HEALTH_POTION_MAX_HP);
        });
    });

    // describe("Test navigation methods (moving rooms)", () => {
    //     const adventurer = gameWarriorEasy.getAdventurer();
    //     const inventory = adventurer.getInventory();
    //     inventory.addVisionPotion();
    //     const adjacentRooms = gameWarriorEasy.useVisionPotion();
    //     const middleRoom = gameWarriorEasy.getCurrentRoom();
    //     describe("Moving north", () => {
    //         const northRoom = adjacentRooms[0][1];
    //         test("Room is not entered if the north door is closed.", () => {
    //             if (!middleRoom.isNorthDoorOpen()) {
    //                 expect(northRoom).not.toBe(middleRoom);
    //             } else {
    //                 expect(northRoom).toBe(middleRoom);
    //                 gameWarriorEasy.moveSouth();
    //             } 
    //         });
    //         test("Content in the room is properly picked up and put into the inventory.", () => {
                
    //         });
    //     });

    //     describe("Moving east", () => {

    //     });

    //     describe("Moving south", () => {

    //     });

    //     describe("Moving west", () => {

    //     });
    // });

    test("Get adventurer to return something of Hero type", () => {
        expect(gameWarriorEasy.getAdventurer() instanceof Hero).toBeTruthy();
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
        expect(dungeonAdventureFromSave.viewDungeon()).toBe(dungeonAdventureToSave.viewDungeon());
        expect(dungeonAdventureFromSave.getAdventurer()).toStrictEqual(dungeonAdventureToSave.getAdventurer());
        expect(dungeonAdventureFromSave.getCurrentRoom()).toStrictEqual(dungeonAdventureToSave.getCurrentRoom());
        expect(dungeonAdventureFromSave.getDifficulty()).toBe(dungeonAdventureToSave.getDifficulty());
        expect(dungeonAdventureFromSave.getStartStatus()).toBeTruthy();
    });

    test("Save and Load on invalid data", () => {
        expect(() => DungeonAdventure.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});

