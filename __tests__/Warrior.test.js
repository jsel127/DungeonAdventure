/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "../characters/Hero.js";
import Warrior from "../characters/Warrior.js";
import MonsterFactory from "../characters/MonsterFactory.js";
import Inventory from "../characters/Inventory.js";
import Room from "../dungeon/Room.js";
describe("Tests Warrior Character constructor. Name: Warrior, HP: 20, DPMin: 10, DPMax: 10, AttackSpeed: 5, HitChange: 100, BlockChance 100", () => {
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
});

describe("Test setter methods (set fighting status, setHP)", () => {
    test("set fighting status works", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        expect(warrior.getFightingStatus()).toBeFalsy();
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(warrior.getFightingStatus()).toBeTruthy();
    });
});


describe("Test attack method", () => {
    test("hit chance = 100, DPmin = 10, DPmax = 10", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100, Hero.FIGHTING_STATUS.fighting);
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        warrior.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(10);
    });

    test("hit chance = 0, DPmin = 10, DPmax = 10", () => {
        const warrior = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, Hero.FIGHTING_STATUS.fighting);
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const monster = MonsterFactory.createMonster("Ogre");
        const monsterInitialHP = monster.getHP();
        warrior.attack(monster);
        expect(monsterInitialHP - monster.getHP()).toBe(0);
    });
});

describe("Tests Warrior constructor instanciated with invalid arguments.", () => {
    test("Creating a warrior with no name", () => {
        expect(() => new Warrior(null, 70, 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with invalid name (not string)", () => {
        expect(() => new Warrior(1, 70, 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with non-numeric HP", () => {
        expect(() => new Warrior("Jasmine", "1", 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with negative HP", () => {
        expect(() => new Warrior("Jasmine", -1, 15, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with zero HP", () => {
        expect(() => new Warrior("Jasmine", 0, 15, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with non-numeric DPMin", () => {
        expect(() => new Warrior("Jasmine", 70, "1", 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with negative DPMin", () => {
        expect(() => new Warrior("Jasmine", 70, -1, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with non-numeric DPMax", () => {
        expect(() => new Warrior("Jasmine", 70, 15, "1", 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with negative DPMax", () => {
        expect(() => new Warrior("Jasmine", 70, 15, -1, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with 0 DPMax", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 0, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with non-numeric AttackSpeed", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, "1", 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with zero AttackSpeed", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, 0, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with negative AttackSpeed", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, -1, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with non-numeric HitChance", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 1, "1", 80, 100)).toThrow(TypeError);
    });

    test("Creating a warrior with negative HitChance", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 1, -1, 80, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with a HitChance greater than 100", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, 5, 101, 100)).toThrow(RangeError);
    });

    test("Creating a warrior with a non-numeric BlockChance", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, 5, 80, "1")).toThrow(TypeError);
    });

    test("Creating a warrior with a BlockChance greater than 100", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, 5, 80, 101)).toThrow(RangeError);
    });

    test("Creating a warrior with a negative BlockChance", () => {
        expect(() => new Warrior("Jasmine", 70, 15, 30, 5, 80, -1)).toThrow(RangeError);
    });
});

describe("Tests Saves and Loads Warrior class", () => {
    test("No chances made from initialization", () => {
        const warriorToSave = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("Healing potion collected", () => {
        const warriorToSave = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        warriorToSave.collectItem(Room.CONTENT.healingPotion);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("Vision potion collected", () => {
        const warriorToSave = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        warriorToSave.collectItem(Room.CONTENT.visionPotion);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("All pillars collected", () => {
        const warriorToSave = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        warriorToSave.collectItem(Room.CONTENT.abstractionPillar);
        warriorToSave.collectItem(Room.CONTENT.encapsulationPillar);
        warriorToSave.collectItem(Room.CONTENT.inheritancePillar);
        warriorToSave.collectItem(Room.CONTENT.polymorphismPillar);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("HP Changed", () => {
        const warriorToSave = new Warrior("Warrior", 20, 10, 10, 5, 0, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        warriorToSave.setHP(30);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
        expect(warriorFromSave.getHP()).toBe(30);
    });

    test("Save and Load on invalid data", () => {
        expect(() => Warrior.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});