/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';

/**
 * Class containing common methods and data for all thief character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Thief extends Hero {
    static HIT_RATE_SUPRISE_ATTACK = 40;
    static FAIL_RATE_SUPRISE_ATTACK = 20;
    static NUMBER_SUPRISE_ATTACK = 2;
    constructor() {
        // TODO: Call super and pass in data from database.
    }

    /**
     * Special attack of thief which allows it to get in extra attacks.
     * @param {*} theOpponent the opponent the character is facing.
     * @returns true if a successful attack was made and false otherwise.
     */
    specialAttack(theOpponent) {
        const randomInt = Math.round(Math.random() * 100);
        if (!this.isDead()) {
            if (randomInt < HIT_RATE_SUPRISE_ATTACK) {
                for (let i = 0; i < NUMBER_SUPRISE_ATTACK; i++) {
                    this.attack(theOpponent, true);
                }
                return true;
            } else if (randomInt > HIT_RATE_SUPRISE_ATTACK + FAIL_RATE_SUPRISE_ATTACK) {
                this.attack(theOpponent, true);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}