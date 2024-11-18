import Monster from "../characters/Monster";
// TODO: test attack method
describe('Tests Monster Character instanciated to Name: Gremlin, HP: 70, DPMin: 15, DPMax: 30, AttackSpeed: 5, HitChange: 80, HealChance: 40, MinHeal: 20, MaxHeal: 40', () => {
    const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
    test('Creating the character', () => {
        expect(gremlin.toString()).toBe("Gremlin 70 15 30 5 80 40 20 40");
    });

    // GETTER methods
    test('getName', () => {
        expect(gremlin.getName()).toBe("Gremlin");
    });

    test('getHP', () => {
        expect(gremlin.getHP()).toBe(70);
    });

    test('getDPMin', () => {
        expect(gremlin.getDPMin()).toBe(15);
    });

    test('getDPMax', () => {
        expect(gremlin.getDPMax()).toBe(30);
    });

    test('getAttackSpeed', () => {
        expect(gremlin.getAttackSpeed()).toBe(5);
    });

    test('getHitChance', () => {
        expect(gremlin.getHitChance()).toBe(80);
    });

    test('getHealChance', () => {
        expect(gremlin.getHealChance()).toBe(40);
    });

    test('getMinHeal', () => {
        expect(gremlin.getMinHeal()).toBe(20);
    });

    test('getMaxHeal', () => {
        expect(gremlin.getMaxHeal()).toBe(40);
    });

    // SETTER methods
    test('setHP to smaller number (10)', () => {
        gremlin.setHP(10);
        expect(gremlin.getHP()).toBe(10);
    });

    test('setHP to larger number (500)', () => {
        gremlin.setHP(500);
        expect(gremlin.getHP()).toBe(500);
    });

    test('setHP to 0', () => {
        gremlin.setHP(0);
        expect(gremlin.getHP()).toBe(0);
    });

    test('setHP to -1', () => {
        expect(() => gremlin.setHP(-1)).toThrow(RangeError);
    });

    test('isDead when the monster is NOT dead HP 100', () => {
        gremlin.setHP(100);
        expect(gremlin.isDead()).toBeFalsy();
    });

    test('isDead when the monster is NOT dead HP 1', () => {
        gremlin.setHP(1);
        expect(gremlin.isDead()).toBeFalsy();
    });

    test('isDead when the monster is dead', () => {
        gremlin.setHP(0);
        expect(gremlin.isDead()).toBeTruthy();
    });
});

describe('Tests Monster Character constructor instanciated with invalid arguments.', () => {  
    test('Creating the character with no name', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative HP', () => {
        expect(() => new Monster("Gremlin", -1, 15, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with zero HP', () => {
        expect(() => new Monster("Gremlin", 0, 15, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative DPMin', () => {
        expect(() => new Monster("Gremlin", 70, -1, 30, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative DPMax', () => {
        expect(() => new Monster("Gremlin", 70, 15, -1, 5, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with zero AttackSpeed', () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, 0, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with negative AttackSpeed', () => {
        expect(() => new Monster("Gremlin", 70, 15, 30, -1, 80, 40, 20, 40)).toThrow();
    });

    test('Creating the character with a HealChance greater than 100', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 101, 20, 40)).toThrow();
    });

    test('Creating the character with a HealChance less than 0', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, -1, 20, 40)).toThrow();
    });

    test('Creating the character with a MinHeal less than 0', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, -1, 40)).toThrow();
    });

    test('Creating the character with a MaxHeal less than 0', () => {
        expect(() => new Monster(null, 70, 15, 30, 5, 80, 40, 20, -1)).toThrow();
    });
});

describe("Tests Monster's setter methods with invalid data", () => {
    test('Set HP to a negative value', () => {
        expect(() => {
            const gremlin = new Monster("Gremlin", 70, 15, 30, 5, 80, 40, 20, 40);  
            gremlin.setHP(-1);
        }).toThrow();
    });
});