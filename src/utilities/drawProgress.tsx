import { GoogleAPI } from 'google-maps-react';

interface drawProgressProps {
  google: GoogleAPI;
  map: google.maps.Map | null;
  distanceTravelledMetres: number;
  response: any;
}
const drawProgress = ({
  google,
  map,
  response,
  distanceTravelledMetres,
}: drawProgressProps) => {
  let totalDistance = 0;
  const progressPath = [];

  for (const route of response.routes) {
    for (const leg of route.legs) {
      for (const step of leg.steps) {
        const stepPath = step.path;
        for (let i = 0; i < stepPath.length - 1; i++) {
          const segmentDistance =
            google.maps.geometry.spherical.computeDistanceBetween(
              stepPath[i],
              stepPath[i + 1]
            );
          totalDistance += segmentDistance;
          if (totalDistance <= distanceTravelledMetres) {
            progressPath.push(stepPath[i]);
          } else {
            const remainingDistance =
              distanceTravelledMetres - (totalDistance - segmentDistance);
            const endPoint = google.maps.geometry.spherical.interpolate(
              stepPath[i],
              stepPath[i + 1],
              remainingDistance / segmentDistance
            );
            progressPath.push(endPoint);
            break;
          }
        }
        if (totalDistance >= distanceTravelledMetres) break;
      }
      if (totalDistance >= distanceTravelledMetres) break;
    }
  }

  new google.maps.Polyline({
    path: progressPath,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    map: map,
  });
};

export default drawProgress;
