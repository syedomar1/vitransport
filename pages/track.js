import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Track = () => {
  useEffect(() => {
    // Retrieve Mapbox access token from environment variable
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    // Initialize map with the retrieved access token
    mapboxgl.accessToken = mapboxAccessToken;

    // Initialize map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [80.0772106, 12.840641], // Center the map on a default location
      zoom: 10 // Adjust the zoom level as needed
    });

    // Red marker coordinates
    const redMarkerCoords = [80.153963, 12.840722];

    // Add red marker for the specified coordinates
    new mapboxgl.Marker({
      color: 'red' // Set marker color to red
    })
      .setLngLat(redMarkerCoords)
      .setPopup(new mapboxgl.Popup().setHTML('<h4>VIT Chennai</h4>'))
      .addTo(map);

    // Ensure map is fully loaded before additional operations
    map.on('load', function () {
      // Object to keep track of added layers
      const addedLayers = {};

      // Sample data for demonstration (replace with actual data)
      const busRoutes = [
        {
          stops: [
            { name: 'Stop 1', coordinates: [80.1, 12.85] },
            { name: 'Stop 2', coordinates: [80.15, 12.83] }
          ],
          routeNumber: '101'
        },
        {
          stops: [
            { name: 'Stop 3', coordinates: [80.12, 12.88] },
            { name: 'Stop 4', coordinates: [80.16, 12.86] }
          ],
          routeNumber: '102'
        }
      ];

      // Add circles or markers for each stop with unique colors for each route
      busRoutes.forEach(route => {
        route.stops.forEach((stop, i) => {
          const layerId = stop.name + '-layer';
          if (i === 0) { // If it's the first stop, add a marker
            // Add marker for the specified coordinates
            new mapboxgl.Marker({
              color: getRandomColor() // Set marker color to route's color
            })
              .setLngLat(stop.coordinates) // Updated to use stop.coordinates directly
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>Route: ${route.routeNumber}</h3><p>Stop: ${stop.name}</p>`))
              .addTo(map);
          } else { // If it's not the first stop, add a circle
            const circleLayerId = stop.name + '-circle';

            // Check if the layer already exists
            if (!addedLayers[circleLayerId]) {
              map.addLayer({
                id: circleLayerId,
                type: 'circle',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: stop.coordinates // Updated to use stop.coordinates directly
                    }
                  }
                },
                paint: {
                  'circle-color': getRandomColor(), // Set circle color to random color
                  'circle-radius': 5 // Adjust circle radius as needed
                }
              });

              // Set the layer as added
              addedLayers[circleLayerId] = true;
            }
          }
        });
      });
    });

    // Clean up resources on unmount (optional)
    return () => map.remove();

  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }}></div>
  );
}

export default Track;
