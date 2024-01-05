// functions/useDirections.tsx
import { GoogleAPI } from 'google-maps-react';
import drawProgress from '../../utilities/drawProgress';

interface UseDirectionsProps {
  google: GoogleAPI;
  map: google.maps.Map | null;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  routes: google.maps.DirectionsWaypoint[][];
  distanceTravelledMetres: number;
  onDirectionsCalculated?: (response: google.maps.DirectionsResult) => void;
}

const useDirections = async ({
  google,
  map,
  origin,
  destination,
  routes,
  distanceTravelledMetres,
  onDirectionsCalculated,
}: UseDirectionsProps) => {
  if (!map) return;

  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

  directionsDisplay.setMap(map);
  routes.forEach(async (waypoints) => {
  await directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints,
    },
    (response, status) => {
      if (status === 'OK' && response) {
        directionsDisplay.setDirections(response);
        drawProgress({ google, map, response, distanceTravelledMetres });
        
        // Call the callback function with the directions response
        if (onDirectionsCalculated) {
          onDirectionsCalculated(response);
        }
      } else {
        window.alert(`Directions request failed due to ${status}`);
      }
    });
});
  
  

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
