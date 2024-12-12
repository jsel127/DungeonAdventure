/*
 * TCSS360 Software Development and Quality Assurance
 * Fall 2024
 * Jasmine Sellers, Boyd Bouck, Simran Narwal
 */
import fs from 'fs';
import DungeonAdventure from "../DungeonAdventure.js";
import HeroFactory from "../characters/HeroFactory.js";
import Dungeon from "../dungeon/Dungeon.js";
import Room from "../dungeon/Room.js";
import MonsterFactory from '../characters/MonsterFactory.js';
/**
 * Test DungeonAdventure class which holds the main logic of the game
 * play (fighting, dungeon creations, picking adventurer, updating state etc.).
 * @author Jasmine Sellers
 * @version 1.0
 */
describe("Tests main starting functionality", () => {
    const gameWarriorEasy = new DungeonAdventure();

    test("Getting available heros", () => {
        const heroes = DungeonAdventure.getHeroes();
        expect(heroes[0]).toBe(HeroFactory.getWarriorData());
        expect(heroes[1]).toBe(HeroFactory.getPriestessData());
        expect(heroes[2]).toBe(HeroFactory.getThiefData());
    });

    test("Getting difficulty levels", () => {
        expect(DungeonAdventure.getDifficulties()).toStrictEqual(Object.keys(Dungeon.DIFFICULTY));
    });

    test("Setting difficulty", () => {
        const levels = Object.keys(Dungeon.DIFFICULTY);
        for (let i = 0; i < levels.length; i++) {
            gameWarriorEasy.setDifficulty(levels[i]);
            expect(gameWarriorEasy.getDifficulty()).toBe(Dungeon.DIFFICULTY[levels[i]]);
        }
    });

    test("Setting Hero type", () => {
        const heroes = DungeonAdventure.getHeroes();
        for (let i = 0; i < heroes.length; i++) {
            gameWarriorEasy.setAdventurer(heroes[i].name, "Bob");
            const defaultHero = HeroFactory.createHero(heroes[i].name, "Bob");
            expect(JSON.parse(gameWarriorEasy.getAdventurerInfo())).toStrictEqual(defaultHero.toJSON());
        }
    });

    describe("Starting the game", () => {
        gameWarriorEasy.setAdventurer("Warrior", "Tester");
        gameWarriorEasy.setDifficulty("Easy");
        gameWarriorEasy.startGame();

        test("Check current room is the entrance", () => {
            const currentRoom = JSON.parse(gameWarriorEasy.getCurrentRoomInfo());
            expect(currentRoom.__type === Room.name).toBeTruthy();
            expect(currentRoom.content).toBe(Room.CONTENT.entrance);
        });

        test("Check status of game is now started", () => {
            expect(gameWarriorEasy.getStartStatus()).toBeTruthy();
        });
    });

    test("Get difficulty to return an the proper difficulty", () => {
        expect(gameWarriorEasy.getDifficulty()).toBe(Dungeon.DIFFICULTY.Easy);
    });
});

describe("Tests Saves and Loads DungeonAdventure class", () => {
    test("Saves and Loads DungeonAdventure properly (No chances made from initialization)", () => {
        const dungeonAdventureToSave = new DungeonAdventure();
        dungeonAdventureToSave.setDifficulty("Easy");
        dungeonAdventureToSave.setAdventurer("Warrior", "Jasmine");
        dungeonAdventureToSave.startGame();

        const dungeonAdventureFromSave = DungeonAdventure.fromJSON(JSON.parse(JSON.stringify(dungeonAdventureToSave)));
        expect(dungeonAdventureFromSave.toJSON()).toStrictEqual(dungeonAdventureToSave.toJSON());
    });

    test("Save and Load on invalid data", () => {
        expect(() => DungeonAdventure.fromJSON({x:1, y:2, z:3})).toThrow(TypeError);
    });
});


