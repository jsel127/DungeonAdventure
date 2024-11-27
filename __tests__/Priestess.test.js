import Priestess from "../characters/Priestess.js";
import MonsterFactory from "../characters/MonsterFactory.js";
describe("Tests Priestess Character instanciated to Name: Priestess, HP: 20, DPMin: 10, DPMax: 10, AttackSpeed: 5, HitChange: 100, BlockChance 100", () => {
    test("Name properly set", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getName()).toBe("Priestess");
    });

    test("HP properly set", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getHP()).toBe(20);
    });

    test("DPMin properly set", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getDPMin()).toBe(10);
    });

    test("DPMax properly set", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getDPMax()).toBe(10);
    });

    test("AttackSpeed properly set", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getAttackSpeed()).toBe(5);
    });

    test("HitChance properly set", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getHitChance()).toBe(100);
    });

    test("Block should be successful (block change = 100).", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.block()).toBeTruthy();
    });

    test("Block should fail (block chance = 0)", () => {
        const warriorWithNoShield = new Priestess("Priestess", 20, 10, 10, 5, 100, 0);
        expect(warriorWithNoShield.block()).toBeFalsy();
    });

    test("Tests the attack method (hit chance = 100, DPmin = 10, DPmax = 10", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        priestess.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(10);
    });

    test("Tests the attack method (hit chance = 0, DPmin = 10, DPmax = 10", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 0, 100);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        priestess.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(0);
    });

// TODO: tests special attack
});