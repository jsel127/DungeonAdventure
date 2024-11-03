/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

/**
 * Class containing common methods and data for all hero character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
import DungeonCharacter from "./DungeonCharacter.js";

export default class Hero extends DungeonCharacter{
    /** The chance the hero has to block an attack */
    #myChanceToBlock
    constructor(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChange, theChanceToBlock) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChange);
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
                // TODO: Implement what happens when the character dies.
            }
            return false;
        } 
        return true;
    }
}