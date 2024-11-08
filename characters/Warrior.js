/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';

/**
 * Class containing common methods and data for all warrior character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Warrior extends Hero {
    static HIT_RATE_CRUSHING_BLOW = 40;
    static MULTIPLIER_CRUSHING_BLOW = 2;
    constructor() {
        // TODO: Call super and pass in data from database.
    }

    specialAttack(theOpponent) {
        if (!this.isDead() && Math.random() * 100 < Warrior.HIT_RATE_CRUSHING_BLOW) {
            const rangeDP = this.getDPMax() - this.getDPMin();
            const attackDP = Warrior.MULTIPLIER_CRUSHING_BLOW * (Math.round(Math.random() * rangeDP) + this.getDPMin());
            if (attackDP < theOpponent.getHP()) {
                theOpponent.setHP(theOpponent.getHP() - attackDP);
            } else {
// NOTE FOR DEVELOPER: the opponent has died at this point
                theOpponent.setHP(0);
            }
            return true;
        }
        return false;
    }
}