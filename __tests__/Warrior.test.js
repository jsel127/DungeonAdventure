import Hero from "../characters/Hero.js";
import Warrior from "../characters/Warrior.js";
import MonsterFactory from "../characters/MonsterFactory.js";
describe("Tests Warrior Character instanciated to Name: Warrior, HP: 20, DPMin: 10, DPMax: 10, AttackSpeed: 5, HitChange: 100, BlockChance 100", () => {
    test("Name properly set", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getName()).toBe("Warrior");
    });

    test("HP properly set", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getHP()).toBe(20);
    });

    test("DPMin properly set", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getDPMin()).toBe(10);
    });

    test("DPMax properly set", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getDPMax()).toBe(10);
    });

    test("AttackSpeed properly set", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getAttackSpeed()).toBe(5);
    });

    test("HitChance properly set", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getHitChance()).toBe(100);
    });

    test("set fighting status works", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getFightingStatus()).toBeFalsy();
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(warrior.getFightingStatus()).toBeTruthy();
    });

    test("Block should be successful (block change = 100).", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100, Hero.FIGHTING_STATUS.fighting);
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(warrior.block()).toBeTruthy();
    });

    test("Block should fail (block chance = 0)", () => {
        const warriorWithNoShield = new Warrior("Warrior", 20, 10, 10, 5, 100, 0, Hero.FIGHTING_STATUS.fighting);
        warriorWithNoShield.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(warriorWithNoShield.block()).toBeFalsy();
    });

    test("Tests the attack method (hit chance = 100, DPmin = 10, DPmax = 10", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100, Hero.FIGHTING_STATUS.fighting);
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        warrior.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(10);
    });

    test("Tests the attack method (hit chance = 0, DPmin = 10, DPmax = 10", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, Hero.FIGHTING_STATUS.fighting);
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        warrior.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(0);
    });

// TODO: tests special attack
});