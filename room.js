class Room {
    constructor(){
        this.exit = false;          //Only one room can have an exit
        this.entrance = false;      //Only one room can have an entrance
        this.pillar = null;         //Pillar to be assigned

        //Doors are present (N,S,W,E)
        this.doorNorth = true;      
        this.doorSouth = true;
        this.doorEast = true;
        this.doorWest = true;

        this.hasPit = false;
        this.pitPoints = 0;
        this.hasHealingPotion = false;
        this.healingPoints = 0;
        this.hasVisionPotion = false;

        this.setContents();
    }

        setContents() {
            // Chance of room having a pit is 0.1%
            this.hasPit = this.randomPercent(0.1);                             
            this.pitPoints = this.hasPit ? this.randomRange(1, 20) : 0;
    
            // Chance of room having a healing potion is 0.1%
            this.hasHealingPotion = this.randomPercent(0.1);
            this.healingPoints = this.hasHealingPotion ? this.randomRange(5, 15) : 0;
    
            // Chance of room having vision potion is 0.1%
            this.hasVisionPotion = this.randomPercent(0.1);
    }
    
    //function created to generate a random chance
    randomPercent(chance) {
        return Math.random() < chance;
    }

    //function created to choose a random range, when provided
    randomRange(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Clears all contents within room when entrance is true
    isEntrance(){
        this.clearRoom();
        this.entrance = true;
        this.exit = false;
    }

    //Clears all contents within room when exit is true
    isExit(){
        this.clearRoom();
        if(!this.entrance) {
        this.exit = true; 
        }
    }

    //clears room for pillar 
    setPillar(pillar) {
        this.clearRoom();
        this.pillar = pillar;
    }

    //Clears the room of all contents and resets value of points to 0 
    clearRoom(){
        this.hasHealingPotion = false;
        this.hasVisionPotion = false;
        this.hasPit = false;
        this.pillar = null;
        this.healingPoints = 0;
        this.pitPoints = 0;
    }

    //Represents the room as a string
    toString() {
        let representation = '';


        // Room Boundry (North - Top)
        representation += this.doorNorth ? "*-*" : "***";
        representation += '\n';

        //Wall - (West)
        representation += '|';
        

        if(this.entrance){
            representation += 'i';                  //Entrance is represented by i
        } else if(this.exit) {
            representation += 'O';                  //Exit is represented by O
        } else if (this.hasPit) {
            representation += 'X';                  //If room has pit, represented by X
        } else if (this.pillar) {
            representation += this.pillar;          //If room has pillar, room can be set with any letter (A,E,I,P)
        } else if (this.hasHealingPotion) {
            representation += 'H';                  //If room has healing potion, represented by H
        } else if (this.hasVisionPotion) {
            representation += 'V';                  //If room has vision potion, represented by V 
        } else {
            representation += ' ';                  //If room is empty, represented by space
        }

        //Wall - (East)
        representation += '|';
        representation += '\n';

        // Room Boundry (South - Bottom)
        representation += this.doorSouth ? '*-*' : '***';

        return representation;
    }    
}
module.exports = Room; // This allows the Room class to be imported in other files

