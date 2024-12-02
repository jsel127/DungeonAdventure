import HealingPotion from "../items/HealingPotion.js";

test('constructor with no arguments', () => {
    expect(new HealingPotion().getName()).toBe('Healing Potion');
});
