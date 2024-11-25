import Hero from "../characters/Hero";
describe('Tests simulation of abstract class Hero.', () => {
    test('Instanciates a Hero object. Should throw an error', () => {
        expect(() => new Hero("Warrior", 125, 35, 60, 4, 80, 20)).toThrow(TypeError);
    });
});