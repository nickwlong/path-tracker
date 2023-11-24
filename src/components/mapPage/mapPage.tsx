import React, { useEffect, useRef, useState } from 'react';
import {
  Map,
  IMapProps,
  GoogleApiWrapper,
  GoogleAPI,
  mapEventHandler,
} from 'google-maps-react';
import useDirections from '../hooks/useDirections';

interface MapPageProps {
  google: GoogleAPI;
}

const mapStyles = {
  width: '100%',
  height: '100%',
};

const origin = { lat: 51.2136401, lng: -3.477535 };
const destination = { lat: 50.0663289, lng: -5.7149219 }; //
const waypoints: google.maps.DirectionsWaypoint[] = [
  { location: { lat: 51.2105611, lng: -4.1224522 }, stopover: true },
  { location: { lat: 50.9848034, lng: -4.373541 }, stopover: true },
];
const distanceTravelledMetres = 10000;

const MapPage: React.FC<MapPageProps> = ({ google }) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapInstance) {
      useDirections({
        google,
        map: mapInstance,
        origin,
        destination,
        waypoints,
        distanceTravelledMetres,
      });
    }
  }, [mapInstance, google, origin, destination]);

  const handleMapReady: mapEventHandler = (_mapProps, map) => {
    if (!map) return;
    setMapInstance(map);
  };

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <Map
        google={google}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
        initialCenter={origin}
        onReady={handleMapReady}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})(MapPage);
