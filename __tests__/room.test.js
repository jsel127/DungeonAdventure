import Room from "../dungeon/Room.js";
import HealingPotion from "../items/HealingPotion.js";
import Pillar from "../items/Pillar.js";
import VisionPotion from "../items/VisionPotion.js";
describe("Tests the room class and its functionality", () => {
    test("By default the created room is empty", () => {
        const room = new Room();
        expect(room.getContent()).toBe(Room.CONTENT.empty);
    });
    test("Changing content of the room to healing potion", () => {
        const room = new Room();
        room.setContent(Room.CONTENT.healingPotion);
        expect(room.getContent() === Room.CONTENT.healingPotion);
    });

    test("Testing collectItem on healing potion", () => {
        const room = new Room();
        room.setContent(Room.CONTENT.healingPotion);
        expect(room.collectItem() instanceof HealingPotion).toBeTruthy();
    });

    test("Testing collectItem on vision potion", () => {
        const room = new Room();
        room.setContent(Room.CONTENT.visionPotion);
        expect(room.collectItem() instanceof VisionPotion).toBeTruthy();
    });
//NEED MORE SPECIFIC TEST TO SEE IF PROPER PILLAR CREATED
    test("Testing collectItem on pillar", () => {
        const room = new Room();
        room.setContent(Room.CONTENT.abstractionPillar);
        expect(room.collectItem() instanceof Pillar).toBeTruthy();
    });
    
// Other test: constructor (specify coordinate and doors), spawning monsters, 

});

describe("Tests the room class with invalid input", () => {
    test("Testing if invalid content is placed an error is thrown", () => {

    });
});