import React from 'react';
import './MainPage.css'; // Importing the CSS file for styling
import backgroundImage from './mainPageBackground.png';

interface MainPageProps {
  onShowMap: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onShowMap }) => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <div className='main-container' style={backgroundStyle}>
      <h1>Welcome to path-tracker</h1>
      <p>Your journey to achieving your goals starts here!</p>
      <button onClick={onShowMap}>Show Map</button>
    </div>
  );
};

export default MainPage;
