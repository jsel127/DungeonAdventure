/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import Inventory from "../characters/Inventory.js";
import Room from "../dungeon/Room.js";

/**
 * Test Inventory class which stores items. 
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Instanciates an empty inventory and checks basic functionality", () => {
    const potionsAdd = 10;
    let inventory;
    beforeEach(() => {
        inventory = new Inventory();
    });

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
        for (let potions = 1; potions <= potionsAdd; potions++) {
            inventory.addVisionPotion();
            expect(inventory.getVisionPotionQuantity()).toBe(potions);
        }
        for (let potions = potionsAdd - 1; potions > 0; potions--) {
            inventory.useVisionPotion();
            expect(inventory.getVisionPotionQuantity()).toBe(potions);
        }
    });

    test("Use healing potions", () => {
        for (let potions = 1; potions <= potionsAdd; potions++) {
            inventory.addHealingPotion();
            expect(inventory.getHealingPotionQuantity()).toBe(potions);
        }
        for (let potions = potionsAdd - 1; potions > 0; potions--) {
            inventory.useHealingPotion();
            expect(inventory.getHealingPotionQuantity()).toBe(potions);
        }
    });

    test("Add abstraction pillar", () => {
        inventory.addAbstractionPillar();
        expect(inventory.hasAbstractionPillar()).toBeTruthy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add encapsulation pillar", () => {
        inventory.addEncapsulationPillar();
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeTruthy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add inheritance pillar", () => {
        inventory.addInheritancePillar();
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeTruthy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();        
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Add polymorphism pillar", () => {
        inventory.addPolymorphismPillar();
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeTruthy();
        expect(inventory.hasAllPillars()).toBeFalsy();
    });

    test("Check has all pillars works", () => {
        inventory.addAbstractionPillar();
        inventory.addEncapsulationPillar();
        inventory.addInheritancePillar();
        inventory.addPolymorphismPillar();
        expect(inventory.hasAllPillars()).toBeTruthy();
    });

    test("Check HP gained from healing potion", () => {
        expect(Inventory.getHealingPotionHP()).toBe(10);
    });
});

describe("Tests constructor valid data", () => {
    test("Healing Potion: 0, Vision Potion: 0, No Pillars", () => {
        const inventoryH0V0 = new Inventory(0, 0);
        expect(inventoryH0V0.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH0V0.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 1, Vision Potion: 0, No Pillars", () => {
        const inventoryH1V0 = new Inventory(0, 0);
        expect(inventoryH1V0.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH1V0.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH1V0.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH1V0.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH1V0.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH1V0.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 1, No Pillars", () => {
        const inventoryH0V0 = new Inventory(0, 1);
        expect(inventoryH0V0.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0.getVisionPotionQuantity()).toBe(1);
        expect(inventoryH0V0.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH0V0.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 0, No pillars (explicitly specified)", () => {
        const pillars = {abstraction: false, encapsulation: false, inheritance: false, polymorphism: false}
        const inventoryH0V0A = new Inventory(0, 0, pillars);
        expect(inventoryH0V0A.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0A.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0A.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH0V0A.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0A.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0A.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Abstraction", () => {
        const pillars = {abstraction: true, encapsulation: false, inheritance: false, polymorphism: false}
        const inventoryH0V0A = new Inventory(0, 0, pillars);
        expect(inventoryH0V0A.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0A.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0A.hasAbstractionPillar()).toBeTruthy();
        expect(inventoryH0V0A.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0A.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0A.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Encapsulation", () => {
        const pillars = {abstraction: false, encapsulation: true, inheritance: false, polymorphism: false}
        const inventoryH0V0E = new Inventory(0, 0, pillars);
        expect(inventoryH0V0E.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0E.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0E.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH0V0E.hasEncapsulationPillar()).toBeTruthy();
        expect(inventoryH0V0E.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0E.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Inheritance", () => {
        const pillars = {abstraction: false, encapsulation: false, inheritance: true, polymorphism: false}
        const inventoryH0V0I = new Inventory(0, 0, pillars);
        expect(inventoryH0V0I.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0I.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0I.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH0V0I.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0I.hasInheritancePillar()).toBeTruthy();
        expect(inventoryH0V0I.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Polymorphism", () => {
        const pillars = {abstraction: false, encapsulation: false, inheritance: false, polymorphism: true}
        const inventoryH0V0P = new Inventory(0, 0, pillars);
        expect(inventoryH0V0P.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0P.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0P.hasAbstractionPillar()).toBeFalsy();
        expect(inventoryH0V0P.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0P.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0P.hasPolymorphismPillar()).toBeTruthy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Abstraction, Encapsulation", () => {
        const pillars = {abstraction: true, encapsulation: true, inheritance: false, polymorphism: false}
        const inventoryH0V0AE = new Inventory(0, 0, pillars);
        expect(inventoryH0V0AE.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0AE.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0AE.hasAbstractionPillar()).toBeTruthy();
        expect(inventoryH0V0AE.hasEncapsulationPillar()).toBeTruthy();
        expect(inventoryH0V0AE.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0AE.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Abstraction, Polymorphism", () => {
        const pillars = {abstraction: true, encapsulation: false, inheritance: false, polymorphism: true}
        const inventoryH0V0AP = new Inventory(0, 0, pillars);
        expect(inventoryH0V0AP.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0AP.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0AP.hasAbstractionPillar()).toBeTruthy();
        expect(inventoryH0V0AP.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0AP.hasInheritancePillar()).toBeFalsy();
        expect(inventoryH0V0AP.hasPolymorphismPillar()).toBeTruthy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Abstraction Inheritance, Polymorphism", () => {
        const pillars = {abstraction: true, encapsulation: false, inheritance: true, polymorphism: true}
        const inventoryH0V0AIP = new Inventory(0, 0, pillars);
        expect(inventoryH0V0AIP.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0AIP.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0AIP.hasAbstractionPillar()).toBeTruthy();
        expect(inventoryH0V0AIP.hasEncapsulationPillar()).toBeFalsy();
        expect(inventoryH0V0AIP.hasInheritancePillar()).toBeTruthy();
        expect(inventoryH0V0AIP.hasPolymorphismPillar()).toBeTruthy();
    });

    test("Healing Potion: 0, Vision Potion: 0, Abstraction, Encapsulation, Inheritance, Polymorphism", () => {
        const pillars = {abstraction: true, encapsulation: true, inheritance: true, polymorphism: true}
        const inventoryH0V0AEIP = new Inventory(0, 0, pillars);
        expect(inventoryH0V0AEIP.getHealingPotionQuantity()).toBe(0);
        expect(inventoryH0V0AEIP.getVisionPotionQuantity()).toBe(0);
        expect(inventoryH0V0AEIP.hasAbstractionPillar()).toBeTruthy();
        expect(inventoryH0V0AEIP.hasEncapsulationPillar()).toBeTruthy();
        expect(inventoryH0V0AEIP.hasInheritancePillar()).toBeTruthy();
        expect(inventoryH0V0AEIP.hasPolymorphismPillar()).toBeTruthy();
    });
});

describe("Tests processing items", () => {
    let inventory;
    beforeEach(() => {
        inventory = new Inventory();
    });
    test("Collects healing potion", () => {
        expect(inventory.processContentToItem(Room.CONTENT.healingPotion)).toBe("Healing Potion");
        expect(inventory.getHealingPotionQuantity()).toBe(1);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Collects vision potion", () => {
        expect(inventory.processContentToItem(Room.CONTENT.visionPotion)).toBe("Vision Potion");
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(1);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Collects abstraction pillar", () => {
        expect(inventory.processContentToItem(Room.CONTENT.abstractionPillar)).toBe("Abstraction Pillar");       
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeTruthy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Collects encapsulation pillar", () => {
        expect(inventory.processContentToItem(Room.CONTENT.encapsulationPillar)).toBe("Encapsulation Pillar");       
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeTruthy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Collects inheritance pillar", () => {
        expect(inventory.processContentToItem(Room.CONTENT.inheritancePillar)).toBe("Inheritance Pillar");       
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeTruthy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("Collects polymorphism pillar", () => {
        expect(inventory.processContentToItem(Room.CONTENT.polymorphismPillar)).toBe("Polymorphism Pillar");       
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeTruthy();
    });

    test("No item collected if ogre", () => {
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("No item collected if gremlin", () => {
        expect(inventory.processContentToItem(Room.CONTENT.gremlin)).toBeFalsy();
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("No item collected if skeleton", () => {
        expect(inventory.processContentToItem(Room.CONTENT.skeleton)).toBeFalsy();
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("No item collected if empty", () => {
        expect(inventory.processContentToItem(Room.CONTENT.empty)).toBeFalsy();
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("No item collected if entrance", () => {
        expect(inventory.processContentToItem(Room.CONTENT.entrance)).toBeFalsy();
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("No item collected if exit", () => {
        expect(inventory.processContentToItem(Room.CONTENT.exit)).toBeFalsy();
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });

    test("No item collected if not valid room content", () => {
        expect(inventory.processContentToItem(1)).toBeFalsy();
        expect(inventory.processContentToItem(Room.CONTENT.ogre)).toBeFalsy();
        expect(inventory.getHealingPotionQuantity()).toBe(0);
        expect(inventory.getVisionPotionQuantity()).toBe(0);
        expect(inventory.hasAbstractionPillar()).toBeFalsy();
        expect(inventory.hasEncapsulationPillar()).toBeFalsy();
        expect(inventory.hasInheritancePillar()).toBeFalsy();
        expect(inventory.hasPolymorphismPillar()).toBeFalsy();
    });
});

describe("Tests instanciation with invalid data", () => {
    test("Negative healing potions", () => {
        expect(() => new Inventory(-1, 0)).toThrow(RangeError);
    });

    test("Negative vision potions", () => {
        expect(() => new Inventory(0 ,-1)).toThrow(RangeError);
    });

    test("Non numeric healing potion", () => {
        expect(() => new Inventory("healing", 0)).toThrow(TypeError);
    });

    test("Non numeric vision potion", () => {
        expect(() => new Inventory(0, "vision")).toThrow(TypeError);
    });

    test("Non object pillars", () => {
        expect(() => new Inventory(0 , 0, "pillars")).toThrow(TypeError);
    });

    test("Not correct object passed (too short)", () => {
        expect(() => new Inventory(0 , 0, {"pillars":4})).toThrow(TypeError);
    });

    test("Not correct object passed (too long)", () => {
        const pillars = {quantity: 4, abstraction: false, encapsulation: false, inheritance: false, polymorphism: false};
        expect(() => new Inventory(0 , 0, pillars)).toThrow(TypeError);
    });

    test("Not correct object passed (incorrect properties)", () => {
        const pillars = {quantity: 4, encapsulation: false, inheritance: false, polymorphism: false};
        expect(() => new Inventory(0 , 0, pillars)).toThrow(TypeError);
    });

    test("Not correct object passed (correct key, incorrect value type abstraction)", () => {
        const pillars = {abstraction: 1, encapsulation: false, inheritance: false, polymorphism: false};
        expect(() => new Inventory(0 , 0, pillars)).toThrow(TypeError);
    });

    test("Not correct object passed (correct key, incorrect value type encapsulation)", () => {
        const pillars = {abstraction: false, encapsulation: 1, inheritance: false, polymorphism: false};
        expect(() => new Inventory(0 , 0, pillars)).toThrow(TypeError);
    });

    test("Not correct object passed (correct key, incorrect value type inheritance)", () => {
        const pillars = {abstraction: false, encapsulation: false, inheritance: 1, polymorphism: false};
        expect(() => new Inventory(0 , 0, pillars)).toThrow(TypeError);
    });

    test("Not correct object passed (correct key, incorrect value type polymorphism)", () => {
        const pillars = {abstraction: false, encapsulation: false, inheritance: false, polymorphism: 1};
        expect(() => new Inventory(0 , 0, pillars)).toThrow(TypeError);
    });
});

describe("Test invalid call to method", () => {
    test("Cannot healing potion decrement quantity if don't have any of the item", () => {
        expect(() => {
            const inventory = new Inventory(0, 1);
            expect(inventory.hasHealingPotion()).toBeFalsy();
            expect(() => inventory.useHealingPotion()).toThrow(EvalError);
        });
    });

    test("Cannot vision potion decrement quantity if don't have any of the item", () => {
        expect(() => {
            const inventory = new Inventory(1, 0);
            expect(inventory.hasVisionPotion()).toBeFalsy();
            expect(() => inventory.useVisionPotion()).toThrow(EvalError);
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