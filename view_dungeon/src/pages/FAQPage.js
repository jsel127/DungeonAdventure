import react from 'react';
import React, { useEffect } from 'react';


function FAQPage() {
    useEffect(() => {
        // Set the background color of the entire page to dark grey
        document.body.style.backgroundColor = 'black';
        document.body.style.margin = '0';  // Remove margin
        document.body.style.padding = '0'; // Remove padding
    }, []);

    const listItemStyle = {
        marginBottom: '30px'  // Adds padding between list items
    };

    const redTextStyle = {
        color: 'pink',
        fontWeight: 'bold'
        
    };

    return (
        <div >
            {/*heading style*/}
            <h1 style={{ fontFamily: 'Garamond', color: 'maroon', textAlign: 'center', padding: 10, fontSize: '50px' }}>Frequently Asked Questions</h1>
            {/*unordered list style*/}
        <body>
            <ul style={{ fontFamily: 'Arial', fontSize: '18px', color: 'white', padding: '`0 20px' }}>
            <li style={listItemStyle}><span style={redTextStyle}>How Do I Start? </span> To start playing, simply select a hero from the available options. Each hero has unique abilities that will help you on your journey through the dungeon.</li>
            <li style={listItemStyle}><span style={redTextStyle}>What are the Pillars of OOP?</span> The four Pillars of OOP—Abstraction, Encapsulation, Inheritance, and Polymorphism—are key concepts that you will need to capture throughout the dungeon. These pillars are scattered across different rooms, and your goal is to locate and capture them.</li>
            <li style={listItemStyle}><span style={redTextStyle}>How do I navigate the dungeon?</span> You can move through the dungeon using the navigation buttons (North, South, East, West).</li>
            <li style={listItemStyle}><span style={redTextStyle}>What happens if I encounter a monster?</span> If you encounter a monster, a battle will begin. You’ll need to use your hero’s abilities strategically to defeat the monster. Winning the battle allows you to continue your journey, while losing may require you to start from a previous point</li>
            <li style={listItemStyle}><span style={redTextStyle}>How do I win the game?</span> To win the game, you need to collect all four Pillars of Object-Oriented Programming and then find your way to the exit. Completing this quest makes you victorious!</li>
            </ul>
        </body>
        {/*image style*/}
        <div style={imageContainerStyle}>
            <img src={`${process.env.PUBLIC_URL}/question.png`} style={{ width: '300px', height: '400px' }} />
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

export default FAQPage;