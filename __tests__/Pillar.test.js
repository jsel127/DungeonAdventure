/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Pillar from "../items/Pillar.js";

test('constructor for pillar of abstraction', () => {
    expect(new Pillar(Pillar.PillarType.ABSTRACTION).getName()).toBe('Pillar of Abstraction');
});

test('constructor for pillar of encapsulation', () => {
    expect(new Pillar(Pillar.PillarType.ENCAPSULATION).getName()).toBe('Pillar of Encapsulation');
});

test('constructor for pillar of polymorphism', () => {
    expect(new Pillar(Pillar.PillarType.POLYMORPHISM).getName()).toBe('Pillar of Polymorphism');
});

test('constructor for pillar of inheritance', () => {
    expect(new Pillar(Pillar.PillarType.INHERITANCE).getName()).toBe('Pillar of Inheritance');
});