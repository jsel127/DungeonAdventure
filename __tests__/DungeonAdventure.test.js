/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonAdventure from "../DungeonAdventure";
import Hero from "../characters/Hero";
import HeroFactory from "../characters/HeroFactory";
import Warrior from "../characters/Warrior";
import Dungeon from "../dungeon/Dungeon";

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
            expect(gameWarriorEasy.getAdventurer()).toStrictEqual(HeroFactory.createHero(heroes[i].name));
        }
    });
    // // Testing purposes created getter methods for this purpose (will be removed)
    // test("Setting adventurer", () => {
    //     gameWarriorEasy.setAdventurer("Warrior", "Jasmine");
    //     const adventurer = gameWarriorEasy.getAdventurer();
    //     expect(adventurer instanceof Warrior).toBeTruthy();
    //     expect(adventurer.getName()).toBe("Jasmine");
    // });

    // test("Get difficulty levels", () => {
    //     expect(DungeonAdventure.getDifficulties()).toStrictEqual(Object.keys(Dungeon.DIFFICULTY));
    // });

    // test("Setting difficulty", () => {
    //     gameWarriorEasy.setDifficulty(DungeonAdventure.getDifficulties()[2]);
    //     expect(gameWarriorEasy.getDifficulty()).toBe(Dungeon.DIFFICULTY.Easy);
    // })

    // // test("Adventurer starts at the entrance.", () => {
    // //     gameWarriorEasy.setDifficulty(Dungeon.DIFFICULTY.Easy);
    // //     gameWarriorEasy.startGame();
    // //     const currentRoom = gameWarriorEasy.getCurrentRoom();
    // //     expect(currentRoom.isEntrance()).toBeTruthy();
    // // });
});

// describe("Tests Saves and Loads DungeonAdventure class", () => {
//     test("Saves and Loads Thief DungeonAdventure properly (No chances made from initialization)", () => {
//         const dungeonAdventureToSave = new DungeonAdventure();
//         const dungeonAdventureFromSave = DungeonAdventure.fromJSON(JSON.parse(JSON.stringify(dungeonAdventureToSave)));
//         expect(dungeonAdventureFromSave.toString()).toBe(dungeonAdventureToSave.toString());
//     });

//     test("Save and Load on invalid data", () => {
//         expect(() => DungeonAdventure.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
//     });
// });

