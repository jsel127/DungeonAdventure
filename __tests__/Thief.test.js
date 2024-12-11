/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "../characters/Hero.js";
import Thief from "../characters/Thief.js";
import Inventory from "../characters/Inventory.js";
import Room from "../dungeon/Room.js";
import Monster from "../characters/Monster.js";

/**
 * Test Thief class which extends Hero. The primary
 * functions to check are attack, specialAttack, applyHPChange, setHP
 * and methods related to item collection/use.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Tests Thief Character constructor. Name: Thief, HP: 20, DPMin: 10, DPMax: 10, AttackSpeed: 5, HitChange: 100, BlockChance 100", () => {
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
});

describe("Test item related methods", () => {
    let thief;
    beforeEach(() => {
        thief = new Thief("Jasmine", 20, 10, 10, 5, 100, 100);
    });
    test("Collect item: Healing Potion", () => {
        thief.collectItem(Room.CONTENT.healingPotion);
        const inventory = JSON.parse(thief.getInventory());
        expect(inventory.items.healing_potion).toBe(1);
    });

    test("Collect item: Vision Potion", () => {
        thief.collectItem(Room.CONTENT.visionPotion);
        const inventory = JSON.parse(thief.getInventory());
        expect(inventory.items.vision_potion).toBe(1);
    });

    test("Collect item: abstraction pillar", () => {
        thief.collectItem(Room.CONTENT.abstractionPillar);
        const inventory = JSON.parse(thief.getInventory());
        expect(inventory.items.pillars.abstraction).toBeTruthy();
    });

    test("Collect item: encapsulation pillar", () => {
        thief.collectItem(Room.CONTENT.encapsulationPillar);
        const inventory = JSON.parse(thief.getInventory());
        expect(inventory.items.pillars.encapsulation).toBeTruthy();
    });

    test("Collect item: inheritance pillar", () => {
        thief.collectItem(Room.CONTENT.inheritancePillar);
        const inventory = JSON.parse(thief.getInventory());
        expect(inventory.items.pillars.inheritance).toBeTruthy();
    });

    test("Collect item: polymorphism pillar", () => {
        thief.collectItem(Room.CONTENT.polymorphismPillar);
        const inventory = JSON.parse(thief.getInventory());
        expect(inventory.items.pillars.polymorphism).toBeTruthy();
    });

    test("Use item: Healing Potion, No healing potion available", () => {
        const result = thief.useHealingPotion();
        expect(result).toBe("You have no healing potions");
    });

    test("Use item: Vision Potion, No vision potion available", () => {
        expect(thief.useVisionPotion()).toBeFalsy();
    });

    test("Use item: Healing Potion, Healing potion available", () => {
        thief.collectItem(Room.CONTENT.healingPotion);
        const priorHP = thief.getHP();
        const result = thief.useHealingPotion();
        const gainedHP = thief.getHP() - priorHP;
        expect(result).toBe(`You used a healing potion and gained ${gainedHP} HP.`);
    });

    test("Use item: Vision Potion, Vision potion available", () => {
        thief.collectItem(Room.CONTENT.visionPotion);
        expect(thief.useVisionPotion()).toBeTruthy();
    });

    test("Has all required items", () => {
        thief.collectItem(Room.CONTENT.abstractionPillar);
        expect(thief.hasAllRequiredItems()).toBeFalsy();
        thief.collectItem(Room.CONTENT.encapsulationPillar);
        expect(thief.hasAllRequiredItems()).toBeFalsy();
        thief.collectItem(Room.CONTENT.inheritancePillar);
        expect(thief.hasAllRequiredItems()).toBeFalsy();
        thief.collectItem(Room.CONTENT.polymorphismPillar);
        expect(thief.hasAllRequiredItems()).toBeTruthy();
    });
});

describe("Test setter methods (set fighting status, setHP)", () => {
    let thief;
    beforeEach(() => {
        thief = new Thief("Thief", 20, 10, 10, 5, 100, 100);
    });
    test("set fighting status works", () => {
        expect(thief.getFightingStatus()).toBeFalsy();
        thief.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(thief.getFightingStatus()).toBeTruthy();
    });

    test("set fighting status with a number (error)", () => {
        expect(() => thief.setFightingStatus(-1)).toThrow(TypeError);
    });

    test("set fighting status with a string (error)", () => {
        expect(() => thief.setFightingStatus("fighting")).toThrow(TypeError);
    });
});

describe("Test applyHPChange", () => {
    test("Error thrown if not fighting", () => {
        const thiefNotFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => thiefNotFighting.applyHPChange(-1)).toThrow(EvalError);
    });

    test("Error thrown if passed damage is a string", () => {
        const thiefNotFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefNotFighting.applyHPChange("one")).toThrow(TypeError);
    });

    test("Error thrown if passed damage is a boolean", () => {
        const thiefNotFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefNotFighting.applyHPChange(true)).toThrow(TypeError);
    });

    describe("HP Change applied to various block chance (0, 50, 100) [i.e. never, sometimes, always blocks]", () => {
        test("Negative 10 Block Chance 100", () => {
            const thiefHP20Block100 = new Thief("Thief", 20, 10, 10, 5, 100, 100);
            thiefHP20Block100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            thiefHP20Block100.applyHPChange(-10);
            expect(thiefHP20Block100.getHP()).toBe(20);
        });
    
        test("Positive 10 Block Chance 100", () => {
            const thiefHP20Block100 = new Thief("Thief", 20, 10, 10, 5, 100, 100);
            thiefHP20Block100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            thiefHP20Block100.applyHPChange(10);
            expect(thiefHP20Block100.getHP()).toBe(20);
        });
    
        test("Negative 10 Block Chance 0", () => {
            const thiefHP20Block0 = new Thief("Thief", 20, 10, 10, 5, 100, 0);
            thiefHP20Block0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            thiefHP20Block0.applyHPChange(-10);
            expect(thiefHP20Block0.getHP()).toBe(10);
        });
    
        test("Positive 10 Block Chance 0", () => {
            const thiefHP20Block0 = new Thief("Thief", 20, 10, 10, 5, 100, 0);
            thiefHP20Block0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            thiefHP20Block0.applyHPChange(10);
            expect(thiefHP20Block0.getHP()).toBe(30);
        });
    
        test("Positive 1 Block Chance 50", () => {
            const thiefHP20Block50 = new Thief("Thief", 20, 10, 10, 5, 100, 50);
            thiefHP20Block50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                thiefHP20Block50.applyHPChange(1);
            }
            expect(thiefHP20Block50.getHP()).toBeGreaterThan(20);
            expect(thiefHP20Block50.getHP()).toBeLessThan(1020);
        });
    });
});

describe("Test attack method", () => {
    test("Error thrown if not fighting", () => {
        const thiefNotFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => thiefNotFighting.attack(new Monster("TestMonster", 10, 1, 2, 10, 100, 100, 1, 1))).toThrow(EvalError);
    });

    test("Error thrown if opponent passed is an integer", () => {
        const thiefFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefFighting.attack(-1)).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is an string", () => {
        const thiefFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefFighting.attack("Monster")).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is another hero", () => {
        const thiefFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const anotherHero = new Thief("AnotherThief", 20, 10, 10, 5, 100, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefFighting.attack(anotherHero)).toThrow(TypeError);
    });

    describe("Test attack method on various hit chances (0, 50, 100) and DP ranges (equal or not equal)", () => {
        let opponentHP2000Heal0;
        beforeEach(() => {
            opponentHP2000Heal0 = new Monster("2000HP", 2000, 1, 1, 100, 100, 0, 1, 1);
        });
        test("DPMin=DPMax: 1, HitChance = 100", () => {
            const thiefDP1Hit100 = new Thief("Thief", 20, 1, 1, 5, 100, 100);
            thiefDP1Hit100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            thiefDP1Hit100.attack(opponentHP2000Heal0);
            expect(opponentHP2000Heal0.getHP()).toBe(1999);
        });

        test("DPMin=DPMax: 1, HitChance = 50", () => {
            const thiefDP1Hit50 = new Thief("Thief", 20, 1, 1, 5, 50, 100);
            thiefDP1Hit50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                thiefDP1Hit50.attack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(1000);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });

        test("DPMin=DPMax: 1, HitChance = 0", () => {
            const thiefDP1Hit0 = new Thief("Thief", 20, 1, 1, 5, 0, 100);
            thiefDP1Hit0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            thiefDP1Hit0.attack(opponentHP2000Heal0);
            expect(opponentHP2000Heal0.getHP()).toBe(2000);
        });

        test("DPMin: 1 DPMax: 2, HitChance = 100", () => {
            const thiefDP1Hit50 = new Thief("Thief", 20, 1, 2, 5, 50, 100);
            thiefDP1Hit50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                thiefDP1Hit50.attack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(0);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });
    });
});

describe("Test special attack method", () => {
    test("Error thrown if not fighting", () => {
        const thiefNotFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => thiefNotFighting.specialAttack(new Monster("TestMonster", 10, 1, 2, 10, 100, 100, 1, 1))).toThrow(EvalError);
    });

    test("Error thrown if opponent passed is an integer", () => {
        const thiefFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefFighting.specialAttack(-1)).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is an string", () => {
        const thiefFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefFighting.specialAttack("Monster")).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is another hero", () => {
        const thiefFighting = new Thief("Thief", 20, 10, 10, 5, 100, 100);
        thiefFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const anotherHero = new Thief("AnotherThief", 20, 10, 10, 5, 100, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        expect(() => thiefFighting.specialAttack(anotherHero)).toThrow(TypeError);
    });

    describe("Special attack should attack twice, once, or zero times.", () => {
        let opponentHP2000Heal0;
        beforeEach(() => {
            opponentHP2000Heal0 = new Monster("2000HP", 2000, 1, 1, 100, 100, 0, 1, 1);
        });
        test("DPMin=DPMax: 1, HitChance = 100", () => {
            const thiefDP1Hit100 = new Thief("Thief", 20, 1, 1, 5, 100, 100);
            thiefDP1Hit100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let round = 0; round < 1000; round++) {
                thiefDP1Hit100.specialAttack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(0);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });
    });
});

describe("Tests Thief constructor instanciated with invalid arguments.", () => {
    test("Creating a thief with no name", () => {
        expect(() => new Thief(null, 70, 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with invalid name (not string)", () => {
        expect(() => new Thief(1, 70, 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with non-numeric HP", () => {
        expect(() => new Thief("Jasmine", "1", 15, 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with negative HP", () => {
        expect(() => new Thief("Jasmine", -1, 15, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with zero HP", () => {
        expect(() => new Thief("Jasmine", 0, 15, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with non-numeric DPMin", () => {
        expect(() => new Thief("Jasmine", 70, "1", 30, 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with negative DPMin", () => {
        expect(() => new Thief("Jasmine", 70, -1, 30, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with non-numeric DPMax", () => {
        expect(() => new Thief("Jasmine", 70, 15, "1", 5, 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with negative DPMax", () => {
        expect(() => new Thief("Jasmine", 70, 15, -1, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with 0 DPMax", () => {
        expect(() => new Thief("Jasmine", 70, 15, 0, 5, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with non-numeric AttackSpeed", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, "1", 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with zero AttackSpeed", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, 0, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with negative AttackSpeed", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, -1, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with non-numeric HitChance", () => {
        expect(() => new Thief("Jasmine", 70, 15, 1, "1", 80, 100)).toThrow(TypeError);
    });

    test("Creating a thief with negative HitChance", () => {
        expect(() => new Thief("Jasmine", 70, 15, 1, -1, 80, 100)).toThrow(RangeError);
    });

    test("Creating a thief with a HitChance greater than 100", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, 5, 101, 100)).toThrow(RangeError);
    });

    test("Creating a thief with a non-numeric BlockChance", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, 5, 80, "1")).toThrow(TypeError);
    });

    test("Creating a thief with a BlockChance greater than 100", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, 5, 80, 101)).toThrow(RangeError);
    });

    test("Creating a thief with a negative BlockChance", () => {
        expect(() => new Thief("Jasmine", 70, 15, 30, 5, 80, -1)).toThrow(RangeError);
    });
});

describe("Tests Saves and Loads Thief class", () => {
    let thiefToSave;
    beforeEach(() => {
        thiefToSave = new Thief("Thief", 20, 10, 10, 5, 0, 100);
    });
    test("No chances made from initialization", () => {
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(JSON.stringify(thiefFromSave)).toBe(JSON.stringify(thiefToSave));
    });

    test("Healing potion collected", () => {
        thiefToSave.collectItem(Room.CONTENT.healingPotion);
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(JSON.stringify(thiefFromSave)).toBe(JSON.stringify(thiefToSave));
    });

    test("Vision potion collected", () => {
        thiefToSave.collectItem(Room.CONTENT.visionPotion);
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(JSON.stringify(thiefFromSave)).toBe(JSON.stringify(thiefToSave));
    });

    test("All pillars collected", () => {
        thiefToSave.collectItem(Room.CONTENT.abstractionPillar);
        thiefToSave.collectItem(Room.CONTENT.encapsulationPillar);
        thiefToSave.collectItem(Room.CONTENT.inheritancePillar);
        thiefToSave.collectItem(Room.CONTENT.polymorphismPillar);
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(JSON.stringify(thiefFromSave)).toBe(JSON.stringify(thiefToSave));
        expect(thiefFromSave.hasAllRequiredItems()).toBeTruthy();
    });

    test("HP Changed", () => {
        thiefToSave.setHP(30);
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(JSON.stringify(thiefFromSave)).toBe(JSON.stringify(thiefToSave));
        expect(thiefFromSave.getHP()).toBe(30);
    });

    test("Fighting", () => {
        thiefToSave.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const thiefFromSave = Thief.fromJSON(JSON.parse(JSON.stringify(thiefToSave)));
        expect(JSON.stringify(thiefFromSave)).toBe(JSON.stringify(thiefToSave));
        expect(thiefFromSave.getFightingStatus()).toBeTruthy();
    });

    test("Save and Load on invalid data", () => {
        expect(() => Thief.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});