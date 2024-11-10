import Pillar from '../Pillar';

test('constructor for pillar of abstraction', () => {
    expect(new Pillar(Pillar.PillarType.ABSTRACTION).getName()).toBe('Pillar of Abstraction');
});

test('constructor for pillar of polymorphism', () => {
    expect(new Pillar(Pillar.PillarType.POLYMORPHISM).getName()).toBe('Pillar of Polymorphism');
});