describe("Tests DungeonAdventure on 5x5 Dungeon where move straight until you reach a wall then move down (top [entrance] to bottom [exit])", () => {
    const fileEasyDungeon = fs.readFileSync('__tests__/test_files/easyDA.txt');
    const easyDungeonTopLeftBottomRight = DungeonAdventure.fromJSON(JSON.parse(fileEasyDungeon.toString().trim()));
    function testMoveWest() {
        test("Moving west", () => {
            easyDungeonTopLeftBottomRight.moveWest();
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeFalsy();
            expect(validMoves.east).toBeTruthy();
            expect(validMoves.south).toBeFalsy();
            expect(validMoves.west).toBeTruthy();
        });
    }

    function testMoveWestEdge() {
        test("Moving west", () => {
            easyDungeonTopLeftBottomRight.moveWest();
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeFalsy();
            expect(validMoves.east).toBeTruthy();
            expect(validMoves.south).toBeTruthy();
            expect(validMoves.west).toBeFalsy();
        });
    }

    function testMoveSouthEastEdge() {
        test("Moving south", () => {
            easyDungeonTopLeftBottomRight.moveSouth();
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeTruthy();
            expect(validMoves.east).toBeFalsy();
            expect(validMoves.south).toBeFalsy();
            expect(validMoves.west).toBeTruthy();
        });
    }

    function testMoveSouthWestEdge() {
        test("Moving south", () => {
            easyDungeonTopLeftBottomRight.moveSouth();
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeTruthy();
            expect(validMoves.east).toBeTruthy();
            expect(validMoves.south).toBeFalsy();
            expect(validMoves.west).toBeFalsy();
        });
    }

    function testMoveEast() {
        test("Moving east", () => {
            easyDungeonTopLeftBottomRight.moveEast();
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeFalsy();
            expect(validMoves.east).toBeTruthy();
            expect(validMoves.south).toBeFalsy();
            expect(validMoves.west).toBeTruthy();
        });
    }

    function testMoveEastEdge() {
        test("Moving east", () => {
            easyDungeonTopLeftBottomRight.moveEast();
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeFalsy();
            expect(validMoves.east).toBeFalsy();
            expect(validMoves.south).toBeTruthy();
            expect(validMoves.west).toBeTruthy();
        });
    }

    function testCoordinates(theExpectedRow, theExpectedCol) {
        test("Room has coordinates updated", () => {
            const currRoomInfo = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo());
            expect(currRoomInfo.coordinate.row).toBe(theExpectedRow);
            expect(currRoomInfo.coordinate.col).toBe(theExpectedCol);
        });
    }

    function testContentsAfterMove(theExpectedContents) {
        test("Room has contents updated appropriately.", () => {
            const currRoomInfo = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo());
            expect(currRoomInfo.content).toBe(theExpectedContents);
        });
    }

    function testNotWonYet() {
        test("Has not won yet", () => {
            expect(easyDungeonTopLeftBottomRight.hasWonGame()).toBeFalsy();
        });
    }

    function testInventory(theHealingPotion, theVisionPotion, theAbstraction, theEncapsulation,
                           theInheritance, thePolymorphism) {
        test("The expected inventory", () => {
            const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
            expect(adventurer.hero.inventory.items.healing_potion).toBe(theHealingPotion);
            expect(adventurer.hero.inventory.items.vision_potion).toBe(theVisionPotion);
            expect(adventurer.hero.inventory.items.pillars.abstraction).toBe(theAbstraction);
            expect(adventurer.hero.inventory.items.pillars.encapsulation).toBe(theEncapsulation);
            expect(adventurer.hero.inventory.items.pillars.inheritance).toBe(theInheritance);
            expect(adventurer.hero.inventory.items.pillars.polymorphism).toBe(thePolymorphism);
        });
    }

    describe("Traverse maze until reach end of maze. Check functionality of DungeonAdventure navigation and parsing move (e.g. picking up items).", () => {
        test("Get valid starting moves", () => {
            const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
            expect(validMoves.north).toBeFalsy();
            expect(validMoves.east).toBeTruthy();
            expect(validMoves.south).toBeFalsy();
            expect(validMoves.west).toBeFalsy();
        });
        describe("Process moving east (1,2) Abstraction Pillar to pick up", () => {
            testMoveEast();
            testCoordinates(1,2);
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 0, true, false, false, false);
            testNotWonYet();
        });

        describe("Process moving east (1,3) Encapsulation Pillar to pick up", () => {
            testMoveEast();
            testCoordinates(1,3)
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 0, true, true, false, false);
            testNotWonYet();
        });

        describe("Process moving east (1,4) Inheritance Pillar to pick up", () => {
            testMoveEast();
            testCoordinates(1,4)
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 0, true, true, true, false);
            testNotWonYet();
        });

        describe("Process moving east (1,5) Polymorphism Pillar to pick up", () => {
            testMoveEastEdge();
            testCoordinates(1, 5);
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 0, true, true, true, true);
            testNotWonYet();
        });

        describe("Process moving east (2,5) Healing Potion to pick up", () => {
            testMoveSouthEastEdge();
            testCoordinates(2, 5);
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(1, 0, true, true, true, true);
            testNotWonYet();
            
            describe("Using healing potion (expected to add 10 HP)", () => {
                test("Use healing potion adds 10HP to adventurer", () => {
                    let adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    const preHP = adventurer.hero.dungeon_character.hp;
                    const returnedMessage = easyDungeonTopLeftBottomRight.useHealingPotion();
                    adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    const postHP = adventurer.hero.dungeon_character.hp;
                    expect(returnedMessage).toBe(`You used a healing potion and gained ${postHP - preHP} HP.`);
                    expect(postHP - preHP).toBe(10);
                    expect(adventurer.hero.inventory.items.healing_potion).toBe(0);
                });
        
                test("Healing potion is not applied if healing potion if not available", () => {
                    let adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    const preHP = adventurer.hero.dungeon_character.hp;
                    const result = easyDungeonTopLeftBottomRight.useHealingPotion();
                    adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    expect(result).toBe("You have no healing potions");
                    expect(adventurer.hero.dungeon_character.hp).toBe(preHP);
                    expect(adventurer.hero.inventory.items.healing_potion).toBe(0);
                });
            });
        });
    
        describe("Process moving east (2,4) Vision Potion to pick up", () => {
            testMoveWest();
            testCoordinates(2, 4);
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 1, true, true, true, true);            
            testNotWonYet();
            test("Use Vision Potion and should return 8 adjacent rooms including itself", () => {
                const adjacentRooms = JSON.parse(easyDungeonTopLeftBottomRight.useVisionPotion());
                const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                const currentCoordinate = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo()).coordinate;
                expect(adventurer.hero.inventory.items.vision_potion).toBe(0);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const room = Room.fromJSON(adjacentRooms[i][j]);
                        const coordinate = room.getCoordinate();
                        expect(coordinate.getRow()).toBe(currentCoordinate.row - 1 + i);
                        expect(coordinate.getCol()).toBe(currentCoordinate.col - 1 + j);
                        if (i === 1 && j === 0) {
                            expect(room.getContent()).toBe(Room.CONTENT.pit);
                        } else {
                            expect(room.getContent()).toBe(Room.CONTENT.empty);
                        }
                    }
                }
            });
        });

        describe("Process moving east (2, 3) Pit to fall in", () => {
            let priorPitAdventurerInfo;
            beforeAll(() => {
                priorPitAdventurerInfo = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
            });
            testMoveWest();
            test("Adventurer has lost min 1HP and max 20HP for falling in pit", () => {
                const priorHP = priorPitAdventurerInfo.hero.dungeon_character.hp;
                priorPitAdventurerInfo = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                const lostHP = priorHP - priorPitAdventurerInfo.hero.dungeon_character.hp;
                expect(lostHP).toBeGreaterThanOrEqual(0);
                expect(lostHP).toBeLessThan(11);
            });
            testCoordinates(2, 3);
            testContentsAfterMove(Room.CONTENT.pit);
            testInventory(0, 0, true, true, true, true);
            testNotWonYet();
        });
        
        describe(`Process moving to (2, 2) No content to process.` , () => {
            testMoveWest();
            testCoordinates(2, 2);
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 0, true, true, true, true);
            testNotWonYet();
        });

        describe(`Process moving to (2, 1) No content to process.` , () => {
            testMoveWestEdge();
            testCoordinates(2, 1);
            testContentsAfterMove(Room.CONTENT.empty);
            testInventory(0, 0, true, true, true, true);
            testNotWonYet();
        });
        
        describe("Navigating rest of maze of known structure top to bottom (east or west until reach edge then moves south)", () => {
            for (let row = 3; row <= 5; row++) {
                if (row % 2 === 0) {
                    describe(`Process moving to (${row}, 5) No content to process.`, () => {
                        testMoveSouthEastEdge();
                        testCoordinates(row, 5);
                        testContentsAfterMove(Room.CONTENT.empty);
                        testInventory(0, 0, true, true, true, true);
                        testNotWonYet();
                    })
                    for (let col = 4; col > 1; col--) {
                        describe(`Process moving to (${row}, ${col}) No content to process.`, () => {
                            testMoveWest();
                            testCoordinates(row, col);
                            testContentsAfterMove(Room.CONTENT.empty);
                            testInventory(0, 0, true, true, true, true);
                            testNotWonYet();
                        });
                    } 
                    describe(`Process moving to (${row}, 1) No content to process.`, () => {
                        testMoveWestEdge();
                        testCoordinates(row, 1);
                        testContentsAfterMove(Room.CONTENT.empty);
                        testInventory(0, 0, true, true, true, true);
                        testNotWonYet();
                    });
                } else {
                    describe(`Process moving to (${row}, 1) No content to process.`, () => {
                        testMoveSouthWestEdge();
                        testCoordinates(row, 1);
                        testContentsAfterMove(Room.CONTENT.empty);
                        testInventory(0, 0, true, true, true, true);
                        testNotWonYet();
                    })
                    for (let col = 2; col < 5; col++) {
                        describe(`Process moving to (${row}, ${col}) No content to process.`, () => {
                            testMoveEast();
                            testCoordinates(row, col);
                            testContentsAfterMove(Room.CONTENT.empty);
                            testInventory(0, 0, true, true, true, true);
                            testNotWonYet();
                        });
                    } 
                    describe(`Process moving to (${row}, ${5}) No content to process.`, () => {
                        if (row !== 5) {
                            testMoveEastEdge();
                            testNotWonYet();
                        } else {
                            test("Tests valid moves in bottom right corner.", () => {
                                easyDungeonTopLeftBottomRight.moveEast();
                                const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
                                expect(validMoves.north).toBeFalsy();
                                expect(validMoves.east).toBeFalsy();
                                expect(validMoves.south).toBeFalsy();
                                expect(validMoves.west).toBeTruthy();
                            });
                            testContentsAfterMove(Room.CONTENT.exit);
                            test("Has reached the exit with all pillars (has won)", () => {
                                expect(easyDungeonTopLeftBottomRight.hasWonGame()).toBeTruthy();
                            });
                        }
                        testCoordinates(row, 5);
                        testInventory(0, 0, true, true, true, true);
                    });
                }
            }
        });
    });
});

