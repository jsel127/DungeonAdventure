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
class DatabaseReader {
    static #IS_INTERNAL_CONSTRUCTING = false;
    static #UNIQUE_INSTANCE = null;  
    static #DATABASE_CONNECTION;
    constructor() {
        if (!DatabaseReader.#IS_INTERNAL_CONSTRUCTING) {
            throw new TypeError("DatabaseReader is not constructable");
        }
        DatabaseReader.#IS_INTERNAL_CONSTRUCTING = false;
        DatabaseReader.#DATABASE_CONNECTION = new sqlite3.Database('./characters.db', err => {
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

    static getWarriorData() {
        let warriorData = DatabaseReader.#DATABASE_CONNECTION.get("SELECT * FROM Heroes WHERE NAME = 'Warrior'", (error, row) => {
            if (error) {
                console.error("Failed to retrieve Warrior data");
            } 
            return row;
        });
        return warriorData;
    }
}

DatabaseReader.getInstance();
console.log(DatabaseReader.getWarriorData());
//db.close();