import React, { useState } from 'react';
import './App.css';
import MainPage from './components/mainPage/mainPage';
import MapPage from './components/mapPage/mapPage';
import CoordsPage from './components/coordsPage/coordsPage';

function App() {
  const [showMap, setShowMap] = useState(false);
  const [showCoords, setShowCoords] = useState(false)

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  const toggleCoords = () => {
    setShowCoords(!showCoords);
  }

  return (
    <div>
    <div>{showMap ? <MapPage /> : <MainPage onShowMap={toggleMap} onShowCoordPages={toggleCoords} />}</div>
    <div>{showCoords? <CoordsPage /> : ''}</div>
    </div>
  );
}

export default App;
