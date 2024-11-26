import Hero from "./characters/Hero.js"
export default class Adventurer {
    #myInventory
    #myName
    #myHero
    constructor(theName, theHero) {
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

    toString() {
        return `${this.#myName} ${this.#myHero.toString()}`;
    }
}