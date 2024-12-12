import React, { useEffect } from 'react';

//Function to implement the AboutGamePage
function AboutGamePage() {
    useEffect(() => {
        // Set the background color of the entire page to dark grey
        document.body.style.backgroundColor = 'black';
        document.body.style.margin = '0';  // Remove margin
        document.body.style.padding = '0'; // Remove padding
    }, []);

    return (
        <div >
            {/*Heading for page*/}
            <h1 style={{ fontFamily: 'Garamond', color: 'maroon', textAlign: 'center', padding: 10, fontSize: '50px' }}>About this Game</h1>
            <p style={{ color: 'white', maxWidth: '800px', margin: '0 auto', fontSize: '20px' }}>
                Dungeon Adventure is an immersive game where players take on the role of heroes navigating through a mysterious dungeon.
                The main objective is to capture the four Pillars of Object-Oriented Programming—Abstraction, Encapsulation, Inheritance, 
                and Polymorphism—scattered throughout the maze. Along the way, players must battle fierce monsters, gather helpful items like 
                potions, and avoid deadly traps. Each hero brings unique abilities to aid in overcoming obstacles, making every journey 
                through the dungeon a test of strategy, bravery, and skill.
            </p>
            {/*Styling for image*/}
            <div style={imageContainerStyle}>
                <img src={`${process.env.PUBLIC_URL}/Pillars.jpg`} style={{ width: '800px', height: 'auto' }} />
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

export default AboutGamePage;
