/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import DungeonCharacter from "../characters/DungeonCharacter.js";
// TODO: test attack method
describe('Tests Dungeon Character instanciated to Name: Alice, HP: 20, DPMin: 1, DPMax: 5, AttackSpeed: 1, HitChange: 100', () => {
    const oneHundredHitChance = new DungeonCharacter("Alice", 20, 1, 5, 1, 100);  
    test('Creating the character', () => {
        expect(oneHundredHitChance.toString()).toBe("Alice 20 1 5 1 100");
    });

    // GETTER methods
    test('getName', () => {
        expect(oneHundredHitChance.getName()).toBe("Alice");
    });

    test('getHP', () => {
        expect(oneHundredHitChance.getHP()).toBe(20);
    });

    test('getDPMin', () => {
        expect(oneHundredHitChance.getDPMin()).toBe(1);
    });

    test('getDPMax', () => {
        expect(oneHundredHitChance.getDPMax()).toBe(5);
    });

    test('getAttackSpeed', () => {
        expect(oneHundredHitChance.getAttackSpeed()).toBe(1);
    });

    test('getHitChance', () => {
        expect(oneHundredHitChance.getHitChance()).toBe(100);
    });

    // SETTER methods
    test('setHP to smaller number (10)', () => {
        oneHundredHitChance.setHP(10);
        expect(oneHundredHitChance.getHP()).toBe(10);
    });

    test('setHP to larger number (500)', () => {
        oneHundredHitChance.setHP(500);
        expect(oneHundredHitChance.getHP()).toBe(500);
    });

    test('setHP to 0', () => {
        oneHundredHitChance.setHP(0);
        expect(oneHundredHitChance.getHP()).toBe(0);
    });

    test('setHP to -1', () => {
        expect(() => oneHundredHitChance.setHP(-1)).toThrow(RangeError);
    });

    test('isDead when the character is NOT dead HP 100', () => {
        oneHundredHitChance.setHP(100);
        expect(oneHundredHitChance.isDead()).toBeFalsy();
    });

    test('isDead when the character is NOT dead HP 1', () => {
        oneHundredHitChance.setHP(1);
        expect(oneHundredHitChance.isDead()).toBeFalsy();
    });

    test('isDead when the character is dead', () => {
        oneHundredHitChance.setHP(0);
        expect(oneHundredHitChance.isDead()).toBeTruthy();
    });
})


