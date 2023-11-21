import React, { useState } from 'react';
import './App.css';
import MainPage from './components/mainPage/mainPage';
import MapPage from './components/mapPage/mapPage';

function App() {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div>{showMap ? <MapPage /> : <MainPage onShowMap={toggleMap} />}</div>
  );
}

export default App;
