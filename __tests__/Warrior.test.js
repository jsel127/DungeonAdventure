/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Hero from "../characters/Hero.js";
import Warrior from "../characters/Warrior.js";
import Inventory from "../characters/Inventory.js";
import Room from "../dungeon/Room.js";
import Monster from "../characters/Monster.js";

/**
 * Test Warrior class which extends Hero. The primary
 * functions to check are attack, specialAttack, applyHPChange, setHP
 * and methods related to item collection/use.
 * @author Jasmine Sellers
 * @version 1.0
 */
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

describe("Test item related methods", () => {
    let warrior;
    beforeEach(() => {
        warrior = new Warrior("Jasmine", 20, 10, 10, 5, 100, 100);
    });
    test("Collect item: Healing Potion", () => {
        warrior.collectItem(Room.CONTENT.healingPotion);
        const inventory = JSON.parse(warrior.getInventory());
        expect(inventory.items.healing_potion).toBe(1);
    });

    test("Collect item: Vision Potion", () => {
        warrior.collectItem(Room.CONTENT.visionPotion);
        const inventory = JSON.parse(warrior.getInventory());
        expect(inventory.items.vision_potion).toBe(1);
    });

    test("Collect item: abstraction pillar", () => {
        warrior.collectItem(Room.CONTENT.abstractionPillar);
        const inventory = JSON.parse(warrior.getInventory());
        expect(inventory.items.pillars.abstraction).toBeTruthy();
    });

    test("Collect item: encapsulation pillar", () => {
        warrior.collectItem(Room.CONTENT.encapsulationPillar);
        const inventory = JSON.parse(warrior.getInventory());
        expect(inventory.items.pillars.encapsulation).toBeTruthy();
    });

    test("Collect item: inheritance pillar", () => {
        warrior.collectItem(Room.CONTENT.inheritancePillar);
        const inventory = JSON.parse(warrior.getInventory());
        expect(inventory.items.pillars.inheritance).toBeTruthy();
    });

    test("Collect item: polymorphism pillar", () => {
        warrior.collectItem(Room.CONTENT.polymorphismPillar);
        const inventory = JSON.parse(warrior.getInventory());
        expect(inventory.items.pillars.polymorphism).toBeTruthy();
    });

    test("Use item: Healing Potion, No healing potion available", () => {
        const result = warrior.useHealingPotion();
        expect(result).toBe("You have no healing potions");
    });

    test("Use item: Vision Potion, No vision potion available", () => {
        expect(warrior.useVisionPotion()).toBeFalsy();
    });

    test("Use item: Healing Potion, Healing potion available", () => {
        warrior.collectItem(Room.CONTENT.healingPotion);
        const priorHP = warrior.getHP();
        const result = warrior.useHealingPotion();
        const gainedHP = warrior.getHP() - priorHP;
        expect(result).toBe(`You used a healing potion and gained ${gainedHP} HP.`);
    });

    test("Use item: Vision Potion, Vision potion available", () => {
        warrior.collectItem(Room.CONTENT.visionPotion);
        expect(warrior.useVisionPotion()).toBeTruthy();
    });

    test("Has all required items", () => {
        warrior.collectItem(Room.CONTENT.abstractionPillar);
        expect(warrior.hasAllRequiredItems()).toBeFalsy();
        warrior.collectItem(Room.CONTENT.encapsulationPillar);
        expect(warrior.hasAllRequiredItems()).toBeFalsy();
        warrior.collectItem(Room.CONTENT.inheritancePillar);
        expect(warrior.hasAllRequiredItems()).toBeFalsy();
        warrior.collectItem(Room.CONTENT.polymorphismPillar);
        expect(warrior.hasAllRequiredItems()).toBeTruthy();
    });
});

describe("Test setter methods (set fighting status, setHP)", () => {
    let warrior;
    beforeEach(() => {
        warrior = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
    });
    test("set fighting status works", () => {
        expect(warrior.getFightingStatus()).toBeFalsy();
        warrior.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(warrior.getFightingStatus()).toBeTruthy();
    });

    test("set fighting status with a number (error)", () => {
        expect(() => warrior.setFightingStatus(-1)).toThrow(TypeError);
    });

    test("set fighting status with a string (error)", () => {
        expect(() => warrior.setFightingStatus("fighting")).toThrow(TypeError);
    });
});

