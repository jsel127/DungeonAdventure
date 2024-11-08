const VisionPotion = require('../VisionPotion');

test('constructor with no arguments', () => {
    expect(new VisionPotion().getName()).toBe('Vision Potion');
});
