import React from 'react';
import './MainPage.css'; // Importing the CSS file for styling
import backgroundImage from './mainPageBackground.png'
const MainPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className="main-container" style={backgroundStyle}>
      <h1>Welcome to Path Tracker</h1>
      <p>Your journey to achieving your goals starts here!</p>
    </div>
  );
};

export default MainPage;
