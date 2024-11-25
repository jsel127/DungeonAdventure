import Adventurer from "../Adventurer";
import Hero from "../characters/Hero";
import HeroFactory from "../characters/HeroFactory";
import MonsterFactory from "../characters/MonsterFactory";
import Pillar from "../Pillar";
describe("Testing Adventurer with valid data to make a Warrior character", () => {
    const warriorJoshua = new Adventurer("Joshua", HeroFactory.createHero("Warrior"));
    test("Name is properly instanciated", () => {
        expect(warriorJoshua.getName()).toBe("Joshua");
    });

    test("Proper number of potions", () => {
        expect(warriorJoshua.getQuantityHealingPotion()).toBe(0);
        expect(warriorJoshua.getQuantityVisionPotion()).toBe(0);
    });

    test("Proper setup of pillars (none yet).", () => {
        expect(warriorJoshua.getPillars()).toBe("");
    });

    test("Add/Remove a healing potion", () => {
        warriorJoshua.incrementQuantityHealingPotion();
        expect(warriorJoshua.getQuantityHealingPotion()).toBe(1);
        warriorJoshua.incrementQuantityHealingPotion();
        expect(warriorJoshua.getQuantityHealingPotion()).toBe(2);

        warriorJoshua.decrementQuantityHealingPotion();
        expect(warriorJoshua.getQuantityHealingPotion()).toBe(1);
        warriorJoshua.decrementQuantityHealingPotion();
        expect(warriorJoshua.getQuantityHealingPotion()).toBe(0);
    });


    // Not working yet
    // test("Adding Pillars", () => {
    //     warriorJoshua.addPillar(new Pillar(Pillar.PillarType.ABSTRACTION));
    //     expect(warriorJoshua.getPillars()).toBe(Pillar.PillarType.ABSTRACTION + '\n');
    //     warriorJoshua.addPillar(new Pillar(Pillar.PillarType.ENCAPSULATION));
    //     expect(warriorJoshua.getPillars()).toBe(`${Pillar.PillarType.ABSTRACTION}\n${Pillar.PillarType.ENCAPSULATION}`);
    //     warriorJoshua.addPillar(new Pillar(Pillar.PillarType.POLYMORPHISM));
    //     expect(warriorJoshua.getPillars()).toBe(`${Pillar.PillarType.ABSTRACTION}\n${Pillar.PillarType.ENCAPSULATION}
    //                                              \n${Pillar.PillarType.POLYMORPHISM}`);
    //     warriorJoshua.addPillar(new Pillar(Pillar.PillarType.INHERITANCE));
    //     expect(warriorJoshua.getPillars()).toBe(`${Pillar.PillarType.ABSTRACTION}\n${Pillar.PillarType.ENCAPSULATION}
    //                                             \n${Pillar.PillarType.POLYMORPHISM}\n${Pillar.PillarType.INHERITANCE}`);                                         
    // });

});

describe("Test invalid operations on the Adventurer", () => {
    test("Invalid name (number)", () => {
        expect(() => new Adventurer(360, HeroFactory.createHero("Thief"))).toThrow(TypeError);
    });

    test("Invalid Hero (string)", () => {
        expect(() => new Adventurer("Joshua", "Joshua2")).toThrow(TypeError);
    });

    test("Invalid Hero (monster)", () => {
        expect(() => new Adventurer("Joshua", MonsterFactory.createMonster("Skeleton"))).toThrow(TypeError);
    });

    test("Decrementing when no healing potions left", () => {
        expect(() => {
            const warriorJoshua = new Adventurer("Joshua", HeroFactory.createHero("Warrior"));
            warriorJoshua.decrementQuantityHealingPotion()
        }).toThrow(EvalError);
    });

    test("Decrementing when no vision potions left", () => {
        expect(() => {
            const warriorJoshua = new Adventurer("Joshua", HeroFactory.createHero("Warrior"));
            warriorJoshua.decrementQuantityVisionPotion()
        }).toThrow(EvalError);
    });
})