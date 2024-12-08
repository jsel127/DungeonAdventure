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
import { availableMemory } from 'process';

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
    const fileEasyDungeon = fs.readFileSync('easyDA.txt');
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
                    const gainedHP = easyDungeonTopLeftBottomRight.useHealingPotion();
                    adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    expect(adventurer.hero.dungeon_character.hp - preHP).toBe(gainedHP);
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
// FIX TEST
            
            describe("Using vision potion (expected to return the 9 adjacent rooms) unless no room is present in which case nulls is set", () => {
                describe("Use vision potion gives person ability to know what are in the 9 adjacent rooms (including itself) adventurer", () => {
                    const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    const result = easyDungeonTopLeftBottomRight.useVisionPotion();
                    expect(adventurer.hero.inventory.items.vision_potion).toBe(0);
                    // const currCoordinate = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo()).coordinate;
                    // console.log(currCoordinate);
                    // test("Checks if coordinates of returned rooms are correct", () => {
                    //     // for (let i = 0; i < 3; i++) {
                    //     //     for (let j = 0; j < 3; j++) {
                    //     //         const coordinate = result[i][j].getCoordinate();
                    //     //         expect(coordinate.row).toBe(currCoordinate.row - 1 + i);
                    //     //         expect(coordinate.col).toBe(currCoordinate.col - 1 + j);
                    //     //     }
                    //     // }
                    // });
                });
// FIX TEST
                test("Vision potion is not applied if vision potion if not available", () => {
                    const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                    const result = easyDungeonTopLeftBottomRight.useVisionPotion();
                    expect(adventurer.hero.inventory.items.vision_potion).toBe(0);

                    // expect(result).toBe("You have no vision potions");
                });
            });
            testNotWonYet();
        });

        describe("Process moving east (2, 3) Pit to fall in", () => {
            let priorPitAdventurerInfo = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
            testMoveWest();
            testCoordinates(2, 3);
            testContentsAfterMove(Room.CONTENT.pit);
            testInventory(0, 0, true, true, true, true);
            test("Adventurer has lost min 1HP and max 20HP for falling in pit", () => {
                const priorHP = priorPitAdventurerInfo.hero.dungeon_character.hp;
                const adventurerr = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
                const lostHP = priorHP - adventurerr.hero.dungeon_character.hp;
                expect(lostHP).toBeGreaterThan(0);
                expect(lostHP).toBeLessThan(21);
            });
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

        // describe("Navigating rest of maze of known structure top to bottom (east or west until reach edge then moves south)", () => {
        //     for (let row = 3; row < 5; row++) {
        //         if (row % 2 === 0) {
        //             for (let col = 5; col > 1; col++) {
        //                 describe(`Process moving to (${col}, ${row}) No content to process.` , () => {
        //                     
                
        //                     test("Room has been updated properly (coordinates updated)", () => {
        //                         const currRoomInfo = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo());
        //                         expect(currRoomInfo.content).toBe(Room.CONTENT.empty);                
        //                         expect(currRoomInfo.coordinate.row).toBe(row);
        //                         expect(currRoomInfo.coordinate.col).toBe(col);
        //                     });
                
        //                     test("Nothing has been added to the inventory class", () => {
        //                         const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
        //                         expect(adventurer.hero.inventory.items.healing_potion).toBe(0);
        //                         expect(adventurer.hero.inventory.items.vision_potion).toBe(0);
        //                         expect(adventurer.hero.inventory.items.pillars.abstraction).toBeTruthy();
        //                         expect(adventurer.hero.inventory.items.pillars.encapsulation).toBeTruthy();
        //                         expect(adventurer.hero.inventory.items.pillars.inheritance).toBeTruthy();
        //                         expect(adventurer.hero.inventory.items.pillars.polymorphism).toBeTruthy();
        //                     });
                
        //                     test("Has not won yet", () => {
        //                         expect(easyDungeonTopLeftBottomRight.hasWonGame()).toBeFalsy();
        //                     });
        //                 });                    
        //             }
        //         } else {
        //             for (col = 1; col < 5; col++) {
        //                 describe(`Process moving to (${col}, ${row}) No content to process.` , () => {
        //                     test("Moving east", () => {
        //                         easyDungeonTopLeftBottomRight.moveEast();
        //                         const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
        //                         expect(validMoves.north).toBeFalsy();
        //                         expect(validMoves.east).toBeTruthy();
        //                         expect(validMoves.south).toBeFalsy();
        //                         expect(validMoves.west).toBeTruthy();
        //                     });
                
        //                     test("Room has been updated properly (coordinates updated)", () => {
        //                         const currRoomInfo = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo());
        //                         expect(currRoomInfo.content).toBe(Room.CONTENT.empty);                
        //                         expect(currRoomInfo.coordinate.row).toBe(2);
        //                         expect(currRoomInfo.coordinate.col).toBe(3);
        //                     });
                
        //                     test("Nothing has been added to the inventory class", () => {
        //                         const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
        //                         expect(adventurer.hero.inventory.items.healing_potion).toBe(0);
        //                         expect(adventurer.hero.inventory.items.vision_potion).toBe(0);
        //                         expect(adventurer.hero.inventory.items.pillars.abstraction).toBeTruthy();
        //                         expect(adventurer.hero.inventory.items.pillars.encapsulation).toBeTruthy();
        //                         expect(adventurer.hero.inventory.items.pillars.inheritance).toBeTruthy();
        //                         expect(adventurer.hero.inventory.items.pillars.polymorphism).toBeTruthy();
        //                     });
                
        //                     test("Has not won yet", () => {
        //                         if (row === 5 && col === 5) {
        //                             expect(easyDungeonTopLeftBottomRight.hasWonGame()).toBeTruthy();
        //                         } else {
        //                             expect(easyDungeonTopLeftBottomRight.hasWonGame()).toBeFalsy();
        //                         }
        //                     });
        //                 });
        //             }
        //             describe(`Process moving to (${col}, ${row}) No content to process.` , () => {
        //                 test("", () => {
        //                     easyDungeonTopLeftBottomRight.moveWest();
        //                     const validMoves = easyDungeonTopLeftBottomRight.getValidMoves();
        //                     expect(validMoves.north).toBeFalsy();
        //                     expect(validMoves.east).toBeTruthy();
        //                     expect(validMoves.south).toBeFalsy();
        //                     expect(validMoves.west).toBeTruthy();
        //                 });
            
        //                 test("Room has been updated properly (coordinates updated)", () => {
        //                     const currRoomInfo = JSON.parse(easyDungeonTopLeftBottomRight.getCurrentRoomInfo());
        //                     expect(currRoomInfo.content).toBe(Room.CONTENT.empty);                
        //                     expect(currRoomInfo.coordinate.row).toBe(2);
        //                     expect(currRoomInfo.coordinate.col).toBe(3);
        //                 });
            
        //                 test("Nothing has been added to the inventory class", () => {
        //                     const adventurer = JSON.parse(easyDungeonTopLeftBottomRight.getAdventurerInfo());
        //                     expect(adventurer.hero.inventory.items.healing_potion).toBe(0);
        //                     expect(adventurer.hero.inventory.items.vision_potion).toBe(0);
        //                     expect(adventurer.hero.inventory.items.pillars.abstraction).toBeTruthy();
        //                     expect(adventurer.hero.inventory.items.pillars.encapsulation).toBeTruthy();
        //                     expect(adventurer.hero.inventory.items.pillars.inheritance).toBeTruthy();
        //                     expect(adventurer.hero.inventory.items.pillars.polymorphism).toBeTruthy();
        //                 });
            
        //                 test("Has not won yet", () => {
        //                     expect(easyDungeonTopLeftBottomRight.hasWonGame()).toBeFalsy();
        //                 });
        //             });    
        //         }
        //     }
        // });
    });
});
