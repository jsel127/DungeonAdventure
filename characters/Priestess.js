/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';

/**
 * Class containing common methods and data for all priestess character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Priestess extends Hero {
    static HEAL_MIN_PERCENT = 10;
    static HEAL_MAX_PERCENT = 20;
    constructor() {
        // TODO: Call super and pass in data from database.
    }

    /**
     * Defines the heal special attack for the Priestess. The priestess can heal themselves based on the amount of HP they have remaining.
     * The heal may fail if they are too low on HP.
     * @param {*} theOpponent the opponent they are fighting.
     * @returns true if they were able to heal themselves (i.e. HP was gained) and false if no HP was gained.
     */
    specialAttack(theOpponent) {
        const minHeal = Math.round(this.getHP() * HEAL_MIN_PERCENT / 100);
        const maxHeal = Math.round(this.getHP() * HEAL_MAX_PERCENT / 100);
        const rangeHeal = maxHeal - minHeal;
        const gainedHP = Math.round(Math.random() * rangeHeal);
        this.setHP(this.getHP() + gainedHP);
        if (gainedHP > 0) {
            return true;
        }
        return false;
    }
}