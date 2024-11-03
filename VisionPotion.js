/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

const Item = require('./Item');

/**
 * Represents a vision potion item. 
 * @author Boyd Bouck
 * @version 0.1
 */
class VisionPotion extends Item {

    static NAME = 'Vision Potion';

    /**
     * Constructs a new vision potion item. 
     */
    constructor() {
        super(VisionPotion.NAME);
    }

    see(/* theDungeon */) {

    }

}

module.exports = VisionPotion;