import React, { Component } from 'react';
import { initMap } from './mapLogic';

interface MapComponentProps {
  onMapClick?: (lat: number, lng: number) => void;
}

class MapComponent extends Component<MapComponentProps> {
  componentDidMount() {
    initMap(this.handleMapClick);
  }

  handleMapClick = (lat: number, lng: number) => {
    if (this.props.onMapClick) {
      this.props.onMapClick(lat, lng);
    }
  };

  render() {
    return (
      <div id="map" style={{ width: '100%', height: '1400px' }} />
    );
  }
}

export default MapComponent;
