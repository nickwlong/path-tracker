// functions/useDirections.tsx
import { GoogleAPI } from 'google-maps-react';

interface UseDirectionsProps {
  google: GoogleAPI;
  map: google.maps.Map | null;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  waypoints: google.maps.DirectionsWaypoint[];
}

const useDirections = async ({
  google,
  map,
  origin,
  destination,
  waypoints,
}: UseDirectionsProps) => {
  if (!map) return;

  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

  directionsDisplay.setMap(map);

  await directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints,
    },
    (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert(`Directions request failed due to ${status}`);
      }
    }
  );
  const addMarker = (location: google.maps.LatLngLiteral, label: string) => {
    new google.maps.Marker({
      position: location,
      label: label,
      map: map,
    });
  };

  addMarker(origin, 'A');
  addMarker(destination, 'B');
};

export default useDirections;
