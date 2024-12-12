import react from 'react';
import React, { useEffect } from 'react';


//Function to implement the AboutCreatorsPage
function AboutCreatorsPage() {
        useEffect(() => {
            // Set the background color of the entire page black
            document.body.style.backgroundColor = 'black'; 
            document.body.style.margin = '0';  // Remove margin
            document.body.style.padding = '0'; // Remove padding
        }, []);
    
        return (
            <div >
                {/*Heading for page*/}
                <h1 style={{ fontFamily: 'Garamond', color: 'maroon', textAlign: 'center', padding: 10, fontSize: '50px' }}>About Creators</h1>
                <p style={{ fontFamily: 'Garamond', color: 'white', maxWidth: '800px', margin: '0 auto', fontSize: '20px' }}>
                Dungeon Adventure is developed by Jasmine, Simran, and Boyd, students at the University of Washington Tacoma (UWT). 
                This project is a collaborative effort intended to expand their knowledge and strengthen their skills in software development. 
                By designing and building this immersive game, they aimed to tackle new challenges 
                in coding, teamwork, and game design, all while applying and reinforcing key principles of programming.
                </p>
                {/*Styling for image*/}
                <div style={imageContainerStyle}>
                    <img src={`${process.env.PUBLIC_URL}/Team.jpg`} style={{ width: '800px', height: 'auto' }} />
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
    
    

export default AboutCreatorsPage;