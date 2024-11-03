const HealingPotion = require('./HealingPotion');

test('constructor with no arguments', () => {
    expect(new HealingPotion().getName()).toBe('Healing Potion');
});
