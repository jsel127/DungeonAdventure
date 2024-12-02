import Inventory from '../items/Inventory.js';
import InventorySlot from '../items/InventorySlot.js';
import VisionPotion from '../items/VisionPotion.js';
import Pillar from '../items/Pillar.js';

describe('Inventory test',  () => {

    let myInventory = new Inventory();
    const myVisionPotion = new VisionPotion();
    const myPillar = new Pillar(Pillar.PillarType.POLYMORPHISM);

    beforeEach(() => {
        myInventory = new Inventory();
    });

    test('constructor builds an Inventory object', () => {
        const inventoryArray = myInventory.getArray();
        const emptySlot = new InventorySlot();
        expect(inventoryArray.length).toBe(Inventory.NUM_SLOTS);
        for (let i in inventoryArray) {
            expect(inventoryArray[i]).toStrictEqual(emptySlot);
        }
    });

    test('addItem to empty Inventory', () => {
        myInventory.addItem(myPillar);
        expect(myInventory.getSlot(0)).toStrictEqual(new InventorySlot(myPillar, 1));
    });

    test('addItem when the Item is the first of its type', () => {
        myInventory.addItem(myPillar);
        myInventory.addItem(myVisionPotion);
        expect(myInventory.getSlot(1)).toStrictEqual(new InventorySlot(myVisionPotion, 1));
    });

    test('addItem when an identical item exists in the Inventory', () => {
        myInventory.addItem(myPillar);
        myInventory.addItem(myVisionPotion);
        myInventory.addItem(myVisionPotion);
        expect(myInventory.getSlot(1)).toStrictEqual(new InventorySlot(myVisionPotion, 2));
    });

    test('useItem when the Item is not the last of its type in Inventory', () => {
        myInventory.addItem(myPillar);
        myInventory.addItem(myVisionPotion);
        myInventory.addItem(myVisionPotion);
        myInventory.useItem(myVisionPotion);
        expect(myInventory.getSlot(1)).toStrictEqual(new InventorySlot(myVisionPotion, 1));
    });

    test('useItem when the Item is the last of its type in Inventory', () => {
        myInventory.addItem(myPillar);
        myInventory.addItem(myVisionPotion);
        myInventory.useItem(myVisionPotion);
        expect(myInventory.getSlot(1)).toStrictEqual(new InventorySlot());
    });

    test('useItem for a Pillar', () => {
        myInventory.addItem(myPillar);
        expect(() => myInventory.useItem(myPillar)).toThrow('Pillars do not currently have an ability');
    });

    test('useItem when the Inventory does not contain the item', () => {
        myInventory.addItem(myPillar);
        expect(() => myInventory.useItem(myVisionPotion)).toThrow('Inventory does not contain item Vision Potion');
    });

    test('hasItem when item exists', () => {
        myInventory.addItem(myVisionPotion);
        expect(myInventory.hasItem(myVisionPotion)).toBe(true);
    });

    test('hasItem when item does not exist', () => {
        myInventory.addItem(myVisionPotion);
        expect(myInventory.hasItem(myPillar)).toBe(false);
    });

    test('getIndex when the item is not in the Inventory', () => {
        myInventory.addItem(myPillar);
        expect(myInventory.getIndex(myVisionPotion)).toBe(-1);
    });

    test('getIndex when the item is in the Inventory', () => {
        myInventory.addItem(myVisionPotion);
        myInventory.addItem(myPillar);
        expect(myInventory.getIndex(myPillar)).toBe(1);
    });

    test('toString for empty Inventory', () => {
        expect(myInventory.toString()).toBe('[0] empty\n[1] empty\n[2] empty\n[3] empty\n[4] empty\n[5] empty\n');
    });

    test('toString for Inventory with contents', () => {
        myInventory.addItem(myVisionPotion);
        myInventory.addItem(myVisionPotion);
        myInventory.addItem(myVisionPotion);
        myInventory.addItem(myPillar);
        expect(myInventory.toString()).toBe('[0] Vision Potion (3)\n[1] Pillar of Polymorphism (1)\n[2] empty\n[3] empty\n[4] empty\n[5] empty\n');
    });

    test('getSlot for empty slot', () => {
        expect(myInventory.getSlot(3)).toStrictEqual(new InventorySlot());
    });

    test('getSlot for slot with contents', () => {
        myInventory.addItem(myVisionPotion);
        expect(myInventory.getSlot(0)).toStrictEqual(new InventorySlot(myVisionPotion, 1));
    });

})