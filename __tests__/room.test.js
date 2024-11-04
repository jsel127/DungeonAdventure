const Room = require('../room');

describe('Room Class', () => {
    let room;

    beforeEach(() => {
        // Create a new instance of the Room class before each test
        room = new Room();
        // Mock the randomPercent and randomRange methods
        jest.spyOn(room, 'randomPercent').mockReturnValue(false); // Always returns false for potions and pits
        jest.spyOn(room, 'randomRange').mockReturnValue(0); // Mocking to return a fixed range
    });

    test('test a new room', () => {
        expect(room.exit).toBe(false);              // Exit is false
        expect(room.entrance).toBe(false);          // Entrance is false
        expect(room.pillar).toBe(null);             // Pillar is null
        expect(room.doorNorth).toBe(true);          // Doors NSWE exist
        expect(room.doorSouth).toBe(true);
        expect(room.doorEast).toBe(true);
        expect(room.doorWest).toBe(true);
        expect(room.hasPit).toBe(false);            // Room contains no pit
        expect(room.hasHealingPotion).toBe(false);  // Room contains no healing potion
        expect(room.hasVisionPotion).toBe(false);   // Room contains no vision potion
        expect(room.pitPoints).toBe(0);             // Pit points set to zero
        expect(room.healingPoints).toBe(0);         // Healing points set to zero
    });

    test('should correctly display room with entrance', () => {
        room.isEntrance();                          // Set room to entrance
        const expectedRoomString = `*-*\n|i|\n*-*`; // Expected output
        expect(room.toString()).toBe(expectedRoomString);
    });

    test('should correctly display room with exit', () => {
        room.isExit();                              // Set room to exit
        const expectedRoomString = `*-*\n|O|\n*-*`; // Expected output
        expect(room.toString()).toBe(expectedRoomString);
    });


   test('should correctly display room without anything', () => {
        const expectedRoomString = `*-*\n| |\n*-*`; // Expected string representation for empty room
        expect(room.toString()).toBe(expectedRoomString); // Check if output matches
    });

    test('should correctly display healing potion', () => {
        room.hasHealingPotion = true;               // Set room to have healing potion
        room.healingPoints = 10;                     // Set some healing points (correct property name)
        const expectedRoomString = '*-*\n|H|\n*-*';  // Expected output
        expect(room.toString()).toBe(expectedRoomString);
    });

    test('should correctly display vision potion', () => {
        room.hasVisionPotion = true;                 // Set room to have vision potion 
        const expectedRoomString = '*-*\n|V|\n*-*';  // Expected output
        expect(room.toString()).toBe(expectedRoomString);
    });

    test('should correctly display pit', () => {
        room.hasPit = true;                          // Set room to have a pit
        room.pitPoints = 10;                         // Set some pit points
        const expectedRoomString = '*-*\n|X|\n*-*';  // Expected output
        expect(room.toString()).toBe(expectedRoomString);
    });

    test('should clear the room when a pillar is set', () => {
        room.setPillar('A');                         // Set pillar A
        expect(room.pillar).toBe('A');               // Check for pillar
        room.setPillar('E');                         // Set another pillar
        expect(room.pillar).toBe('E');               // Check for correct pillar
    });

    test('should not allow both entrance and exit', () => {
        room.isEntrance(); // Set room to entrance
        expect(room.entrance).toBe(true);
        
        room.isExit(); // Attempt to set room to exit
        expect(room.exit).toBe(false); // Ensure exit is still false
    });

    test('should clear room contents', () => {
        room.hasPit = true;
        room.pitPoints = 10;
        room.hasHealingPotion = true;
        room.healingPoints = 5;
    
        room.clearRoom();                             //Should clear all the room contents - reset points
    
        expect(room.hasPit).toBe(false);
        expect(room.pitPoints).toBe(0);
        expect(room.hasHealingPotion).toBe(false);
        expect(room.healingPoints).toBe(0);
    });

});
