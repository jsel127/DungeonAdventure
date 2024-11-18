import MonsterFactory from "../characters/MonsterFactory";

describe("Tests the monster factory and ensures a Monster object is properly created", () => { 
    const monsterFactory = new MonsterFactory();
    const oneHundredHitChance = monsterFactory.createMonster("Ogre", 200, 30, 60, 2, 60, 10, 30, 60);  

    test('Creating the monster', () => {
        expect(oneHundredHitChance.toString()).toBe("Ogre 200 30 60 2 60 10 30 60");
    });
});