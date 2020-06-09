import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ marginTop: '7em' }}>
            <h1>Home Page</h1>
            <h3>Go to <Link to='activities'>Activities</Link> </h3>
        </div>
    );
};

export default HomePage;