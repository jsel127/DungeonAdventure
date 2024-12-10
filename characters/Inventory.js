import Room from "../dungeon/Room.js";

export default class Inventory {
    static HEALTH_POTION_MAX_HP = 10;
    /** An object containing the quantity and precence of items. */
    #myItems;
    

    constructor(theHealingPotionQuantity = 0, theVisionPotionQuantity = 0, 
                thePillars = {abstraction: false, encapsulation: false, 
                              inheritance: false, polymorphism: false}) {
        if (!Number.isInteger(theHealingPotionQuantity) 
            || !Number.isInteger(theVisionPotionQuantity)) {
            throw new TypeError("The quantity of healing and/or vision postions must be an integer");
        }
        if (theHealingPotionQuantity < 0 || theVisionPotionQuantity < 0) {
            throw new RangeError("The quantity of healing and/or vision potions cannot be negative.");
        }
        this.#myItems = {
            healing_potion: theHealingPotionQuantity,
            vision_potion: theVisionPotionQuantity,
            pillars: thePillars
        }
    }
    
    static getHealingPotionHP() {
        return Inventory.HEALTH_POTION_MAX_HP;
    }

    collectItemFromRoom(theRoom) {
        const content = theRoom.getContent();
        let item;
        if (content === Room.CONTENT.healingPotion) {
            this.addHealingPotion();
            item = "Healing Potion";
        } else if (content === Room.CONTENT.visionPotion) {
            this.addVisionPotion();
            item = "Vision Potion";
        } else if (content === Room.CONTENT.abstractionPillar) {
            this.addAbstractionPillar();
            item = "Abstraction Pillar";
        } else if (content === Room.CONTENT.encapsulationPillar) {
            this.addEncapsulationPillar();
            item = "Encapsulation Pillar";
        } else if (content === Room.CONTENT.inheritancePillar) {
            this.addInheritancePillar();
            item = "Inheritance Pillar";
        } else if (content === Room.CONTENT.polymorphismPillar) {
            this.addPolymorphismPillar();
            item = "Polymorphism Pillar";
        } else {
            return false;
        }
        theRoom.clearContent();
        return item;
    }
    
    static fromJSON(theJSON) {
        if (theJSON.__type === undefined || theJSON.__type !== Inventory.name) {
            throw new TypeError("The JSON is not of inventory type.");
        }
        return new Inventory(theJSON.items.healing_potion, theJSON.items.vision_potion, theJSON.items.pillars);
    }

    hasHealingPotion() {
        return this.#myItems.healing_potion > 0;
    }

    getHealingPotionQuantity() {
        return this.#myItems.healing_potion;
    }

    addHealingPotion() {
        this.#myItems.healing_potion += 1;
    }

    useHealingPotion() {
        if (this.hasHealingPotion()) {
            this.#myItems.healing_potion -= 1;
        }
    }

    hasVisionPotion() {
        return this.#myItems.vision_potion > 0;
    }

    getVisionPotionQuantity() {
        return this.#myItems.vision_potion;
    }

    addVisionPotion() {
        this.#myItems.vision_potion += 1;
    }

    useVisionPotion() {
        if (this.hasVisionPotion()) {
            this.#myItems.vision_potion -= 1;
        }
    }

    addAbstractionPillar() {
        this.#myItems.pillars.abstraction = true;
    }

    hasAbstractionPillar() {
        return this.#myItems.pillars.abstraction;
    }

    addEncapsulationPillar() {
        this.#myItems.pillars.encapsulation = true;
    }

    hasEncapsulationPillar() {
        return this.#myItems.pillars.encapsulation;
    }

    addInheritancePillar() {
        this.#myItems.pillars.inheritance = true;
    }

    hasInheritancePillar() {
        return this.#myItems.pillars.inheritance;
    }

    addPolymorphismPillar() {
        this.#myItems.pillars.polymorphism = true;
    }

    hasPolymorphismPillar() {
        return this.#myItems.pillars.polymorphism;
    }

    hasAllPillars() {
        return this.hasAbstractionPillar() &&
               this.hasEncapsulationPillar() &&
               this.hasInheritancePillar() && 
               this.hasPolymorphismPillar();
    }

    toString() {
        return `Healing Potions: ${this.#myItems.healing_potion} \nVision Potions: ${this.#myItems.vision_potion}`
                + `\nPillars:\n\tAbstraction: ${this.#myItems.pillars.abstraction}`
                + `\n\tEncapsulation: ${this.#myItems.pillars.encapsulation}`
                + `\n\tInheritance: ${this.#myItems.pillars.inheritance}`
                + `\n\tPolymorphism: ${this.#myItems.pillars.polymorphism}`;
    }

    toJSON() {
        return {
            __type: Inventory.name,
            items: this.#myItems
        }
    }

}