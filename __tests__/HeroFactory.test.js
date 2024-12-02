/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Warrior from "../characters/Warrior";
import Thief from "../characters/Thief";
import Priestess from "../characters/Priestess";
import HeroFactory from "../characters/HeroFactory";

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
});