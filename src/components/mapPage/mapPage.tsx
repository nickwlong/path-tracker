import React, { useEffect, useState } from 'react';
import {
  Map,
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
  height: '60vh',
};

const origin = { lat: 51.2136401, lng: -3.477535 };
const destination = { lat: 50.0663289, lng: -5.7149219 };
const waypoints: google.maps.DirectionsWaypoint[] = [
  { location: { lat: 51.2105611, lng: -4.1224522 }, stopover: true },
  { location: { lat: 51.000408, lng: -4.402532 }, stopover: true },
  { location: { lat: 51.013046, lng: -4.4494 }, stopover: true },
  { location: { lat: 51.019549, lng: -4.518929 }, stopover: true },
  { location: { lat:  51.020912, lng:  -4.513367 }, stopover: true },
];
const distanceTravelledMetres = 150000;

const MapPage: React.FC<MapPageProps> = ({ google }) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [totalRouteDistance, setTotalRouteDistance] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (mapInstance) {
      useDirections({
        google,
        map: mapInstance,
        origin,
        destination,
        waypoints,
        distanceTravelledMetres,
        onDirectionsCalculated: (response) => {
          const route = response.routes[0];
          let totalDistance = 0;

          for (const leg of route.legs) {
            totalDistance += leg.distance?.value || 0;
          }

          setTotalRouteDistance(totalDistance / 1000); // Convert meters to kilometers
        },
      });
    }
  }, [mapInstance, google, origin, destination]);

  const totalRouteDistanceValue = totalRouteDistance || 1;

  const handleMapReady: mapEventHandler = (_mapProps, map) => {
    if (!map) return;
    setMapInstance(map);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Virtual Distance Challenge</h1>
        <p>Track your progress on the map</p>
      </div>
      <div className="statistics">
        <div className="info-item">
          <strong>Total Distance to Travel:</strong> {totalRouteDistance} km
        </div>
        <div className="info-item">
          <strong>Total Distance Travelled:</strong>{' '}
          {distanceTravelledMetres / 1000} km
        </div>
        <div className="info-item">
          <strong>Percentage Travelled:</strong>{' '}
          {(distanceTravelledMetres / 10 / totalRouteDistanceValue).toFixed(2)}%
        </div>
      </div>
      <div style={mapStyles}>
        <Map
          google={google}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
          initialCenter={origin}
          onReady={handleMapReady}
        />
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})(MapPage);
