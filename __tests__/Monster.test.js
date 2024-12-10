/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Monster from "../characters/Monster.js";
import Warrior from "../characters/Warrior.js";
/**
 * Test Monster class extends DungeonCharacter. The primary
 * functions to check are attack, applyHPChange, and setHP.
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Tests Monster Character instanciated to Name: Gremlin, HP: 70, DPMin: 15, DPMax: 30, " +
         "AttackSpeed: 5, HitChange: 80, HealChance: 40, MinHeal: 20, MaxHeal: 40", () => {
    const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
    test("Creating the character", () => {
        expect(gremlin.toString()).toBe("Gremlin 70 15 30 5 80 40 20 40");
    });

    test("getName", () => {
        expect(gremlin.getName()).toBe("Gremlin");
    });

    test("getHP", () => {
        expect(gremlin.getHP()).toBe(70);
    });

    test("getDPMin", () => {
        expect(gremlin.getDPMin()).toBe(15);
    });

    test("getDPMax", () => {
        expect(gremlin.getDPMax()).toBe(30);
    });

    test("getAttackSpeed", () => {
        expect(gremlin.getAttackSpeed()).toBe(5);
    });

    test("getHitChance", () => {
        expect(gremlin.getHitChance()).toBe(80);
    });

    test("getHealChance", () => {
        expect(gremlin.getHealChance()).toBe(40);
    });

    test("getMinHeal", () => {
        expect(gremlin.getMinHeal()).toBe(20);
    });

    test("getMaxHeal", () => {
        expect(gremlin.getMaxHeal()).toBe(40);
    });

    test("setHP to smaller number (10)", () => {
        gremlin.setHP(10);
        expect(gremlin.getHP()).toBe(10);
    });

    test("setHP to larger number (500)", () => {
        gremlin.setHP(500);
        expect(gremlin.getHP()).toBe(500);
    });

    test("setHP to 0", () => {
        gremlin.setHP(0);
        expect(gremlin.getHP()).toBe(0);
    });

    test("isDead when the monster is NOT dead HP 100", () => {
        gremlin.setHP(100);
        expect(gremlin.isDead()).toBeFalsy();
    });

    test("isDead when the monster is NOT dead HP 1", () => {
        gremlin.setHP(1);
        expect(gremlin.isDead()).toBeFalsy();
    });

    test("isDead when the monster is dead HP 0", () => {
        gremlin.setHP(0);
        expect(gremlin.isDead()).toBeTruthy();
    });
});

describe("Test applyHPChange [heal] ", () => {
    let warriorDP2HitChance100;
    beforeEach(() => {
        warriorDP2HitChance100 = new Warrior("Warrior", 20, 2, 2, 1, 100, 0);
        warriorDP2HitChance100.setFightingStatus(true);
    });

    test("Ogre HP: 10 HealChance: 100 MinHeal=MaxHeal:1", () => {
        const ogreHealChance100Heal1 = new Monster("Ogre", 10, 20, 20, 1, 0, 100, 1, 1);
        for (let rounds = 1; rounds <= 10; rounds++) {
            warriorDP2HitChance100.attack(ogreHealChance100Heal1);
            expect(ogreHealChance100Heal1.getHP()).toBe(10 - rounds);
        }
        expect(ogreHealChance100Heal1.isDead()).toBeTruthy();
    });

    test("Ogre HP: 5000 HealChance: 100 MinHeal:1 MaxHeal:2", () => {
        const ogreHealChance100Heal1To2 = new Monster("Ogre", 5000, 20, 20, 1, 0, 100, 1, 2);
        for (let rounds = 0; rounds <= 1000; rounds++) {
            warriorDP2HitChance100.attack(ogreHealChance100Heal1To2);
        }
        expect(ogreHealChance100Heal1To2.getHP()).toBeGreaterThan(4000);
        expect(ogreHealChance100Heal1To2.getHP()).toBeLessThan(5000);
    });

    test("Ogre HP: 5000 HealChance: 50 MinHeal=MaxHeal: 1", () => {
        const ogreHealChance50Heal1 = new Monster("Ogre", 5000, 20, 20, 1, 0, 50, 1, 1);
        for (let rounds = 0; rounds <= 1000; rounds++) {
            warriorDP2HitChance100.attack(ogreHealChance50Heal1);
        }
        expect(ogreHealChance50Heal1.getHP()).toBeGreaterThan(3000);
        expect(ogreHealChance50Heal1.getHP()).toBeLessThan(4000);
    });

    test("Ogre HP: 100 HealChance: 0", () => {
        const ogreHealChance0Heal1 = new Monster("Ogre", 20, 20, 20, 1, 0, 0, 1, 1);
        for (let rounds = 1; rounds <= 10; rounds++) {
            warriorDP2HitChance100.attack(ogreHealChance0Heal1);
            expect(ogreHealChance0Heal1.getHP()).toBe(20 - rounds * 2);
        }
        expect(ogreHealChance0Heal1.isDead()).toBeTruthy();
    });
});

describe("Testing attack method", () => {
    describe("Attacking warrior with BlockChance: 0", () => {
        let warriorHP20Block0;
        beforeEach(() => {
            warriorHP20Block0 = new Warrior("Warrior", 20, 0, 1, 1, 1, 0);
            warriorHP20Block0.setFightingStatus(true);
        });

        test("Monster Attack HitChance: 100, DPMin=DPMax: 20", () => {
            const ogreHitChance100DP20 = new Monster("Ogre", 10, 20, 20, 1, 100, 0, 1, 1);
            ogreHitChance100DP20.attack(warriorHP20Block0);
            expect(warriorHP20Block0.isDead()).toBeTruthy();
        });

        test("Monster Attack HitChance: 100, DPMin=DPMax: 10", () => {
            const ogreHitChance100DP10 = new Monster("Ogre", 10, 10, 10, 1, 100, 0, 1, 1);
            ogreHitChance100DP10.attack(warriorHP20Block0);
            expect(warriorHP20Block0.getHP()).toBe(10);
            ogreHitChance100DP10.attack(warriorHP20Block0);
            expect(warriorHP20Block0.getHP()).toBe(0);
            expect(warriorHP20Block0.isDead()).toBeTruthy();
        });

        test("Monster Attack HitChance: 50, DPMin=DPMax: 1", () => {
            const warriorHP5000Block0 = new Warrior("Warrior", 5000, 0, 1, 1, 1, 0);
            warriorHP5000Block0.setFightingStatus(true);
            const ogreHitChance50DP10 = new Monster("Ogre", 10, 1, 1, 1, 50, 0, 1, 1);
            for (let round = 0; round < 1000; round++) {
                ogreHitChance50DP10.attack(warriorHP5000Block0);
            }
            expect(warriorHP5000Block0.getHP()).toBeGreaterThan(4000);
            expect(warriorHP5000Block0.getHP()).toBeLessThan(5000);
        });

        test("Monster Attack HitChance: 100, DPMin=1 DPMax=2 [range DP]", () => {
            const warriorHP5000Block0 = new Warrior("Warrior", 5000, 0, 1, 1, 1, 0);
            warriorHP5000Block0.setFightingStatus(true);
            const ogreHitChance100DP10 = new Monster("Ogre", 10, 1, 2, 1, 100, 0, 1, 1);
            for (let round = 0; round < 1000; round++) {
                ogreHitChance100DP10.attack(warriorHP5000Block0);
            }
            expect(warriorHP5000Block0.getHP()).toBeGreaterThan(3000);
            expect(warriorHP5000Block0.getHP()).toBeLessThan(4000);
        });

        test("Monster Attack HitChance: 0, DPMin=DPMax: 10", () => {
            const ogreHitChance0DP10 = new Monster("Ogre", 10, 10, 10, 1, 0, 0, 1, 1);
            for (let i = 0; i < 100; i++) {
                ogreHitChance0DP10.attack(warriorHP20Block0);
            }
            expect(warriorHP20Block0.getHP()).toBe(20);
        });
    });
});

describe("Tests Monster Character constructor instanciated with invalid arguments.", () => {  
    test("Creating the character with no name", () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with no name", () => {
        expect(() => new Monster(1, 70, 15, 30, 5, 80, 40, 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with non-numeric HP", () => {
        expect(() => new Monster("Gremlin", "1", 15, 30, 5, 80, 40, 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with negative HP", () => {
        expect(() => new Monster("Gremlin", -1, 15, 30, 5, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with zero HP", () => {
        expect(() => new Monster("Gremlin", 0, 15, 30, 5, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with non-numeric DPMin", () => {
        expect(() => new Monster("Gremlin", 70, "1", 30, 5, 80, 40, 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with negative DPMin", () => {
        expect(() => new Monster("Gremlin", 70, -1, 30, 5, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with non-numeric DPMax", () => {
        expect(() => new Monster("Gremlin", 70, 30, "1", 5, 80, 40, 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with negative DPMax", () => {
        expect(() => new Monster("Gremlin", 70, 15, -1, 5, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with 0 DPMax", () => {
        expect(() => new Monster("Gremlin", 70, 15, 0, 5, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with non-numeric AttackSpeed", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, "1", 80, 40, 20, 40)).toThrow(TypeError);
    }); 

    test("Creating the character with negative AttackSpeed", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, -1, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with zero AttackSpeed", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 0, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with non-numeric HitChance", () => {
        expect(() => new Monster("Gremlin", 70, 15, 1, "1", 80, 40, 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with negative HitChance", () => {
        expect(() => new Monster("Gremlin", 70, 15, 1, -1, 80, 40, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with a HitChance greater than 100", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 101, 100, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with a non-numeric HealChance", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, "1", 20, 40)).toThrow(TypeError);
    });

    test("Creating the character with a negative HealChance", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, -1, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with a HealChance greater than 100", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, 101, 20, 40)).toThrow(RangeError);
    });

    test("Creating the character with a non-numeric MinHeal", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, 40, "1", 40)).toThrow(TypeError);
    });
    
    test("Creating the character with a negative MinHeal", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, 40, -1, 40)).toThrow(RangeError);
    });

    test("Creating the character with a non-numeric MaxHeal", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, "1")).toThrow(TypeError);
    });

    test("Creating the character with a negative MaxHeal", () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, -1)).toThrow(RangeError);
    });
});

describe("Tests Monster's setter methods with invalid data", () => {
    test("Set HP to a non numeric value", () => {
        expect(() => {
            const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
            gremlin.setHP("Hello");
        }).toThrow(TypeError);
    });
    test("Set HP to a negative value", () => {
        expect(() => {
            const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
            gremlin.setHP(-1);
        }).toThrow(RangeError);
    });
});

describe("Tests Saves and Loads Monster class", () => {
    test("Saves and Loads Monster class properly (No chances made from initialization)", () => {
        const monsterToSave = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
        const monsterFromSave = Monster.fromJSON(JSON.parse(JSON.stringify(monsterToSave)));
        expect(JSON.stringify(monsterFromSave.toJSON())).toBe(JSON.stringify(monsterFromSave.toJSON()));
        expect(monsterFromSave.toString()).toBe(monsterToSave.toString());
    });

    test("Saves and Loads Monster class properly (No chances made from initialization)", () => {
        const monsterToSave = new Monster("Skeleton", 50, 10, 55, 3, 12, 10, 2, 3);  
        const monsterFromSave = Monster.fromJSON(JSON.parse(JSON.stringify(monsterToSave)));
        expect(JSON.stringify(monsterFromSave.toJSON())).toBe(JSON.stringify(monsterFromSave.toJSON()));
        expect(monsterFromSave.toString()).toBe(monsterToSave.toString());
    });

    test("Saves and Loads Monster class properly (No chances made from initialization)", () => {
        const monsterToSave = new Monster("Ogre", 26, 45, 56, 6, 12, 10, 2, 3);  
        const monsterFromSave = Monster.fromJSON(JSON.parse(JSON.stringify(monsterToSave)));
        expect(JSON.stringify(monsterFromSave.toJSON())).toBe(JSON.stringify(monsterFromSave.toJSON()));
        expect(monsterFromSave.toString()).toBe(monsterToSave.toString());
    });

    test("Saves and Loads Monster class properly (Changed HP)", () => {
        const monsterToSave = new Monster("Ogre", 26, 45, 56, 6, 12, 10, 2, 3);  
        monsterToSave.setHP(10);
        const monsterFromSave = Monster.fromJSON(JSON.parse(JSON.stringify(monsterToSave)));
        expect(JSON.stringify(monsterFromSave.toJSON())).toBe(JSON.stringify(monsterFromSave.toJSON()));
        expect(monsterFromSave.toString()).toBe(monsterToSave.toString());
        expect(monsterFromSave.getHP()).toBe(10);
    });

    test("Save and Load on invalid data", () => {
        expect(() => Monster.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});
