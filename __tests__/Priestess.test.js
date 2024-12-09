/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from "../characters/Hero.js";
import Priestess from "../characters/Priestess.js";
import MonsterFactory from "../characters/MonsterFactory.js";
import Monster from "../characters/Monster.js";
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
    
    test("Set fighting status works", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        expect(priestess.getFightingStatus()).toBeFalsy();
        priestess.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(priestess.getFightingStatus()).toBeTruthy();
    });

    test("Will not allow attack if fighting status is not fighting", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestess.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestess.attack(MonsterFactory.createMonster("Gremlin"))).toThrow(EvalError);
    });

    test("Will not allow special attack if fighting status is not fighting", () => {
        const priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestess.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestess.specialAttack(MonsterFactory.createMonster("Gremlin"))).toThrow(EvalError);
    });
});

describe("Tests applyHPChange, attack, and specialAttack methods", () => {
    test("Apply HP Change, Block Chance 100", () => {
        const priestessBlockChance100 = new Priestess("Priestess", 10, 1, 1, 10, 100, 100);
        priestessBlockChance100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const gremlinHitChance100 = new Monster("Gremlin", 10, 10000, 10000, 100, 100, 0, 0, 0);
        gremlinHitChance100.attack(priestessBlockChance100);
        expect(priestessBlockChance100.getHP()).toBe(10);
    });
    test("Apply HP Change, Block Chance 0", () => {
        const priestessBlockChance0 = new Priestess("Priestess", 10, 1, 1, 10, 100, 0);
        priestessBlockChance0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const gremlinHitChance100 = new Monster("Gremlin", 10, 10000, 10000, 100, 100, 0, 0, 0);
        gremlinHitChance100.attack(priestessBlockChance0);
        expect(priestessBlockChance0.getHP()).toBe(0);
    });
});

describe("Tests Saves and Loads Priestess class", () => {
    test("Saves and Loads Priestess class properly (No chances made from initialization)", () => {
        const priestessToSave = new Priestess("Priestess", 20, 10, 10, 5, 0, 100);
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(priestessFromSave.toString()).toBe(priestessToSave.toString());
        expect(priestessFromSave.getFightingStatus()).toBe(priestessToSave.getFightingStatus());
    });

    test("Save and Load on invalid data", () => {
        expect(() => Priestess.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});