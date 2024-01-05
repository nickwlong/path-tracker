import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, GoogleAPI, mapEventHandler } from 'google-maps-react';
import useDirections from '../hooks/useDirections';
import { routes } from './routeGenerator';
import { waypoints } from './coords';

interface MapPageProps {
  google: GoogleAPI;
}

const mapStyles = {
  width: '100%',
  height: '60vh',
};
const origin = {
  lat: waypoints[0]?.location?.lat,
  lng: waypoints[0]?.location?.lng,
};

const destination = {
  lat: waypoints[waypoints.length - 1]?.location?.lat,
  lng: waypoints[waypoints.length - 1]?.location?.lng,
};
const distanceTravelledMetres = 10000;
// TODO - Need to remove the routed distance from the total distanceTravelledMetres so that itis not always applied to individual routes

const MapPage: React.FC<MapPageProps> = ({ google }) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [totalRouteDistance, setTotalRouteDistance] = useState<number>(0); // Initialize with 0

  useEffect(() => {
    if (mapInstance) {
      // Use a helper variable to accumulate the total distance
      let accumulatedDistance = 0;

      // Loop through routes and calculate distances
      routes.forEach((route) => {
        const origin = {
          lat: route[0]?.location?.lat,
          lng: route[0]?.location?.lng,
        };
        console.log(route)
        
        const destination = {
          lat: route[route.length - 1]?.location?.lat,
          lng: route[route.length - 1]?.location?.lng,
        };
        useDirections({
          google,
          map: mapInstance,
          origin,
          destination,
          routes: [route],
          distanceTravelledMetres,
          onDirectionsCalculated: (response) => {
            const route = response.routes[0];
            let totalDistance = 0;

            for (const leg of route.legs) {
              totalDistance += leg.distance?.value || 0;
            }

            accumulatedDistance += totalDistance / 1000; // Convert meters to kilometers

            setTotalRouteDistance(accumulatedDistance);
          },
        });
      });
    }
  }, [mapInstance, google, origin, destination]);

  const totalRouteDistanceValue = totalRouteDistance || 0;

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
