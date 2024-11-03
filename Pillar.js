/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

const Item = require('./Item');

/**
 * Represents a pillar item. 
 * @author Boyd Bouck
 * @version 1.0
 */
class Pillar extends Item {

    /**
     * An object that stores the four types of pillars; 
     * abstraction, encapsulation, polymorphism, and inheritance. 
     */
    static PillarType = Object.freeze({
        ABSTRACTION: 'Pillar of Abstraction', 
        ENCAPSULATION: 'Pillar of Encapsulation', 
        POLYMORPHISM: 'Pillar of Polymorphism', 
        INHERITANCE: 'Pillar of Inheritance'
    });

    /**
     * Constructs a pillar item with the given pillar name. 
     * @param {*} thePillar is the name of the pillar to be created
     */
    constructor(thePillar) {
        super(thePillar);
    }

}

module.exports = Pillar;