import React from 'react';
import { Map, GoogleApiWrapper, GoogleAPI } from 'google-maps-react';

interface MapPageProps {
  google: GoogleAPI;
}

const mapStyles = {
  width: '100%',
  height: '100%',
};

const MapPage: React.FC<MapPageProps> = ({ google }) => {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <Map
        google={google}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY!, // Replace with your API key
})(MapPage);
