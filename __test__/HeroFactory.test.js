import Warrior from "../characters/Warrior";
import Thief from "../characters/Thief";
import Priestess from "../characters/Priestess";
import HeroFactory from "../characters/HeroFactory";

describe("Testing hero factory to ensure proper hero is created and the object is instaciated.", () => {
    const heroFactory = new HeroFactory();

    test("Creating a warrior", () => {
        const warrior = heroFactory.createHero("Warrior", 125, 35, 60, 4, 80, 20);
        expect(warrior instanceof Warrior).toBeTruthy();
        expect(warrior.toString()).toBe("Warrior 125 35 60 4 80 20");
    });
    test("Creating a priestess", () => {
        const priestess = heroFactory.createHero("Priestess", 75, 25, 45, 5, 70, 30);
        expect(priestess instanceof Priestess).toBeTruthy();
        expect(priestess.toString()).toBe("Priestess 75 25 45 5 70 30");
    });
    test("Creating a thief", () => {
        const thief = heroFactory.createHero("Thief", 75, 20, 40, 6, 80, 40);
        expect(thief instanceof Thief).toBeTruthy();
        expect(thief.toString()).toBe("Thief 75 20 40 6 80 40")
    });
});