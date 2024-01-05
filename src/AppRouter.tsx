// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage/mainPage';
import MapPage from './components/mapPage/mapPage';
import CoordsPage from './components/coordsPage/coordsPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/map" element={<MapPage/>}/>
        <Route path="/coords" element={<CoordsPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
