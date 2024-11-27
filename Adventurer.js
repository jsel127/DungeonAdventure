import Hero from "./characters/Hero.js"
export default class Adventurer {
    #myInventory
    #myName
    #myHero
    #myFightingStatus
    constructor(theName, theHero, theFightingStatus = false) {
        if (typeof theName !== "string" || !(theHero instanceof Hero) 
            || typeof theFightingStatus !== "boolean") {
            throw new TypeError("Invalid name, hero, or fighting status provided");
        } 
        this.#myInventory = new Inventory();
        this.#myName = theName;
        this.#myHero = theHero;
        this.#myFightingStatus = theFightingStatus;
    }

    getName() {
        return this.#myName;
    }

    getInventory() {
        return this.#myInventory;
    }

    setFightingStatus(theFightingStatus) {
        if (typeof theFightingStatus !== "boolean") {
            throw new TypeError("Invalid fighting status provided.");
        }
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

    block() {
        if (this.#myFightingStatus) {
            return this.#myHero.block();
        } else {
            throw new EvalError("The adventurer is not currently fighting any monster. Blocks are not allowed.")
        }
    }

    toString() {
        return `${this.#myName} ${this.#myHero.toString()}`;
    }
}