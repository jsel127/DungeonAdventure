
import react from 'react';
import React, { useEffect } from 'react';



function HowtoPlayPage() {

  
    
        useEffect(() => {
            // Set the background color of the entire page to dark grey
            document.body.style.backgroundColor = 'black';
            document.body.style.margin = '0';  // Remove margin
            document.body.style.padding = '0'; // Remove padding
        }, []);

        const listItemStyle = {
            marginBottom: '15px'  // Adds padding between list items
        };
    
        return (
            <div >
                <h1 style={{ fontFamily: 'Garamond', color: 'maroon', textAlign: 'center', padding: 10, fontSize: '50px' }}>How to Play</h1>
            <body>
                <ol style={{ fontFamily: 'Arial', fontSize: '18px', color: 'white', padding: '`0 20px' }}>
                    <li style= {listItemStyle}> Start Your Journey: Begin by selecting a hero to navigate the dungeon. Each hero has unique abilities that can be helpful in different situations.</li>
                    <li style= {listItemStyle}>Explore the Dungeon: Move through various rooms in the dungeon, using navigation buttons (North, South, East, West) to choose your direction. Each room might contain items, monsters, or traps, so proceed with caution!</li>
                    <li style= {listItemStyle}>Collect the Pillars: Your main objective is to locate and capture the four Pillars of Object-Oriented Programming—Abstraction, Encapsulation, Inheritance, and Polymorphism. Each pillar is hidden in a different part of the dungeon, so explore thoroughly.</li>
                    <li style= {listItemStyle}>Battle Monsters: Some rooms contain monsters. When you encounter one, a battle screen will appear. Use your hero’s abilities strategically to defeat the monsters and continue your adventure.</li>
                    <li style= {listItemStyle}>Gather Helpful Items: Collect items like health potions to restore your health, or special vision potions that reveal what lies ahead. These can be vital in surviving the dungeon's challenges.</li>
                    <li style= {listItemStyle}>Avoid Deadly Traps: Watch out for pits and other traps hidden in rooms. They can damage or weaken you, so stay alert as you move.</li>
                    <li style= {listItemStyle}>Save and Resume: At any point, you can pause and save your game. This lets you return to your progress later and pick up where you left off.</li>
                    <li style= {listItemStyle}>Complete Your Quest: Once you've collected all four pillars, navigate to the exit to complete your journey and emerge victorious!</li>
                </ol>
            </body>
            <div style={imageContainerStyle}>
                <img src={`${process.env.PUBLIC_URL}/Play.gif`} style={{ width: '300px', height: '300px' }} />
            </div>
                </div>
        );
    } 
    const imageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%', // Ensures the container spans the full width to center the image
        marginTop: '20px'
    };
    

export default HowtoPlayPage;