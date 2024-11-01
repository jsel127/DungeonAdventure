class Inventory {

    static NUM_SLOTS = 6;
    
    #myInventoryItems;

    /**
     * Constructs a new Inventory object capable of holding
     * HealingPotions, VisionPotions, and Pillars. 
     */
    constructor() {
        const healingPotions = [];
        const visionPotions = [];
        this.#myInventoryItems = new Array(healingPotions, visionPotions);
    }

    /**
     * Adds the given item to the inventory. HealingPotions and VisionPotions
     * stack in the same inventory slot. Pillars are unique, and therefore
     * each go in their own inventory slot. 
     * 
     * @param {*} theItem the Item to be added to the inventory
     */
    addItem(theItem) {
        if (theItem instanceof HealingPotion) {
            this.#myInventoryItems[0].push(theItem);
        }
        else if (theItem instanceof VisionPotion) {
            this.#myInventoryItems[1].push(theItem);
        }
        else { // theItem instanceof Pillar
            this.#myInventoryItems.push(theItem);
        }
    }

    useItem(theItem) {
        if (theItem instanceof HealingPotion) {
            this.#myInventoryItems[0].pop();
            theItem.heal();
        }
        else if (theItem instanceof VisionPotion) {
            this.#myInventoryItems[1].pop();
            theItem.see();
        }
    }

    hasItem(theItem) {
        let containsItem = false;
        if (theItem instanceof HealingPotion) {
            containsItem = this.#myInventoryItems[0].length > 0;
        }
        else if (theItem instanceof VisionPotion) {
            containsItem = this.#myInventoryItems[1].length >  0;
        }
        else {
            for (let i = 2; i < NUM_SLOTS; i++) {
                if (theItem == this.#myInventoryItems[i]) {
                    containsItem = true;
                }
            }
        }
        return containsItem; 
    }

    toString() {

        str = 
        'Healing Potions: ' + 
        this.#myInventoryItems[0].length + 
        '\nVision Potions: ' + 
        this.#myInventoryItems[1].length;

        for (let i = 2; i < NUM_SLOTS; i++) {
            if (this.#myInventoryItems[i] != null) {
                str += '\n' + this.#myInventoryItems[i].toString();
            }
        }
        
        return str;
    }

}