const InventorySlot = require('./InventorySlot');
const HealingPotion = require('./HealingPotion');

test('constructor (default) to create an empty InventorySlot', () => {
    expect(new InventorySlot().getItem()).toBe(InventorySlot.EMPTY);
    expect(new InventorySlot().getQuantity()).toBe(0);
});

test('constructor passed a HealingPotion with quantity 5', () => {
    const potion = new HealingPotion();
    const slot = new InventorySlot(potion, 5);
    expect(slot.getItem()).toBe(potion);
    expect(slot.getQuantity()).toBe(5);
});