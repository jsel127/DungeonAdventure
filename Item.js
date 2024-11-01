class Item {

    #myName;

    constructor(theName) {
        this.#myName = theName;
    }

    getName() {
        return this.#myName;
    }

}