/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Hero from './Hero.js';
import sqlite3 from 'sqlite3';

const characterDB = new sqlite3.Database('../characters.db');
const row = characterDB.get("SELECT * FROM Heroes WHERE NAME = 'Priestess'");
/**
 * Class containing common methods and data for all priestess character. 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class Priestess extends Hero {
    static #HEAL_MIN_PERCENT = 10;
    static #HEAL_MAX_PERCENT = 20;
    constructor(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
                theHitChance, theChanceToBlock) {
        super(theName, theHP, theDPMin, theDPMax, theAttackSpeed, 
              theHitChance, theChanceToBlock);
    }

    /**
     * Defines the heal special attack for the Priestess. The priestess can heal themselves based on the amount of HP they have remaining.
     * The heal may fail if they are too low on HP.
     * @param {*} theOpponent the opponent they are fighting.
     * @returns true if they were able to heal themselves (i.e. HP was gained) and false if no HP was gained.
     */
    specialAttack(theOpponent) {
        const minHeal = Math.round(this.getHP() * Priestess.#HEAL_MIN_PERCENT / 100);
        const maxHeal = Math.round(this.getHP() * Priestess.#HEAL_MAX_PERCENT / 100);
        const rangeHeal = maxHeal - minHeal;
        const gainedHP = Math.round(Math.random() * rangeHeal);
        this.setHP(this.getHP() + gainedHP);
        if (gainedHP > 0) {
            return true;
        }
        return false;
    }
}