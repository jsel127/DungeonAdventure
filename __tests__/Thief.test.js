/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "../characters/Hero.js";
import Thief from "../characters/Thief.js";
import MonsterFactory from "../characters/MonsterFactory.js";
describe("Tests Thief Character instanciated to Name: Thief, HP: 20, DPMin: 10, DPMax: 10, AttackSpeed: 5, HitChange: 100, BlockChance 100", () => {
    test("Name properly set", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getName()).toBe("Thief");
    });

    test("HP properly set", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getHP()).toBe(20);
    });

    test("DPMin properly set", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getDPMin()).toBe(10);
    });

    test("DPMax properly set", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getDPMax()).toBe(10);
    });

    test("AttackSpeed properly set", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getAttackSpeed()).toBe(5);
    });

    test("HitChance properly set", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getHitChance()).toBe(100);
    });

    test("Set fighting status works", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        expect(thief.getFightingStatus()).toBeFalsy();
        thief.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(thief.getFightingStatus()).toBeTruthy();
    });

    test("Block should be successful (block change = 100).", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thief.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(thief.block()).toBeTruthy();
    });

    test("Block should fail (block chance = 0)", () => {
        const thiefWithNoShield = new Thief("Thief", 20, 10, 10, 5, 100, 0);
        thiefWithNoShield.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(thiefWithNoShield.block()).toBeFalsy();
    });

    test("Tests the attack method (hit chance = 100, DPmin = 10, DPmax = 10", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thief.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        thief.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(10);
    });

    test("Tests the attack method (hit chance = 0, DPmin = 10, DPmax = 10", () => {
        const thief = new Thief("Thief", 20, 10, 10, 5, 0, 100);
        thief.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        thief.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(0);
    });

// TODO: tests special attack
});

describe("Tests Saves and Loads Thief class", () => {
    test("Saves and Loads Thief class properly (No chances made from initialization)", () => {
        const thiefToSave = new Thief("Thief", 20, 10, 10, 5, 0, 100);
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(thiefFromSave.toString()).toBe(thiefToSave.toString());
        expect(thiefFromSave.getFightingStatus()).toBe(thiefToSave.getFightingStatus());
    });

    test("Save and Load on invalid data", () => {
        expect(() => Thief.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});