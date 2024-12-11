/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "../characters/Hero.js";
import Priestess from "../characters/Priestess.js";
import Inventory from "../characters/Inventory.js";
import Room from "../dungeon/Room.js";
import Monster from "../characters/Monster.js";

/**
 * Test Priestess class which extends Hero. The primary
 * functions to check are attack, specialAttack, applyHPChange, setHP
 * and methods related to item collection/use.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Tests Priestess Character constructor. Name: Priestess, HP: 20, DPMin: 10, DPMax: 10, AttackSpeed: 5, HitChange: 100, BlockChance 100", () => {
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
});

describe("Test item related methods", () => {
    let priestess;
    beforeEach(() => {
        priestess = new Priestess("Jasmine", 20, 10, 10, 5, 100, 100);
    });
    test("Collect item: Healing Potion", () => {
        priestess.collectItem(Room.CONTENT.healingPotion);
        const inventory = JSON.parse(priestess.getInventory());
        expect(inventory.items.healing_potion).toBe(1);
    });

    test("Collect item: Vision Potion", () => {
        priestess.collectItem(Room.CONTENT.visionPotion);
        const inventory = JSON.parse(priestess.getInventory());
        expect(inventory.items.vision_potion).toBe(1);
    });

    test("Collect item: abstraction pillar", () => {
        priestess.collectItem(Room.CONTENT.abstractionPillar);
        const inventory = JSON.parse(priestess.getInventory());
        expect(inventory.items.pillars.abstraction).toBeTruthy();
    });

    test("Collect item: encapsulation pillar", () => {
        priestess.collectItem(Room.CONTENT.encapsulationPillar);
        const inventory = JSON.parse(priestess.getInventory());
        expect(inventory.items.pillars.encapsulation).toBeTruthy();
    });

    test("Collect item: inheritance pillar", () => {
        priestess.collectItem(Room.CONTENT.inheritancePillar);
        const inventory = JSON.parse(priestess.getInventory());
        expect(inventory.items.pillars.inheritance).toBeTruthy();
    });

    test("Collect item: polymorphism pillar", () => {
        priestess.collectItem(Room.CONTENT.polymorphismPillar);
        const inventory = JSON.parse(priestess.getInventory());
        expect(inventory.items.pillars.polymorphism).toBeTruthy();
    });

    test("Use item: Healing Potion, No healing potion available", () => {
        const result = priestess.useHealingPotion();
        expect(result).toBe("You have no healing potions");
    });

    test("Use item: Vision Potion, No vision potion available", () => {
        expect(priestess.useVisionPotion()).toBeFalsy();
    });

    test("Use item: Healing Potion, Healing potion available", () => {
        priestess.collectItem(Room.CONTENT.healingPotion);
        const priorHP = priestess.getHP();
        const result = priestess.useHealingPotion();
        const gainedHP = priestess.getHP() - priorHP;
        expect(result).toBe(`You used a healing potion and gained ${gainedHP} HP.`);
    });

    test("Use item: Vision Potion, Vision potion available", () => {
        priestess.collectItem(Room.CONTENT.visionPotion);
        expect(priestess.useVisionPotion()).toBeTruthy();
    });

    test("Has all required items", () => {
        priestess.collectItem(Room.CONTENT.abstractionPillar);
        expect(priestess.hasAllRequiredItems()).toBeFalsy();
        priestess.collectItem(Room.CONTENT.encapsulationPillar);
        expect(priestess.hasAllRequiredItems()).toBeFalsy();
        priestess.collectItem(Room.CONTENT.inheritancePillar);
        expect(priestess.hasAllRequiredItems()).toBeFalsy();
        priestess.collectItem(Room.CONTENT.polymorphismPillar);
        expect(priestess.hasAllRequiredItems()).toBeTruthy();
    });
});

describe("Test setter methods (set fighting status, setHP)", () => {
    let priestess;
    beforeEach(() => {
        priestess = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
    });
    test("set fighting status works", () => {
        expect(priestess.getFightingStatus()).toBeFalsy();
        priestess.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(priestess.getFightingStatus()).toBeTruthy();
    });

    test("set fighting status with a number (error)", () => {
        expect(() => priestess.setFightingStatus(-1)).toThrow(TypeError);
    });

    test("set fighting status with a string (error)", () => {
        expect(() => priestess.setFightingStatus("fighting")).toThrow(TypeError);
    });
});

describe("Test applyHPChange", () => {
    test("Error thrown if not fighting", () => {
        const priestessNotFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => priestessNotFighting.applyHPChange(-1)).toThrow(EvalError);
    });

    test("Error thrown if passed damage is a string", () => {
        const priestessNotFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessNotFighting.applyHPChange("one")).toThrow(TypeError);
    });

    test("Error thrown if passed damage is a boolean", () => {
        const priestessNotFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessNotFighting.applyHPChange(true)).toThrow(TypeError);
    });

    describe("HP Change applied to various block chance (0, 50, 100) [i.e. never, sometimes, always blocks]", () => {
        test("Negative 10 Block Chance 100", () => {
            const priestessHP20Block100 = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
            priestessHP20Block100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            priestessHP20Block100.applyHPChange(-10);
            expect(priestessHP20Block100.getHP()).toBe(20);
        });
    
        test("Positive 10 Block Chance 100", () => {
            const priestessHP20Block100 = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
            priestessHP20Block100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            priestessHP20Block100.applyHPChange(10);
            expect(priestessHP20Block100.getHP()).toBe(20);
        });
    
        test("Negative 10 Block Chance 0", () => {
            const priestessHP20Block0 = new Priestess("Priestess", 20, 10, 10, 5, 100, 0);
            priestessHP20Block0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            priestessHP20Block0.applyHPChange(-10);
            expect(priestessHP20Block0.getHP()).toBe(10);
        });
    
        test("Positive 10 Block Chance 0", () => {
            const priestessHP20Block0 = new Priestess("Priestess", 20, 10, 10, 5, 100, 0);
            priestessHP20Block0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            priestessHP20Block0.applyHPChange(10);
            expect(priestessHP20Block0.getHP()).toBe(30);
        });
    
        test("Positive 1 Block Chance 50", () => {
            const priestessHP20Block50 = new Priestess("Priestess", 20, 10, 10, 5, 100, 50);
            priestessHP20Block50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                priestessHP20Block50.applyHPChange(1);
            }
            expect(priestessHP20Block50.getHP()).toBeGreaterThan(20);
            expect(priestessHP20Block50.getHP()).toBeLessThan(1020);
        });
    });
});

describe("Test attack method", () => {
    test("Error thrown if not fighting", () => {
        const priestessNotFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => priestessNotFighting.attack(new Monster("TestMonster", 10, 1, 2, 10, 100, 100, 1, 1))).toThrow(EvalError);
    });

    test("Error thrown if opponent passed is an integer", () => {
        const priestessFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessFighting.attack(-1)).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is an string", () => {
        const priestessFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessFighting.attack("Monster")).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is another hero", () => {
        const priestessFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const anotherHero = new Priestess("AnotherPriestess", 20, 10, 10, 5, 100, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessFighting.attack(anotherHero)).toThrow(TypeError);
    });

    describe("Test attack method on various hit chances (0, 50, 100) and DP ranges (equal or not equal)", () => {
        let opponentHP2000Heal0;
        beforeEach(() => {
            opponentHP2000Heal0 = new Monster("2000HP", 2000, 1, 1, 100, 100, 0, 1, 1);
        });
        test("DPMin=DPMax: 1, HitChance = 100", () => {
            const priestessDP1Hit100 = new Priestess("Priestess", 20, 1, 1, 5, 100, 100);
            priestessDP1Hit100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            priestessDP1Hit100.attack(opponentHP2000Heal0);
            expect(opponentHP2000Heal0.getHP()).toBe(1999);
        });

        test("DPMin=DPMax: 1, HitChance = 50", () => {
            const priestessDP1Hit50 = new Priestess("Priestess", 20, 1, 1, 5, 50, 100);
            priestessDP1Hit50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                priestessDP1Hit50.attack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(1000);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });

        test("DPMin=DPMax: 1, HitChance = 0", () => {
            const priestessDP1Hit0 = new Priestess("Priestess", 20, 1, 1, 5, 0, 100);
            priestessDP1Hit0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            priestessDP1Hit0.attack(opponentHP2000Heal0);
            expect(opponentHP2000Heal0.getHP()).toBe(2000);
        });

        test("DPMin: 1 DPMax: 2, HitChance = 100", () => {
            const priestessDP1Hit50 = new Priestess("Priestess", 20, 1, 2, 5, 50, 100);
            priestessDP1Hit50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                priestessDP1Hit50.attack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(0);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });
    });
});

describe("Test special attack method", () => {
    test("Error thrown if not fighting", () => {
        const priestessNotFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => priestessNotFighting.specialAttack(new Monster("TestMonster", 10, 1, 2, 10, 100, 100, 1, 1))).toThrow(EvalError);
    });

    test("Error thrown if opponent passed is an integer", () => {
        const priestessFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessFighting.specialAttack(-1)).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is an string", () => {
        const priestessFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessFighting.specialAttack("Monster")).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is another hero", () => {
        const priestessFighting = new Priestess("Priestess", 20, 10, 10, 5, 100, 100);
        priestessFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const anotherHero = new Priestess("AnotherPriestess", 20, 10, 10, 5, 100, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        expect(() => priestessFighting.specialAttack(anotherHero)).toThrow(TypeError);
    });

    describe("Special attack should heal the priestess by 10 to 20% their current HP. Test on various HP.", () => {
        
    });
});

describe("Tests Priestess constructor instanciated with invalid arguments.", () => {
    test("Creating a priestess with no name", () => {
        expect(() => new Priestess(null, 70, 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with invalid name (not string)", () => {
        expect(() => new Priestess(1, 70, 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with non-numeric HP", () => {
        expect(() => new Priestess("Jasmine", "1", 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with negative HP", () => {
        expect(() => new Priestess("Jasmine", -1, 15, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with zero HP", () => {
        expect(() => new Priestess("Jasmine", 0, 15, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with non-numeric DPMin", () => {
        expect(() => new Priestess("Jasmine", 70, "1", 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with negative DPMin", () => {
        expect(() => new Priestess("Jasmine", 70, -1, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with non-numeric DPMax", () => {
        expect(() => new Priestess("Jasmine", 70, 15, "1", 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with negative DPMax", () => {
        expect(() => new Priestess("Jasmine", 70, 15, -1, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with 0 DPMax", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 0, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with non-numeric AttackSpeed", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, "1", 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with zero AttackSpeed", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, 0, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with negative AttackSpeed", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, -1, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with non-numeric HitChance", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 1, "1", 80, 100)).toThrow(TypeError);
    });

    test("Creating a priestess with negative HitChance", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 1, -1, 80, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with a HitChance greater than 100", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, 5, 101, 100)).toThrow(RangeError);
    });

    test("Creating a priestess with a non-numeric BlockChance", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, 5, 80, "1")).toThrow(TypeError);
    });

    test("Creating a priestess with a BlockChance greater than 100", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, 5, 80, 101)).toThrow(RangeError);
    });

    test("Creating a priestess with a negative BlockChance", () => {
        expect(() => new Priestess("Jasmine", 70, 15, 30, 5, 80, -1)).toThrow(RangeError);
    });
});

describe("Tests Saves and Loads Priestess class", () => {
    let priestessToSave;
    beforeEach(() => {
        priestessToSave = new Priestess("Priestess", 20, 10, 10, 5, 0, 100);
    });
    test("No chances made from initialization", () => {
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(JSON.stringify(priestessFromSave)).toBe(JSON.stringify(priestessToSave));
    });

    test("Healing potion collected", () => {
        priestessToSave.collectItem(Room.CONTENT.healingPotion);
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(JSON.stringify(priestessFromSave)).toBe(JSON.stringify(priestessToSave));
    });

    test("Vision potion collected", () => {
        priestessToSave.collectItem(Room.CONTENT.visionPotion);
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(JSON.stringify(priestessFromSave)).toBe(JSON.stringify(priestessToSave));
    });

    test("All pillars collected", () => {
        priestessToSave.collectItem(Room.CONTENT.abstractionPillar);
        priestessToSave.collectItem(Room.CONTENT.encapsulationPillar);
        priestessToSave.collectItem(Room.CONTENT.inheritancePillar);
        priestessToSave.collectItem(Room.CONTENT.polymorphismPillar);
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(JSON.stringify(priestessFromSave)).toBe(JSON.stringify(priestessToSave));
        expect(priestessFromSave.hasAllRequiredItems()).toBeTruthy();
    });

    test("HP Changed", () => {
        priestessToSave.setHP(30);
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(JSON.stringify(priestessFromSave)).toBe(JSON.stringify(priestessToSave));
        expect(priestessFromSave.getHP()).toBe(30);
    });

    test("Fighting", () => {
        priestessToSave.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const priestessFromSave = Priestess.fromJSON(JSON.parse(JSON.stringify(priestessToSave)));
        expect(JSON.stringify(priestessFromSave)).toBe(JSON.stringify(priestessToSave));
        expect(priestessFromSave.getFightingStatus()).toBeTruthy();
    });

    test("Save and Load on invalid data", () => {
        expect(() => Priestess.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});