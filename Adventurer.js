import Hero from "./characters/Hero.js"
export default class Adventurer {
    #myInventory
    #myName
    #myHero
    #myFightingStatus
    constructor(theName, theHero, theFightingStatus = false) {
        if (typeof theName !== "string" || !(theHero instanceof Hero)) {
            throw new TypeError("Invalid name or hero provided");
        }
        this.#myInventory = new Inventory();
        this.#myName = theName;
        this.#myHero = theHero;
    }

    getName() {
        return this.#myName;
    }

    getInventory() {
        return this.#myInventory;
    }

    setFightingStatus(theFightingStatus) {
        this.#myFightingStatus = theFightingStatus;
    }

    attack(theMonster) {
        if (this.#myFightingStatus) {
            return this.#myHero.attack(theMonster);
        } else {
            throw new EvalError("The adventurer is not currently fighting any monster. Attacks are not allowed.")
        }
    }

    specialAttack(theMonster) {
        if (this.#myFightingStatus) {
            return this.#myHero.specialAttack(theMonster);
        } else {
            throw new EvalError("The adventurer is not currently fighting any monster. Special Attacks are not allowed.")
        }
    }

    block(theMonster) {
        if (this.#myFightingStatus) {
            return this.#myHero.block(theMonster);
        } else {
            throw new EvalError("The adventurer is not currently fighting any monster. Blocks are not allowed.")
        }
    }

    toString() {
        return `${this.#myName} ${this.#myHero.toString()}`;
    }
}