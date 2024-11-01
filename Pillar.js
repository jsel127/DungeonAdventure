const PillarType = Object.freeze({
    ABSTRACTION, 
    ENCAPSULATION, 
    POLYMORPHISM, 
    INHERITANCE
});

class Pillar {

    #myName;

    constructor(thePillar) {
        this.#myName = thePillar;
    }

}