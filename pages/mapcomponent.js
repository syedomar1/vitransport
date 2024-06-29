// pages/mapcomponent.js
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = ({ busRoutes, mapboxApiKey }) => {
  const [selectedRouteNumber, setSelectedRouteNumber] = useState('');
  const [map, setMap] = useState(null);

  const redMarkerCoords = [80.153963, 12.840722];

  useEffect(() => {
    if (mapboxApiKey && !map) {
      mapboxgl.accessToken = mapboxApiKey;
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [80.0772106, 12.840641],
        zoom: 10,
      });

      new mapboxgl.Marker({
        color: 'red',
      })
        .setLngLat(redMarkerCoords)
        .setPopup(new mapboxgl.Popup().setHTML('<h4>VIT Chennai</h4>'))
        .addTo(mapInstance);

      setMap(mapInstance);
    }

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [mapboxApiKey, map]);

  const handleRouteChange = (event) => {
    setSelectedRouteNumber(event.target.value);
  };

  const searchRoute = () => {
    // Implement search logic if needed
    // For now, you may skip this functionality
  };

  // Function to render route on the map
  const renderRouteOnMap = (route) => {
    // Implement route rendering logic if needed
    // For now, you may skip this functionality
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="relative md:w-3/4">
        <div id="map" className="absolute inset-0"></div>
      </div>
      <div className="relative md:w-1/4 md:px-4 py-4 bg-white rounded-md">
        <label htmlFor="busRouteSelect" className="block font-medium">Select a Bus Route:</label>
        <select
          id="busRouteSelect"
          onChange={handleRouteChange}
          value={selectedRouteNumber}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select a route</option>
          {/* {busRoutes.map((route, index) => (
            <option key={index} value={route.routeNumber}>{route.routeNumber}</option>
          ))} */}
        </select>
        <button
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          onClick={searchRoute}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MapComponent;