/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */

/*  
    Singleton design pattern
    Sources
        * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties 
        * https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/
*/
import sqlite3 from 'sqlite3';
export default class DatabaseReader {
    static #IS_INTERNAL_CONSTRUCTING = false;
    static #UNIQUE_INSTANCE = null;  
    #myDatabaseConnection;
    constructor() {
        if (!DatabaseReader.#IS_INTERNAL_CONSTRUCTING) {
            throw new TypeError("DatabaseReader is not constructable");
        }
        DatabaseReader.#IS_INTERNAL_CONSTRUCTING = false;
        this.#myDatabaseConnection = new sqlite3.Database('./characters.db', err => {
            if (err) {
                console.error("Failed to connect to the character.db database");
            }
        });
    }

    static getInstance() {
        DatabaseReader.#IS_INTERNAL_CONSTRUCTING = true;
        if (DatabaseReader.#UNIQUE_INSTANCE === null) {
            DatabaseReader.#UNIQUE_INSTANCE = new DatabaseReader();
        }
        return DatabaseReader.#UNIQUE_INSTANCE;
    }

    getWarriorData() {
        let warriorData = this.#myDatabaseConnection.get("SELECT * FROM Heroes WHERE NAME = 'Warrior'", (error, row) => {
            if (error) {
                console.error("Failed to retrieve Warrior data");
            } 
            console.log(row);
            return row;
        });
        return warriorData;
    }

    getPriestessData() {

    }

    getThiefData() {

    }

    getOgreData() {

    }

    getGremlinData() {

    }

    getSkeletonData() {

    }
}

const db = DatabaseReader.getInstance();
console.log(db.getWarriorData());