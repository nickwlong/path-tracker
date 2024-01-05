import React from 'react';

interface Waypoint {
  lat: number;
  lng: number;
}

interface WaypointTableProps {
  waypoints: Waypoint[];
  onDeleteWaypoint: (index: number) => void;
}

const WaypointTable: React.FC<WaypointTableProps> = ({ waypoints, onDeleteWaypoint }) => {
  return (
    <div>
      <h2>Waypoint Table</h2>
      <table>
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {waypoints.map((waypoint, index) => (
            <tr key={index}>
              <td>{waypoint.lat}</td>
              <td>{waypoint.lng}</td>
              <td>
                <button onClick={() => onDeleteWaypoint(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaypointTable;
