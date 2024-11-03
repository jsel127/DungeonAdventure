class Dungeon {
    /** Multiplier to determine the size of the room given the difficulty level */
    static DIFFICULTY_MULTIPLIER = 5;
    /** Holds the information for the rooms in the dungeon. */
    #myRooms
    /** The entrance for the dungeon. */
    #myEntrance
    /** The exit for the dungeon. */
    #myExit
    constructor(theDifficulty) {
        this.#myRooms = [];
        this.makeDungeon();
    }

    makeDungeon() {
        this.generateTraversableMaze();
        this.createRooms();
    }

    /** 
     * Sets the dimensions of the maze and the access points of the maze (entrance and exit).
     */
    generateTraversableMaze() {

    }

    /**
     * Creates the rooms of the dungeon (excluding the entrance and exit)
     */
    createRooms() {

    }
}