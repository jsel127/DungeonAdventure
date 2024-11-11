import React from 'react';
import {useNavigate} from 'react-router-dom';


function HomePage() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Game!</h1>
            <p>This is where your Dungeon Adventure begins...</p>
            {/* Add game content or additional components here */}
        </div>
    );
}


export default HomePage;

