/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import MonsterFactory from "../characters/MonsterFactory.js";
import Monster from "../characters/Monster.js";
describe("Tests the monster factory and ensures a Monster object is properly created", () => { 
    test('Creating an ogre', () => {
        const ogre = MonsterFactory.createMonster("Ogre");  
        expect(ogre instanceof Monster).toBeTruthy();
        expect(ogre.toString()).toBe("Ogre 200 30 60 2 60 10 30 60");
    });

    test('Creating an ogre', () => {
        const gremlin = MonsterFactory.createMonster("Gremlin");  
        expect(gremlin instanceof Monster).toBeTruthy();
        expect(gremlin.toString()).toBe("Gremlin 70 15 30 5 80 40 20 40");
    });

    test('Creating an ogre', () => {
        const skeleton = MonsterFactory.createMonster("Skeleton");  
        expect(skeleton instanceof Monster).toBeTruthy();
        expect(skeleton.toString()).toBe("Skeleton 100 30 50 3 80 30 30 50");
    });

    test('Creating an invalid monster', () => {
        expect(() => MonsterFactory.createMonster("Priestess")).toThrow();
    });
});