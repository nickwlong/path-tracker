import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

interface Waypoint {
  lat: number;
  lng: number;
}

interface AddWaypointsPageProps {
  google: any; // You can replace 'any' with a more specific type if available
}

const AddWaypointsPage: React.FC<AddWaypointsPageProps> = ({ google }) => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  const handleMapClick = (clickEvent: any) => {
    const newWaypoint: Waypoint = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    setWaypoints([...waypoints, newWaypoint]);
  };

  return (
    <div>
      <h1>Add Waypoints</h1>
      <Map
        google={google}
        zoom={14}
        onClick={handleMapClick}
        style={{ width: '100%', height: '70vh' }}
      />
      {waypoints.map((waypoint, index) => (
        <Marker
          key={index}
          position={waypoint}
          label={`${index + 1}`} // Add labels to waypoints (1, 2, 3, ...)
        />
      ))}
      <div>
        <h2>Waypoints:</h2>
        <pre>{JSON.stringify(waypoints, null, 2)}</pre>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})(AddWaypointsPage);
