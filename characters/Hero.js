/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import DungeonCharacter from "./DungeonCharacter.js";

/**
 * Class containing common methods and data for all hero character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Hero extends DungeonCharacter{
    /** The chance the hero has to block an attack */
    #myChanceToBlock
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChance, theChanceToBlock) {       
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance);
        if (this.constructor === Hero) {
            throw new TypeError("Hero cannot be instanciated directly.");
        }
        if (theChanceToBlock < 0 || theChanceToBlock > 100 ) {
            throw new RangeError("The Block Chance is not within the valid range [0,100].");
        }     
        this.#myChanceToBlock = theChanceToBlock;
    }

    /**
     * Determines if the hero successfully blocked an attack. The success is random based on the 
     * chance to block of the hero. If the attack is successfully block no damange will be take
     * else the damage will be applied and the hero may die. 
     * @param {*} theDPAttack the damage points the hero can potentially incure from the attack if the block was unsuccessful.
     * @return true if the attack was successfully blocked and false otherwise.
     */
    block(theDPAttack) {
        if (Math.random() < this.#myChanceToBlock/100) {
            const newHP = this.getHP() - theDPAttack;
            if (newHP > 0) {
                this.setHP(newHP);
            } else {
// NOTE FOR DEVELOPER: the opponent has died at this point
                this.setHP(0);
            }
            return false;
        } 
        return true;
    }
    
    toString() {
        return super.toString() + ` ${this.#myChanceToBlock}`
    }

    /**
     * Special attack specific to the Heroes.
     */
    specialAttack(theOpponent) {
        throw new Error("specialAttack() Must be implemented by derived class");
    }
}
