import React, { Component } from 'react';
import MapComponent from './MapComponent';
import WaypointTable from './WayPointTable';

interface CoordsPageState {
  waypoints: { lat: number; lng: number }[];
  exportArray: { location: { lat: number; lng: number }; stopover: boolean }[];
  showExport: boolean;
}

class CoordsPage extends Component<object, CoordsPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      waypoints: [],
      exportArray: [],
      showExport: false,
    };
  }

  addWaypoint = (lat: number, lng: number) => {
    const newWaypoint = { lat, lng };
    this.setState((prevState) => ({
      waypoints: [...prevState.waypoints, newWaypoint],
      showExport: true,
    }));
  };

  onDeleteWaypoint = (index: number) => {
    const { waypoints } = this.state;
    const updatedWaypoints = [...waypoints];
    updatedWaypoints.splice(index, 1);
    this.setState({ waypoints: updatedWaypoints });
  };

  onClearWaypoints = () => {
    this.setState({ waypoints: [], exportArray: [], showExport: false });
  };

  exportWaypoints = () => {
    const { waypoints } = this.state;
    const exportArray = waypoints.map((waypoint) => ({
      location: { lat: waypoint.lat, lng: waypoint.lng },
      stopover: true,
    }));
    this.setState({ exportArray });
  };

  copyToClipboard = () => {
    const { exportArray } = this.state;
    navigator.clipboard.writeText(JSON.stringify(exportArray, null, 2));
  };

  render() {
    const { waypoints, exportArray, showExport } = this.state;

    return (
      <div className="coords-page-container">
        <div className="map-container">
          <MapComponent onMapClick={this.addWaypoint} />
        </div>
        <div className="table-container">
          <WaypointTable waypoints={waypoints} onDeleteWaypoint={this.onDeleteWaypoint} />
          {showExport && (
            <div className="export-container">
              <button onClick={this.exportWaypoints}>Export Waypoints</button>
              {exportArray.length > 0 && (
                <div className="exported-waypoints">
                  <pre>{JSON.stringify(exportArray, null, 2)}</pre>
                  <button onClick={this.copyToClipboard}>Copy to Clipboard</button>
                </div>
              )}
              <button onClick={this.onClearWaypoints}>Clear Waypoints</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CoordsPage;
