/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import MonsterFactory from "../characters/MonsterFactory";

describe("Tests the monster factory and ensures a Monster object is properly created", () => { 
    const oneHundredHitChance = MonsterFactory.createMonster("Ogre");  
    test('Creating the monster', () => {
        expect(oneHundredHitChance.toString()).toBe("Ogre 200 30 60 2 60 10 30 60");
    });
});