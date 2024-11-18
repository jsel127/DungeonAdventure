import Monster from "./Monster";
export default class MonsterFactory {
    createMonster(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChange,
                  theHealChance, theMinHeal, theMaxHeal) {
        return new Monster(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChange,
                           theHealChance, theMinHeal, theMaxHeal);
    }
}