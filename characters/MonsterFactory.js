/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

import Monster from "./Monster";
export default class MonsterFactory {
    createMonster(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance,
                  theHealChance, theMinHeal, theMaxHeal) {
        return new Monster(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance,
                           theHealChance, theMinHeal, theMaxHeal);
    }
}