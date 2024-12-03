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

    async #getData(theQuery) {
        return new Promise((resolve, reject) => {
            this.#myDatabaseConnection.get(theQuery, (error, row) => {
                if (error) reject(error);
                resolve(row);
            });
        });
    }
    
    async getOgreData() {
        let warriorData = {};
        try {
            warriorData = await this.#getData("SELECT * FROM Heroes WHERE name = 'Warrior'");
        } catch (error) {
            console.error(error);
        }
        return warriorData;    
    }

    async getGremlinData() {
        let warriorData = {};
        try {
            warriorData = await this.#getData("SELECT * FROM Monsters WHERE name = 'Gremlin'");
        } catch (error) {
            console.error(error);
        }
        return warriorData;    
    }

    async getSkeletonData() {
        let warriorData = {};
        try {
            warriorData = await this.#getData("SELECT * FROM Monsters WHERE name = 'Skeleton'");
        } catch (error) {
            console.error(error);
        }
        return warriorData;    
    }
}