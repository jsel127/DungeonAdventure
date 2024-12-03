/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import InventorySlot from '../items/InventorySlot.js';
import HealingPotion from '../items/HealingPotion.js';
import Pillar from '../items/Pillar.js';

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

test('constructor passed negative quantity', () => {
    expect(() => new InventorySlot(new HealingPotion(), -3)).toThrow(RangeError);
});

test('constructor passed a non-Item', () => {
    expect(() => new InventorySlot('not an item', 12)).toThrow(TypeError);
});

test('setItem passed HealingPotion', () => {
    let slot = new InventorySlot();
    slot.setItem(new HealingPotion());
    expect(slot.getItem()).toStrictEqual(new HealingPotion());
});

test('setItem passed Pillar of Encapsulation', () => {
    let slot = new InventorySlot();
    slot.setItem(new Pillar(Pillar.PillarType.ENCAPSULATION));
    expect(slot.getItem()).toStrictEqual(new Pillar(Pillar.PillarType.ENCAPSULATION));
});

test('setItem passed a non-Item', () => {
    expect(() => new InventorySlot().setItem('not an item')).toThrow(TypeError);
});

test('setItem to EMPTY', () => {
    let slot = new InventorySlot(new HealingPotion());
    slot.setItem(InventorySlot.EMPTY);
    expect(slot.getItem()).toBe(InventorySlot.EMPTY);
});

test('setQuantity to 5', () => {
    let slot = new InventorySlot(new HealingPotion(), 12);
    slot.setQuantity(5);
    expect(slot.getQuantity()).toBe(5);
});

test('setQuantity passed a negative value', () => {
    expect(() => new InventorySlot(new HealingPotion(), 2).setQuantity(-4)).toThrow(RangeError);
});

test('setQuantity to 0', () => {
    let slot = new InventorySlot(new HealingPotion(), 12);
    slot.setQuantity(0);
    expect(slot.getQuantity()).toBe(0);
    expect(slot.getItem()).toBe(InventorySlot.EMPTY);
});

test('setQuantity passed a positive value to an EMPTY InventorySlot', () => {
    expect(() => new InventorySlot().setQuantity(9))
            .toThrow('InventorySlot must contain an Item to set a positive quantity');
});

test('incrementQuantity from 12 to 13', () => {
    let slot = new InventorySlot(new HealingPotion(), 12);
    slot.incrementQuantity();
    expect(slot.getQuantity()).toBe(13);
});

test('incrementQuantity on EMPTY InventorySlot', () => {
    expect(() => new InventorySlot().incrementQuantity())
            .toThrow('InventorySlot must contain an Item to set a positive quantity');
});

test('decrementQuantity from 12 to 11', () => {
    let slot = new InventorySlot(new HealingPotion(), 12);
    slot.decrementQuantity();
    expect(slot.getQuantity()).toBe(11);
});

test('decrementQuantity on EMPTY InventorySlot', () => {
    expect(() => new InventorySlot().decrementQuantity())
            .toThrow(RangeError);
});

test('decrementQuantity from 1 to 0', () => {
    let slot = new InventorySlot(new HealingPotion(), 1);
    slot.decrementQuantity();
    expect(slot.getQuantity()).toBe(0);
    expect(slot.getItem()).toBe(InventorySlot.EMPTY);
});

test('isEmpty is true', () => {
    expect(new InventorySlot().isEmpty()).toBe(true);
});

test('isEmpty is false', () => {
    expect(new InventorySlot(new Pillar(Pillar.PillarType.ABSTRACTION), 10).isEmpty()).toBe(false);
});

test('toString for InventorySlot containing HealingPotion with quantity 6', () => {
    expect(new InventorySlot(new HealingPotion(), 6).toString()).toBe('Healing Potion (6)');
}); 

test('toString for EMPTY InventorySlot', () => {
    expect(new InventorySlot().toString()).toBe('empty');
});