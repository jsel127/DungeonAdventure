/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Warrior from "../characters/Warrior.js";
import Thief from "../characters/Thief.js";
import Priestess from "../characters/Priestess.js";
import HeroFactory from "../characters/HeroFactory.js";

describe("Testing hero factory to ensure proper hero is created and the object is instaciated.", () => {
    test("Creating a warrior", () => {
        const warrior = HeroFactory.createHero("Warrior", "Stone");
        expect(warrior instanceof Warrior).toBeTruthy();
        expect(warrior.toString()).toBe("Stone 125 35 60 4 80 20");
    });
    test("Creating a priestess", () => {
        const priestess = HeroFactory.createHero("Priestess", "Stone");
        expect(priestess instanceof Priestess).toBeTruthy();
        expect(priestess.toString()).toBe("Stone 75 25 45 5 70 30");
    });
    test("Creating a thief", () => {
        const thief = HeroFactory.createHero("Thief", "Stone");
        expect(thief instanceof Thief).toBeTruthy();
        expect(thief.toString()).toBe("Stone 75 20 40 6 80 40")
    });
    test("Creates an invalid hero type", () => {
        expect(() => HeroFactory.createHero("Skeleton")).toThrow(ReferenceError);
    });
});

describe("Tests methods that get hero statistics", () => {
    test("Getting warrior data", () => {
        const defaultWarriorData = {
            name: "Warrior",
            hp: 125,
            dp_min: 35,
            dp_max: 60,
            attack_speed: 4,
            hit_chance: 80,
            block_chance: 20
        };
        const retrievedWarriorObject = HeroFactory.getWarriorData();
        expect(retrievedWarriorObject).toStrictEqual(defaultWarriorData);
        expect(retrievedWarriorObject.name).toBe(defaultWarriorData.name);
    });

    test("Getting priestess data", () => {
        const defaultPriestessData = {
            name: "Priestess",
            hp: 75,
            dp_min: 25,
            dp_max: 45,
            attack_speed: 5,
            hit_chance: 70,
            block_chance: 30
        };
        const retrievedPriestessObject = HeroFactory.getPriestessData();
        expect(retrievedPriestessObject).toStrictEqual(defaultPriestessData);
    });

    test("Getting thief data", () => {
        const defaultThiefData = {
            name: "Thief",
            hp: 75,
            dp_min: 20,
            dp_max: 40,
            attack_speed: 6,
            hit_chance: 80,
            block_chance: 40
        };
        const retrievedThiefObject = HeroFactory.getThiefData();
        expect(retrievedThiefObject).toStrictEqual(defaultThiefData);
    });
})

