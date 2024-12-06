/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Monster from "../characters/Monster.js";
import Hero from "../characters/Hero.js";
import Warrior from "../characters/Warrior.js";
// TODO: test attack method
describe('Tests Monster Character instanciated to Name: Gremlin, HP: 70, DPMin: 15, DPMax: 30, AttackSpeed: 5, HitChange: 80, HealChance: 40, MinHeal: 20, MaxHeal: 40', () => {
    const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
    test('Creating the character', () => {
        expect(gremlin.toString()).toBe("Gremlin 70 15 30 5 80 40 20 40");
    });

    // GETTER methods
    test('getName', () => {
        expect(gremlin.getName()).toBe("Gremlin");
    });

    test('getHP', () => {
        expect(gremlin.getHP()).toBe(70);
    });

    test('getDPMin', () => {
        expect(gremlin.getDPMin()).toBe(15);
    });

    test('getDPMax', () => {
        expect(gremlin.getDPMax()).toBe(30);
    });

    test('getAttackSpeed', () => {
        expect(gremlin.getAttackSpeed()).toBe(5);
    });

    test('getHitChance', () => {
        expect(gremlin.getHitChance()).toBe(80);
    });

    test('getHealChance', () => {
        expect(gremlin.getHealChance()).toBe(40);
    });

    test('getMinHeal', () => {
        expect(gremlin.getMinHeal()).toBe(20);
    });

    test('getMaxHeal', () => {
        expect(gremlin.getMaxHeal()).toBe(40);
    });

    // SETTER methods
    test('setHP to smaller number (10)', () => {
        gremlin.setHP(10);
        expect(gremlin.getHP()).toBe(10);
    });

    test('setHP to larger number (500)', () => {
        gremlin.setHP(500);
        expect(gremlin.getHP()).toBe(500);
    });

    test('setHP to 0', () => {
        gremlin.setHP(0);
        expect(gremlin.getHP()).toBe(0);
    });

    test('setHP to -1', () => {
        expect(() => gremlin.setHP(-1)).toThrow(RangeError);
    });

    test('isDead when the monster is NOT dead HP 100', () => {
        gremlin.setHP(100);
        expect(gremlin.isDead()).toBeFalsy();
    });

    test('isDead when the monster is NOT dead HP 1', () => {
        gremlin.setHP(1);
        expect(gremlin.isDead()).toBeFalsy();
    });

    test('isDead when the monster is dead', () => {
        gremlin.setHP(0);
        expect(gremlin.isDead()).toBeTruthy();
    });
});

describe("Testing attack and heal method of Monster class.", () => {
    test('Attack lands when HitChance is 100', () => {
        const oneHundredHitChanceGremlin = new Monster("Gremlin", 10, 2, 2, 1, 100, 100, 1, 5);
        const warrior = new Warrior("Bob", 12, 1, 1, 1, 1, 10);
        oneHundredHitChanceGremlin.attack(warrior);
        expect(warrior.getHP()).toBe(10);
    });

    test('Attack lands does not land when HitChance is 0', () => {
        const oneHundredHitChanceGremlin = new Monster("Gremlin", 10, 10, 10, 1, 0, 100, 1, 5);
        const warrior = new Warrior("Bob", 12, 1, 1, 1, 1, 10);
        for (let i = 0; i < 20; i++) {
            oneHundredHitChanceGremlin.attack(warrior);        
        }        
        expect(warrior.getHP()).toBe(12);
    });

    test("Heals when HealChance is 100 min and max heal is 5HP", () => {
        const oneHundredHealChanceGremlin = new Monster("Gremlin", 10, 10, 10, 1, 0, 100, 5, 5);
        oneHundredHealChanceGremlin.heal();
        expect(oneHundredHealChanceGremlin.getHP()).toBe(15);
        oneHundredHealChanceGremlin.heal();
        expect(oneHundredHealChanceGremlin.getHP()).toBe(20);
    });

    test("Does not heal when heal chance is zero", () => {
        const gremlin0HealChance = new Monster("Gremlin", 10, 1, 2, 10, 100, 0, 10, 11);
        
        expect(gremlin0HealChance.getHP()).toBe(10);
    });

    test("Fail to heal when HP is 0", () => {
        const warrior100HitRate = new Warrior("Bob", 10, 5, 5, 10, 100, 100);
        warrior100HitRate.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const fatedToDieGremlin = new Monster("Gremlin", 5, 10, 10, 10, 100, 100, 1, 1);
        warrior100HitRate.attack(fatedToDieGremlin);
        expect(fatedToDieGremlin.isDead()).toBeTruthy();
        expect(() => fatedToDieGremlin.heal()).toThrow();
    });
});

describe('Tests Monster Character constructor instanciated with invalid arguments.', () => {  
    test('Creating the character with no name', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative HP', () => {
        expect(() => new Monster("Gremlin", -1, 15, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with zero HP', () => {
        expect(() => new Monster("Gremlin", 0, 15, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative DPMin', () => {
        expect(() => new Monster("Gremlin", 70, -1, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative DPMax', () => {
        expect(() => new Monster("Gremlin", 70, 15, -1, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with zero AttackSpeed', () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 0, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative AttackSpeed', () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, -1, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with a HealChance greater than 100', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 101, 20, 40)).toThrow();
    });

    test('Creating the character with a HealChance less than 0', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, -1, 20, 40)).toThrow();
    });

    test('Creating the character with a MinHeal less than 0', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, -1, 40)).toThrow();
    });

    test('Creating the character with a MaxHeal less than 0', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, 20, -1)).toThrow();
    });
});

describe("Tests Monster's setter methods with invalid data", () => {
    test('Set HP to a negative value', () => {
        expect(() => {
            const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
            gremlin.setHP(-1);
        }).toThrow();
    });
});

describe("Tests Saves and Loads Monster class", () => {
    test("Saves and Loads Monster class properly (No chances made from initialization)", () => {
        const monsterToSave = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
        const monsterFromSave = Monster.fromJSON(JSON.parse(JSON.stringify(monsterToSave)));
        expect(monsterFromSave.toString()).toBe(monsterToSave.toString());
    });

    test("Save and Load on invalid data", () => {
        expect(() => Monster.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});
