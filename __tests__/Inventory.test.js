import Inventory from "../characters/Inventory.js";
import Room from "../dungeon/Room.js";
describe("Instanciates an empty inventory and checks basic functionality", () => {
    const inventory = new Inventory();
    const potionsAdd = 10;
    test("Inventory does not have anything yet", () => {
        expect(inventory.hasVisionPotion()).toBeFalsy();
        expect(inventory.hasHealingPotion()).toBeFalsy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add vision potion",  () => {
        for (let potions = 1; potions <= potionsAdd; potions++) {
            inventory.addVisionPotion();
            expect(inventory.getVisionPotionQuantity()).toBe(potions);
        }
    });

    test("Add healing potion",  () => {
        for (let potions = 1; potions <= potionsAdd; potions++) {
            inventory.addHealingPotion();
            expect(inventory.getHealingPotionQuantity()).toBe(potions);
        }
    });

    test("Use vision potions", () => {
        for (let potions = potionsAdd - 1; potions > 0; potions--) {
            inventory.useVisionPotion();
            expect(inventory.getVisionPotionQuantity()).toBe(potions);
        }
    });

    test("Use healing potions", () => {
        for (let potions = potionsAdd - 1; potions > 0; potions--) {
            inventory.useHealingPotion();
            expect(inventory.getHealingPotionQuantity()).toBe(potions);
        }
    });

    test("Add abstraction pillar", () => {
        inventory.addAbstractionPillar();
        expect(inventory.hasAbstractionPillar()).toBeTruthy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add encapsulation pillar", () => {
        inventory.addEncapsulationPillar();
        expect(inventory.hasEncapsulationPillar()).toBeTruthy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add inheritance pillar", () => {
        inventory.addInheritancePillar();
        expect(inventory.hasInheritancePillar()).toBeTruthy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add polymorphism pillar", () => {
        inventory.addPolymorphismPillar();
        expect(inventory.hasPolymorphismPillar()).toBeTruthy();
        expect(inventory.hasAllPillars()).toBeTruthy();
    });

    test("Check has all pillars works", () => {
        expect(inventory.hasAllPillars()).toBeTruthy();
    });
});

describe("Tests collecting items properly", () => {
    const inventory = new Inventory();
    const room = new Room();
    test("Collects healing potion", () => {
        room.setContent(Room.CONTENT.healingPotion);
        inventory.collectItemFromRoom(room);
        expect(inventory.getHealingPotionQuantity()).toBe(1);
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });

    test("Collects vision potion", () => {
        room.setContent(Room.CONTENT.visionPotion);
        inventory.collectItemFromRoom(room);
        expect(inventory.getVisionPotionQuantity()).toBe(1);
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });

    test("Collects abstraction pillar", () => {
        room.setContent(Room.CONTENT.abstractionPillar);
        inventory.collectItemFromRoom(room);
        expect(inventory.hasAbstractionPillar()).toBeTruthy();
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });

    test("Collects encapsulation pillar", () => {
        room.setContent(Room.CONTENT.encapsulationPillar);
        inventory.collectItemFromRoom(room);
        expect(inventory.hasEncapsulationPillar()).toBeTruthy();
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });

    test("Collects inheritance pillar", () => {
        room.setContent(Room.CONTENT.inheritancePillar);
        inventory.collectItemFromRoom(room);
        expect(inventory.hasInheritancePillar()).toBeTruthy();
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });

    test("Collects polymorphism pillar", () => {
        room.setContent(Room.CONTENT.polymorphismPillar);
        inventory.collectItemFromRoom(room);
        expect(inventory.hasPolymorphismPillar()).toBeTruthy();
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });
});

describe("Tests with invalid data", () => {
    test("Check cannot instanciate inventory with negative quantities", () => {
        expect(() => new Inventory(-1, 0)).toThrow();
    });

    test("Check cannot instanciate inventory with negative quantities", () => {
        expect(() => new Inventory(0 ,-1)).toThrow();
    });

    test("Cannot healing potion decrement quantity if don't have any of the item", () => {
        expect(() => {
            const inventory = new Inventory();
            expect(() => inventory.useHealingPotion()).toThrow();
        });
    });

    test("Cannot vision potion decrement quantity if don't have any of the item", () => {
        expect(() => {
            const inventory = new Inventory();
            expect(() => inventory.useVisionPotion()).toThrow();
        });
    });
});

describe("Saves and Loads Inventory class properly", () => {
    test("Saves and Loads Inventory class properly", () => {
        const inventoryToSave = new Inventory();
        const inventoryFromSave = Inventory.fromJSON(JSON.parse(JSON.stringify(inventoryToSave)));
        expect(inventoryFromSave.toString()).toBe(inventoryToSave.toString());
    });

    test("Save and Load on invalid data", () => {
        expect(() => Inventory.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});