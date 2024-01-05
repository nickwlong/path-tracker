import { waypoints } from "./coords";

function splitWaypointsIntoRoutes(waypoints: string | any[], maxWaypointsPerRoute: number) {
  const routes = [];
  let currentRoute = [];

  for (let i = 0; i < waypoints.length; i++) {
    currentRoute.push(waypoints[i]);

    if (currentRoute.length === maxWaypointsPerRoute || i === waypoints.length - 1) {
      routes.push(currentRoute);
      
      if (i < waypoints.length - 1) {
        // Duplicate the last waypoint of the current route as the first waypoint of the next route
        currentRoute = [currentRoute[currentRoute.length - 1]];
      } else {
        currentRoute = [];
      }
    }
  }

  return routes;
}
  
  const maxWaypointsPerRoute = 23;
  
  export const routes = splitWaypointsIntoRoutes(waypoints, maxWaypointsPerRoute);