describe("Test applyHPChange", () => {
    test("Error thrown if not fighting", () => {
        const warriorNotFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => warriorNotFighting.applyHPChange(-1)).toThrow(EvalError);
    });

    test("Error thrown if passed damage is a string", () => {
        const warriorNotFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorNotFighting.applyHPChange("one")).toThrow(TypeError);
    });

    test("Error thrown if passed damage is a boolean", () => {
        const warriorNotFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorNotFighting.applyHPChange(true)).toThrow(TypeError);
    });

    describe("HP Change applied to various block chance (0, 50, 100) [i.e. never, sometimes, always blocks]", () => {
        test("Negative 10 Block Chance 100", () => {
            const warriorHP20Block100 = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
            warriorHP20Block100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            warriorHP20Block100.applyHPChange(-10);
            expect(warriorHP20Block100.getHP()).toBe(20);
        });
    
        test("Positive 10 Block Chance 100", () => {
            const warriorHP20Block100 = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
            warriorHP20Block100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            warriorHP20Block100.applyHPChange(10);
            expect(warriorHP20Block100.getHP()).toBe(20);
        });
    
        test("Negative 10 Block Chance 0", () => {
            const warriorHP20Block0 = new Warrior("Warrior", 20, 10, 10, 5, 100, 0);
            warriorHP20Block0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            warriorHP20Block0.applyHPChange(-10);
            expect(warriorHP20Block0.getHP()).toBe(10);
        });
    
        test("Positive 10 Block Chance 0", () => {
            const warriorHP20Block0 = new Warrior("Warrior", 20, 10, 10, 5, 100, 0);
            warriorHP20Block0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            warriorHP20Block0.applyHPChange(10);
            expect(warriorHP20Block0.getHP()).toBe(30);
        });
    
        test("Positive 1 Block Chance 50", () => {
            const warriorHP20Block50 = new Warrior("Warrior", 20, 10, 10, 5, 100, 50);
            warriorHP20Block50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                warriorHP20Block50.applyHPChange(1);
            }
            expect(warriorHP20Block50.getHP()).toBeGreaterThan(20);
            expect(warriorHP20Block50.getHP()).toBeLessThan(1020);
        });
    });
});

describe("Test attack method", () => {
    test("Error thrown if not fighting", () => {
        const warriorNotFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => warriorNotFighting.attack(new Monster("TestMonster", 10, 1, 2, 10, 100, 100, 1, 1))).toThrow(EvalError);
    });

    test("Error thrown if opponent passed is an integer", () => {
        const warriorFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorFighting.attack(-1)).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is an string", () => {
        const warriorFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorFighting.attack("Monster")).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is another hero", () => {
        const warriorFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const anotherHero = new Warrior("AnotherWarrior", 20, 10, 10, 5, 100, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorFighting.attack(anotherHero)).toThrow(TypeError);
    });

    describe("Test attack method on various hit chances (0, 50, 100) and DP ranges (equal or not equal)", () => {
        let opponentHP2000Heal0;
        beforeEach(() => {
            opponentHP2000Heal0 = new Monster("2000HP", 2000, 1, 1, 100, 100, 0, 1, 1);
        });
        test("DPMin=DPMax: 1, HitChance = 100", () => {
            const warriorDP1Hit100 = new Warrior("Warrior", 20, 1, 1, 5, 100, 100);
            warriorDP1Hit100.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            warriorDP1Hit100.attack(opponentHP2000Heal0);
            expect(opponentHP2000Heal0.getHP()).toBe(1999);
        });

        test("DPMin=DPMax: 1, HitChance = 50", () => {
            const warriorDP1Hit50 = new Warrior("Warrior", 20, 1, 1, 5, 50, 100);
            warriorDP1Hit50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                warriorDP1Hit50.attack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(1000);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });

        test("DPMin=DPMax: 1, HitChance = 0", () => {
            const warriorDP1Hit0 = new Warrior("Warrior", 20, 1, 1, 5, 0, 100);
            warriorDP1Hit0.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            warriorDP1Hit0.attack(opponentHP2000Heal0);
            expect(opponentHP2000Heal0.getHP()).toBe(2000);
        });

        test("DPMin: 1 DPMax: 2, HitChance = 100", () => {
            const warriorDP1Hit50 = new Warrior("Warrior", 20, 1, 2, 5, 50, 100);
            warriorDP1Hit50.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let rounds = 0; rounds < 1000; rounds++) {
                warriorDP1Hit50.attack(opponentHP2000Heal0);
            }
            expect(opponentHP2000Heal0.getHP()).toBeGreaterThan(0);
            expect(opponentHP2000Heal0.getHP()).toBeLessThan(2000);
        });
    });
});

