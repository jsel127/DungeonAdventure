/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import sqlite3 from 'sqlite3';

/**
 * Creates a database of character stats. The database consists of two
 * tables (Monsters and Heroes). 
 * @author Jasmine Sellers
 * @version 1.0
 */
const characterDB = new sqlite3.Database('./database/characters.db', (err) => {
    if (err) {
        console.error("Database creation connection failed \n");
    } else {
        console.log("Created database successfuly \n");
    }
});

/**
 * Creates the tables 'Heroes' and 'Monsters' in the characters.db database.
 */
function createTables() {
    const createMonsterTableQuery = "CREATE TABLE IF NOT EXISTS Monsters ("+
                                    "name TEXT NOT NULL UNIQUE, " + 
                                    "hp INTEGER NOT NULL, " + 
                                    "dp_min INTEGER NOT NULL, " + 
                                    "dp_max INTEGER NOT NULL, " + 
                                    "attack_speed INTEGER NOT NULL, " + 
                                    "hit_chance INTEGER NOT NULL, " +
                                    "heal_chance INTEGER NOT NULL, " +
                                    "min_heal INTEGER NOT NULL, " +
                                    "max_heal INTEGER NOT NULL)";
    const createHeroTableQuery = "CREATE TABLE IF NOT EXISTS Heroes ("+
                                 "name TEXT NOT NULL UNIQUE, " + 
                                 "hp INTEGER NOT NULL, " + 
                                 "dp_min INTEGER NOT NULL, " + 
                                 "dp_max INTEGER NOT NULL, " + 
                                 "attack_speed INTEGER NOT NULL, " + 
                                 "hit_chance INTEGER NOT NULL, " + 
                                 "block_chance INTEGER NOT NULL)";
    characterDB.run(createMonsterTableQuery, (err) => {
        if (err) {
            console.error("Error creating Monsters table \n");
        } else {
            console.log("Created Monster table successfully \n");
        }
    });
    characterDB.run(createHeroTableQuery, (err) => {
        if (err) {
            console.error("Error creating Heroes table \n");
        } else {
            console.log("Created Heroes table successfully \n");
        }
    });
}

/**
 * Inserts monster data in the 'Monsters' table.
 */
function insertMonsters() {
    // Monsters
    const ogreQuery = createMonsterInsertStatement("'Ogre'", 200, 30, 60, 2, 60, 10, 30, 60);
    const gremlinQuery = createMonsterInsertStatement("'Gremlin'", 70, 15, 30, 5, 80, 40, 20, 40);
    const skeletonQuery = createMonsterInsertStatement("'Skeleton'", 100, 30, 50, 3, 80, 30, 30, 50);
    const monsterInsertStatement = [ogreQuery, gremlinQuery, skeletonQuery];
    runStatements(monsterInsertStatement);
}
/**
 * Creates an insert statement that will insert into the Monster table given the relavent data.
 * @param {*} theName the name of the monster character
 * @param {*} theHP the health points of the monster character
 * @param {*} theDPMin the min damage points of the monster character
 * @param {*} theDPMax the max damage points of the monster character
 * @param {*} theAttackSpeed the attack speed of the monster character
 * @param {*} theHitChange the hit change of the monster character
 * @returns 
 */
function createMonsterInsertStatement(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance, theHealChance, theMinHeal, theMaxHeal) {
    return `INSERT INTO Monsters (name, hp, dp_min, dp_max, attack_speed, hit_chance, heal_chance, min_heal, max_heal) ` +
            `VALUES (${theName}, ${theHP}, ${theDPMin}, ${theDPMax}, ${theAttackSpeed}, ${theHitChance}, ${theHealChance}, ${theMinHeal}, ${theMaxHeal})`;
}

/**
 * Inserts hero data into the 'Hero' table.
 */
function insertHeroes() {
    // Heroes
    const warriorQuery = createHeroInsertStatement("'Warrior'", 125, 35, 60, 4, 80, 20);
    const priestessQuery = createHeroInsertStatement("'Priestess'", 75, 25, 45, 5, 70, 30);
    const thiefQuery = createHeroInsertStatement("'Thief'", 75, 20, 40, 6, 80, 40);
    const heroInsertStatement = [warriorQuery, priestessQuery, thiefQuery];
    runStatements(heroInsertStatement);
}

/**
 * Creates an insert statement that will insert into the Monster table given the relavent data.
 * @param {*} theName the name of the hero character
 * @param {*} theHP the health points of the hero character
 * @param {*} theDPMin the min damage points of the hero character
 * @param {*} theDPMax the max damage points of the hero character
 * @param {*} theAttackSpeed the attack speed of the hero character
 * @param {*} theHitChange the hit change of the hero character
 * @returns 
 */
function createHeroInsertStatement(theName, theHP, theDPMin, theDPMax, theAttackSpeed, theHitChance, theBlockChance) {
    return `INSERT INTO Heroes (name, hp, dp_min, dp_max, attack_speed, hit_chance, block_chance) ` +
            `VALUES (${theName}, ${theHP}, ${theDPMin}, ${theDPMax}, ${theAttackSpeed}, ${theHitChance}, ${theBlockChance})`;
}

/**
 * Given an array of statements it will run the statements on the database.
 * @param {*} theStatements the list of statements to run on the database.
 */
function runStatements(theStatements) {
    if (theStatements) {
        for (let i = 0; i < theStatements.length; i++) {
            characterDB.run(theStatements[i], (err) => {
                if (err) {
                    console.error("Failed runStatements on " + theStatements[i]);
                } else {
                    console.log("Successfully inserted: " + theStatements[i]);
                }
            });
        }
    }
}

/**
 * Creates the database using the serialize method (ensures functions are processed in proper order).
 */
function createDatabase() {
    characterDB.serialize(() => {
        createTables();
        insertMonsters();
        insertHeroes();
        characterDB.close();
    });
}

createDatabase();
