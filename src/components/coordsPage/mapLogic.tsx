let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
const waypoints: google.maps.LatLng[] = []; // Store clicked waypoints
let path: google.maps.Polyline | null = null; // Store the path

export function initMap(onMapClick: (lat: number, lng: number) => void) {
  const myLatlng = {
    lat: 50.67841155344202,
    lng: -4.226692434540713
  };

  map = new google.maps.Map(document.getElementById("map")!, {
    zoom: 9,
    center: myLatlng,
  });

  infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);

  map.addListener("click", (mapsMouseEvent: any) => {
    infoWindow.close();
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
    infoWindow.open(map);

    const lat = mapsMouseEvent.latLng.lat();
    const lng = mapsMouseEvent.latLng.lng();

    // Add the clicked waypoint to the array
    waypoints.push(new google.maps.LatLng(lat, lng));

    // Call the callback function with latLng coordinates
    onMapClick(lat, lng);

    // Check if there are at least two waypoints to create a path
    if (waypoints.length >= 2) {
      createPath();
    }
  });
}

// Function to create a path connecting the waypoints
function createPath() {
  if (path) {
    // Remove the previous path if it exists
    path.setMap(null);
  }

  // Create a new path using the waypoints
  path = new google.maps.Polyline({
    path: waypoints,
    geodesic: true,
    strokeColor: "#FF0000", // You can customize the color
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  // Set the path on the map
  path.setMap(map);
}

declare global {
  interface Window {
    initMap: (onMapClick: (lat: number, lng: number) => void) => void;
  }
}

window.initMap = initMap;