describe("Testing spawning monster and processing monster (HP: 1250, DPMin&Max: 400, HitChance: 100, BlockChance: 0, AttackSpeed: 1)" 
    + "ensure adventurer wins all fights)", () => {
    const fileEasyMonsterDungeon = fs.readFileSync('__tests__/test_files/easyDAMonstersAdventurerHighHP.txt');
    const easyMonsterDungeonTopLeftBottomRight = DungeonAdventure.fromJSON(JSON.parse(fileEasyMonsterDungeon.toString().trim()));
    test("Checks if adventure is fighting when not", () => {
        expect(easyMonsterDungeonTopLeftBottomRight.isAdventurerFighting()).toBeFalsy();
    });

    test("Get valid starting moves", () => {
        const validMoves = easyMonsterDungeonTopLeftBottomRight.getValidMoves();
        expect(validMoves.north).toBeFalsy();
        expect(validMoves.east).toBeTruthy();
        expect(validMoves.south).toBeFalsy();
        expect(validMoves.west).toBeFalsy();
    });

    test("Collect all pillars", () => {
        for (let moves = 0; moves < 4; moves++) {
            easyMonsterDungeonTopLeftBottomRight.moveEast();
        }
        const adventurer = JSON.parse(easyMonsterDungeonTopLeftBottomRight.getAdventurerInfo());
        expect(adventurer.hero.inventory.items.healing_potion).toBe(0);
        expect(adventurer.hero.inventory.items.vision_potion).toBe(0);
        expect(adventurer.hero.inventory.items.pillars.abstraction).toBeTruthy();
        expect(adventurer.hero.inventory.items.pillars.encapsulation).toBeTruthy();
        expect(adventurer.hero.inventory.items.pillars.inheritance).toBeTruthy();
        expect(adventurer.hero.inventory.items.pillars.polymorphism).toBeTruthy();       
    });

    describe("Process fighting ogre", () => {
        //"adventurer":{"__type":"Warrior","hero":{"dungeon_character":{"name":"Jasmine","hp":1250,"dp_min":400,"dp_max":400,"attack_speed":1,"hit_chance":100},"block_chance": 0
        test("Correct monster has been set as the opponent", () => {
            easyMonsterDungeonTopLeftBottomRight.moveSouth();
            const opponent = easyMonsterDungeonTopLeftBottomRight.getOpponentInfo();
            expect(opponent).toBe(JSON.stringify(MonsterFactory.createMonster("Ogre")));
        });

        // test("Fighting status has been changed", () => {
        //     expect(easyMonsterDungeonTopLeftBottomRight.isAdventurerFighting()).toBeTruthy();
        // });
        
        // test("Attack is carried out", () => {
        //     easyMonsterDungeonTopLeftBottomRight.attackOpponent();
        //     expect(easyMonsterDungeonTopLeftBottomRight.isOpponentDead()).toBeTruthy();
        //     expect(easyMonsterDungeonTopLeftBottomRight.isAdventurerFighting()).toBeFalsy();
        // });
    });

    describe("Process fighting gremlin", () => {
        //"adventurer":{"__type":"Warrior","hero":{"dungeon_character":{"name":"Jasmine","hp":1250,"dp_min":400,"dp_max":400,"attack_speed":1,"hit_chance":100},"block_chance": 0
        test("Correct monster has been set as the opponent", () => {
            easyMonsterDungeonTopLeftBottomRight.moveWest();
            const opponent = easyMonsterDungeonTopLeftBottomRight.getOpponentInfo();
            expect(opponent).toBe(JSON.stringify(MonsterFactory.createMonster("Gremlin")));
        });
    });

    describe("Process fighting skeleton", () => {
        //"adventurer":{"__type":"Warrior","hero":{"dungeon_character":{"name":"Jasmine","hp":1250,"dp_min":400,"dp_max":400,"attack_speed":1,"hit_chance":100},"block_chance": 0
        test("Correct monster has been set as the opponent", () => {
            easyMonsterDungeonTopLeftBottomRight.moveWest();
            const opponent = easyMonsterDungeonTopLeftBottomRight.getOpponentInfo();
            expect(opponent).toBe(JSON.stringify(MonsterFactory.createMonster("Skeleton")));
        });
    });
});