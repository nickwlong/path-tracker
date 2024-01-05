import React, { useState } from 'react';
import './MainPage.css'; // Importing the CSS file for styling
import backgroundImage from './mainPageBackground.png';
import CoordsPage from '../coordsPage/coordsPage'; // Import the CoordsPage component
import { useNavigate } from 'react-router-dom';



const MainPage: React.FC = ({  }) => {
  const navigate = useNavigate()

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className='main-container' style={backgroundStyle}>
      <h1>Welcome to path-tracker</h1>
      <p>Your journey to achieving your goals starts here!</p>
      <button onClick={() => navigate('/map')}>Show Map</button>
      <button onClick={() => navigate('/coords')}>Show Coords Page</button>
    </div>
  );
};

export default MainPage;
