/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Warrior from './Warrior.js';
import Priestess from './Priestess.js';
import Thief from './Thief.js';
import Hero from './Hero.js';
/**
 * Will create a specific type of Hero based on the name it is passed (e.g. Warrior). 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class HeroFactory {
    static #WARRIOR_INDEX = 0;
    static #PRIESTESS_INDEX = 1;
    static #THIEF_INDEX = 2;
    static #HERO_TYPES = [
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
    ];
    /**
     * Creates and returns a Hero of the specified type.
     * @param {*} theHeroType the type of the hero.
     * @param {*} theName the name of the hero.
     * @returns an Hero instanciated with the set values.
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
            throw new UndefinedValueError("The given hero type does not exist.");
        }
    }

    static loadHero(theHeroType, theJSON) {
        if (theHeroType === "Warrior") {
            return Warrior.fromJSON(theJSON);
        } else if (theHeroType === "Priestess") {
            return Priestess.fromJSON(theJSON);
        } else if (theHeroType === "Thief") {
            return Thief.fromJSON(theJSON)
        } else {
            throw new UndefinedValueError("The given hero type does not exist.");
        }
    }

    static getWarriorData() {
        return HeroFactory.#HERO_TYPES[HeroFactory.#WARRIOR_INDEX];
    }
    
    static getPriestessData() {
        return HeroFactory.#HERO_TYPES[HeroFactory.#PRIESTESS_INDEX];
    }

    static getThiefData() {
        return HeroFactory.#HERO_TYPES[HeroFactory.#THIEF_INDEX];
    }

    static getHeroTypes() {
        const heroTypes = [];
        HeroFactory.#HERO_TYPES.forEach(hero => heroTypes.push(hero.name));
        return heroTypes;
    }
}