describe("Test special attack method", () => {
    test("Error thrown if not fighting", () => {
        const warriorNotFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorNotFighting.setFightingStatus(Hero.FIGHTING_STATUS.notFighting);
        expect(() => warriorNotFighting.specialAttack(new Monster("TestMonster", 10, 1, 2, 10, 100, 100, 1, 1))).toThrow(EvalError);
    });

    test("Error thrown if opponent passed is an integer", () => {
        const warriorFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorFighting.specialAttack(-1)).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is an string", () => {
        const warriorFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorFighting.specialAttack("Monster")).toThrow(TypeError);
    });

    test("Error thrown if opponent passed is another hero", () => {
        const warriorFighting = new Warrior("Warrior", 20, 10, 10, 5, 100, 100);
        warriorFighting.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const anotherHero = new Warrior("AnotherWarrior", 20, 10, 10, 5, 100, 100, new Inventory(), Hero.FIGHTING_STATUS.fighting);
        expect(() => warriorFighting.specialAttack(anotherHero)).toThrow(TypeError);
    });

    describe("Special attack should double damage points (hit rate 40). Test on various DP ranges (equal not equal).", () => {
        let opponentH4000Heal0;
        beforeEach(() => {
            opponentH4000Heal0 = new Monster("4000HP", 4000, 1, 1, 100, 100, 0, 1, 1);
        });

        test("DPMin=DPMax: 1", () => {
            let landed = 0;
            const warriorDP1 = new Warrior("Warrior", 20, 1, 1, 5, 0, 100);
            warriorDP1.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let round = 0; round < 1000; round++) {
                if (warriorDP1.specialAttack(opponentH4000Heal0)) {
                    landed++;
                };
            }
            expect((4000 - opponentH4000Heal0.getHP())/landed).toBe(2);
        });

        test("DPMin=DPMax: 2", () => {
            let landed = 0;
            const warriorDP1 = new Warrior("Warrior", 20, 2, 2, 5, 0, 100);
            warriorDP1.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let round = 0; round < 1000; round++) {
                if (warriorDP1.specialAttack(opponentH4000Heal0)) {
                    landed++;
                };
            }
            expect((4000 - opponentH4000Heal0.getHP())/landed).toBe(4);
        });

        test("DPMin: 1 DPMax: 2", () => {
            let landed = 0;
            const warriorDP1 = new Warrior("Warrior", 20, 1, 2, 5, 0, 100);
            warriorDP1.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
            for (let round = 0; round < 1000; round++) {
                if (warriorDP1.specialAttack(opponentH4000Heal0)) {
                    landed++;
                };
            }
            const average = (4000 - opponentH4000Heal0.getHP())/landed;
            expect(average).toBeGreaterThan(2);
            expect(average).toBeLessThan(4);
        });
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
    let warriorToSave;
    beforeEach(() => {
        warriorToSave = new Warrior("Warrior", 20, 10, 10, 5, 0, 100);
    });
    test("No chances made from initialization", () => {
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("Healing potion collected", () => {
        warriorToSave.collectItem(Room.CONTENT.healingPotion);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("Vision potion collected", () => {
        warriorToSave.collectItem(Room.CONTENT.visionPotion);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
    });

    test("All pillars collected", () => {
        warriorToSave.collectItem(Room.CONTENT.abstractionPillar);
        warriorToSave.collectItem(Room.CONTENT.encapsulationPillar);
        warriorToSave.collectItem(Room.CONTENT.inheritancePillar);
        warriorToSave.collectItem(Room.CONTENT.polymorphismPillar);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
        expect(warriorFromSave.hasAllRequiredItems()).toBeTruthy();
    });

    test("HP Changed", () => {
        warriorToSave.setHP(30);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
        expect(warriorFromSave.getHP()).toBe(30);
    });

    test("Fighting", () => {
        warriorToSave.setFightingStatus(Hero.FIGHTING_STATUS.fighting);
        const warriorFromSave = Warrior.fromJSON(JSON.parse(JSON.stringify(warriorToSave)));
        expect(JSON.stringify(warriorFromSave)).toBe(JSON.stringify(warriorToSave));
        expect(warriorFromSave.getFightingStatus()).toBeTruthy();
    });

    test("Save and Load on invalid data", () => {
        expect(() => Warrior.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});