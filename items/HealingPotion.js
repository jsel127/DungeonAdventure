/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Item from './Item.js';

/**
 * Represents a healing potion item. 
 * @author Boyd Bouck
 * @version 1.0
 */
export default class HealingPotion extends Item {

    static #NAME = 'Healing Potion';

    static #MIN_HEAL = 25;
    static #MAX_HEAL = 50;

    /**
     * Constructs a new healing potion item. 
     */
    constructor() {
        super(HealingPotion.NAME);
    }

    /**
     * Increases the hit points of the given Hero by a random amount between
     * MIN_HEAL and MAX_HEAL. This method is called when the healing potion is used. 
     * 
     * @param {*} theHero the Hero character to be healed by the healing potion
     */
    heal(theHero) {
        let hpHealed = MIN_HEAL + Math.round(Math.random() * (MAX_HEAL - MIN_HEAL));
        theHero.setHP(theHero.getHP() + hpHealed);
    }
}