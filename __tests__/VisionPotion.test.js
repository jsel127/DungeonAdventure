import VisionPotion from '../VisionPotion';

test('constructor with no arguments', () => {
    expect(new VisionPotion().getName()).toBe('Vision Potion');
});
