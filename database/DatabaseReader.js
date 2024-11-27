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
        * https://www.sqlitetutorial.net/sqlite-nodejs/query/
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
        this.#myDatabaseConnection = new sqlite3.Database('./database/characters.db', err => {
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

    #getData(theQuery) {
        // TODO: need to research async, await, and promises this seems to be the way to get data. https://www.sqlitetutorial.net/sqlite-nodejs/query/
    }

    getWarriorData() {
        return this.#getData("SELECT * FROM Heroes WHERE name = 'Warrior'");
    }

    getPriestessData() {
        return this.#getData("SELECT * FROM Heroes WHERE name = 'Warrior'");

    }

    getThiefData() {
        return this.#getData("SELECT * FROM Heroes WHERE name = 'Warrior'");

    }

    getOgreData() {
        return this.#getData("SELECT * FROM Monsters WHERE name = 'Ogre'");
    }

    getGremlinData() {
        return this.#getData("SELECT * FROM Monsters WHERE name = 'Gremlin'");
    }

    getSkeletonData() {
        return this.#getData("SELECT * FROM Monsters WHERE name = 'Skeleton'");
    }
}