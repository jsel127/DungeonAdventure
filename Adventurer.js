import Pillar from "./Pillar.js";
import Hero from "./characters/Hero.js"
export default class Adventurer {
    #myQuantityHealingPotion
    #myQuantityVisionPotion
    #myPillars
    #myName
    #myHero
    constructor(theName, theHero) {
        if (typeof theName !== "string" || !(theHero instanceof Hero)) {
            throw new TypeError("Invalid name or hero provided");
        }
        this.#myQuantityHealingPotion = 0;
        this.#myQuantityVisionPotion = 0;
        this.#myPillars = [];
        this.#myName = theName;
        this.#myHero = theHero;
    }

    getName() {
        return this.#myName;
    }

    getQuantityHealingPotion() {
        return this.#myQuantityHealingPotion;
    }

    getQuantityVisionPotion() {
        return this.#myQuantityVisionPotion;
    }

    getPillars() {
        let str = '';
        for (let i = 0; i < this.#myPillars.length; i++) {
            str += this.#myPillars[i].getName() + '\n';
        }
        return str;
    }

    addPillar(thePillar) {
        if (!thePillar instanceof Pillar) {
            throw new TypeError("This is not a valid pillar.");
        }
        this.#myPillars.push(thePillar);
    }

    incrementQuantityHealingPotion() {
        this.#myQuantityHealingPotion += 1;
    }

    decrementQuantityHealingPotion() {
        if (this.#myQuantityHealingPotion <= 0) {
            throw new EvalError("There are no more healing potions to use.");
        }
        this.#myQuantityHealingPotion -= 1;
    }

    incrementQuantityVisionPotion() {
        this.#myQuantityVisionPotion += 1;
    }

    decrementQuantityVisionPotion() {
        if (this.#myQuantityVisionPotion <= 0) {
            throw new EvalError("There are no more vision potions to use.");
        }
        this.#myQuantityVisionPotion -= 1;
    }

    toString() {
        return `${this.#myName} ${this.#myHero.toString()}`;
    }
}