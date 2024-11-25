import Pillar from "./Pillar";
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
        this.#myName = theName;
        this.#myHero = theHero;
    }

    getQuantityHealingPotion() {
        return this.#myQuantityHealingPotion;
    }

    getQuantityVisionPotion() {
        return this.#myQuantityVisionPotion;
    }

    getPillars() {
        return this.#myPillars.toString();
    }

    addPillar(thePillar) {
        if (!thePillar instanceof Pillar) {
            throw new TypeError("This is not a valid pillar.");
        }
        myPillars.push(thePillar);
    }

    incrementQuantityHealingPotion() {
        this.#myQuantityHealingPotion += 1;
    }

    decrementQuantityHealingPotion() {
        if (this.#myQuantityHealingPotion < 0) {
            throw new EvalError("There are no more healing potions to use.");
        }
        this.#myQuantityVisionPotion -= 1;
    }

    incrementQuantityVisionPotion() {
        this.#myQuantityVisionPotion += 1;
    }

    decrementQuantityVisionPotion() {
        if (this.#myQuantityVisionPotion < 0) {
            throw new EvalError("There are no more vision potions to use.");
        }
        this.#myQuantityVisionPotion -= 1;
    }

    toString() {
        return `${this.#myName} ${this.#myHero.toString()}`;
    }
}