/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Warrior from './Warrior.js';
import Priestess from './Priestess.js';
import Thief from './Thief.js';
/**
 * Creates a specific type of Hero based on 
 * the hero type it is passed (e.g. Warrior). 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class HeroFactory {
    /** Stores the index at which warrior is located in the data array. */
    static #WARRIOR_INDEX = 0;
    /** Stores the index at which priestess is located in the data array. */    
    static #PRIESTESS_INDEX = 1;
    /** Stores the index at which thief is located in the data array. */
    static #THIEF_INDEX = 2;
    /** The object containing the stats of the hero types.*/
    static #HERO_DATA = Object.freeze([
        {
            name: "Warrior",
            hp: 125,
            dp_min: 35,
            dp_max: 60,
            attack_speed: 4,
            hit_chance: 80,
            block_chance: 20
        },
        {
            name: "Priestess",
            hp: 75,
            dp_min: 25,
            dp_max: 45,
            attack_speed: 5,
            hit_chance: 70,
            block_chance: 30
        },
        {
            name: "Thief",
            hp: 75,
            dp_min: 20,
            dp_max: 40,
            attack_speed: 6,
            hit_chance: 80,
            block_chance: 40
        }
    ]);

    /**
     * Prevents default creation of a constructor.
     * @throws {EvalError} if the class is instanciated.
     */
    constructor() {
        throw new EvalError("This class cannot be instanciated.");
    }

    /**
     * Creates and returns a Hero of the specified type.
     * @param {string} theHeroType the type of the hero.
     * @param {string} theName the name of the hero.
     * @returns an Hero instanciated with the set values.
     * @throws {ReferenceError} if the hero type is not valid.
     */
    static createHero(theHeroType, theName) {
        if (theHeroType === "Warrior") {
            const warriorData = HeroFactory.getWarriorData();
            return new Warrior(theName, warriorData.hp, 
                               warriorData.dp_min, warriorData.dp_max, 
                               warriorData.attack_speed, warriorData.hit_chance, 
                               warriorData.block_chance);
        } else if (theHeroType === "Priestess") {
            const priestessData = HeroFactory.getPriestessData();
            return new Priestess(theName, priestessData.hp, 
                                 priestessData.dp_min, priestessData.dp_max, 
                                 priestessData.attack_speed, priestessData.hit_chance, 
                                 priestessData.block_chance);
        } else if (theHeroType === "Thief") {
            const thiefData = HeroFactory.getThiefData();
            return new Thief(theName, thiefData.hp, 
                             thiefData.dp_min, thiefData.dp_max, 
                             thiefData.attack_speed, thiefData.hit_chance, 
                             thiefData.block_chance);
        } else {
            throw new ReferenceError("The given hero type does not exist.");
        }
    }
    /**
     * Creates and returns a Hero of the specified type.
     * @param {string} theHeroType the type of the hero.
     * @param {object} theJSON an object containing information to instanciate the saved Hero.
     * @returns an Hero instanciated with the set values.
     * @throws {ReferenceError} if the hero type is not valid.
     */
    static loadHero(theJSON) {
        if (theJSON.__type === Warrior.name) {
            return Warrior.fromJSON(theJSON);
        } else if (theJSON.__type === Priestess.name) {
            return Priestess.fromJSON(theJSON);
        } else if (theJSON.__type === Thief.name) {
            return Thief.fromJSON(theJSON)
        } else {
            throw new ReferenceError("The given hero type does not exist.");
        }
    }

    /**
     * Returns an object containing the warrior's stats.
     * @returns an object containing the warrior's stats.
     */
    static getWarriorData() {
        return HeroFactory.#HERO_DATA[HeroFactory.#WARRIOR_INDEX];
    }
    
    /**
     * Returns an object containing the priestess's stats.
     * @returns an object containing the priestess's stats.
     */
    static getPriestessData() {
        return HeroFactory.#HERO_DATA[HeroFactory.#PRIESTESS_INDEX];
    }
    /**
     * Returns an object containing the thief's stats.
     * @returns an object containing the thief's stats.
     */
    static getThiefData() {
        return HeroFactory.#HERO_DATA[HeroFactory.#THIEF_INDEX];
    }

    /**
     * Returns the valid hero types to be able to create.
     * @returns an array of strings of the hero types (e.g. Warrior)
     */
    static getHeroTypes() {
        const heroTypes = [];
        HeroFactory.#HERO_DATA.forEach(hero => heroTypes.push(hero.name));
        return heroTypes;
    }
}