import Warrior from './Warrior';
import Priestess from './Priestess';
import Thief from './Thief';

export default class HeroFactory {
    createHero(theName, theHP, theDPMin, theDPMax,
        theAttackSpeed, theHitChange, theChanceToBlock) {
        if (theName === "Warrior") {
            return new Warrior(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChange, theChanceToBlock)
        } else if (theName === "Priestess") {
            return new Priestess(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChange, theChanceToBlock);
        } else if (theName === "Thief") {
            return new Thief(theName, theHP, theDPMin, theDPMax,
                theAttackSpeed, theHitChange, theChanceToBlock);
        } else {
            throw new UndefinedValueError("The given hero type does not exist.");
        }
    }
}