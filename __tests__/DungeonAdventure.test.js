/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonAdventure from "../DungeonAdventure";
import Warrior from "../characters/Warrior";
import Dungeon from "../dungeon/Dungeon";

describe("Tests main functionality", () => {
    const gameWarriorEasy = new DungeonAdventure();
    // Testing purposes created getter methods for this purpose (will be removed)
    test("Setting adventurer", () => {
        gameWarriorEasy.setAdventurer("Warrior", "Jasmine");
        const adventurer = gameWarriorEasy.getAdventurer();
        expect(adventurer instanceof Warrior).toBeTruthy();
        expect(adventurer.getName()).toBe("Jasmine");
    });

    test("Adventurer starts at the entrance.", () => {
        gameWarriorEasy.setDifficulty(Dungeon.DIFFICULTY.Easy);
        gameWarriorEasy.startGame();
        const currentRoom = gameWarriorEasy.getCurrentRoom();
        expect(currentRoom.isEntrance()).toBeTruthy();
    });
});

