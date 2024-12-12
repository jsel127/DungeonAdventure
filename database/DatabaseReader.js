/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import sqlite3 from 'sqlite3';
/**
 * Queries SQL database using SQLite Node.js Querying data. Follows singleton design pattern.
 * Getter methods are asyncronous. 
 * 
 * Sources
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties 
 * https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/
 * https://www.sqlitetutorial.net/sqlite-nodejs/query/
 * https://www.codecademy.com/learn/learn-node-sqlite 
 * @author Jasmine Sellers
 * @version 1.0
 */
export default class DatabaseReader {
    /** Checks if the constructor is called from within the class. */
    static #IS_INTERNAL_CONSTRUCTING = false;
    /** Stores the single instance of the DatabaseReader. */
    static #UNIQUE_INSTANCE = null;  
    /** The database connection. */
    #myDatabaseConnection;
    /**
     * Connects to the database if called within the class. 
     */
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

    /**
     * Instanciates a single instance of the DatabaseReader and 
     * stores this in the #UNIQUE_INSTANCE field. If the unique instance
     * has already been instanciated this will be returned instead.
     * @returns the database connection.
     */
    static getInstance() {
        DatabaseReader.#IS_INTERNAL_CONSTRUCTING = true;
        if (DatabaseReader.#UNIQUE_INSTANCE === null) {
            DatabaseReader.#UNIQUE_INSTANCE = new DatabaseReader();
        }
        return DatabaseReader.#UNIQUE_INSTANCE;
    }

    /** 
     * This is an asyncronous function that will return a promise to execute
     * the query and return the data if resolved.
     */
    async #getData(theQuery) {
        return new Promise((resolve, reject) => {
            this.#myDatabaseConnection.get(theQuery, (error, row) => {
                if (error) reject(error);
                resolve(row);
            });
        });
    }

    /**
     * This is an asyncrounous function that will call the asyncrounous 
     * getData method that will run the query to the database. The result 
     * if no errors are thrown will return the ogre data.
     */
    async getOgreData() {
        let warriorData = {};
        try {
            warriorData = await this.#getData("SELECT * FROM Monsters WHERE name = 'Ogre'");
        } catch (error) {
            console.error(error);
        }
        return warriorData;    
    }

    /**
     * This is an asyncrounous function that will call the asyncrounous 
     * getData method that will run the query to the database. The result 
     * if no errors are thrown will return the ogre data.
     */
    async getGremlinData() {
        let warriorData = {};
        try {
            warriorData = await this.#getData("SELECT * FROM Monsters WHERE name = 'Gremlin'");
        } catch (error) {
            console.error(error);
        }
        return warriorData;    
    }

    /**
     * This is an asyncrounous function that will call the asyncrounous 
     * getData method that will run the query to the database. The result 
     * if no errors are thrown will return the ogre data.
     */
    async getSkeletonData() {
        let warriorData = {};
        try {
            warriorData = await this.#getData("SELECT * FROM Monsters WHERE name = 'Skeleton'");
        } catch (error) {
            console.error(error);
        }
        return warriorData;    
    }

    /** 
     * Closes the connection to the database.
     */
    close() {
        myDatabaseConnection.close();
    }
}