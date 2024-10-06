import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useData } from '../context/DataContext';
import 'mapbox-gl/dist/mapbox-gl.css';

// Function to get a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Track = () => {
  const { busRoutes } = useData();
  const [map, setMap] = useState(null);
  const vitChennaiCoords = [80.1534, 12.8406];

  useEffect(() => {
    if (busRoutes && busRoutes.length > 0) {
      busRoutes.forEach(route => {
        route.color = getRandomColor(); // Assign random color to each route
      });
    }
  }, [busRoutes]);

  useEffect(() => {
    if (!busRoutes || busRoutes.length === 0) return;

    // Retrieve Mapbox access token from environment variable
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    // Initialize map
    mapboxgl.accessToken = mapboxAccessToken;
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: vitChennaiCoords,
      zoom: 12,
    });

    setMap(mapInstance);

    // Add a red marker for VIT Chennai
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(vitChennaiCoords)
      .setPopup(new mapboxgl.Popup().setHTML('<h4>VIT Chennai</h4>'))
      .addTo(mapInstance);

    // Directions API to connect routes
    const getDirections = (startCoords, endCoords, color, routeIndex) => {
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${mapboxAccessToken}`;

      return fetch(directionsUrl)
        .then(response => response.json())
        .then(data => {
          const route = data.routes[0];
          const routeLine = {
            type: 'Feature',
            geometry: route.geometry,
          };

          // Ensure the source doesn't already exist
          const sourceId = `route-${color}-${routeIndex}`;
          const layerId = `route-${color}-${routeIndex}-layer`;

          if (!mapInstance.getSource(sourceId)) {
            // Add route line to the map
            mapInstance.addSource(sourceId, {
              type: 'geojson',
              data: routeLine,
            });

            mapInstance.addLayer({
              id: layerId,
              type: 'line',
              source: sourceId,
              layout: {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
              },
              paint: {
                'line-color': color,
                'line-width': 2,
              },
            });
          }
        });
    };

    // Add markers for each bus route and its stops
    busRoutes.forEach((route, routeIndex) => {
      const stops = route.stops;
      stops.forEach((stop, stopIndex) => {
        const stopCoords = stop.coordinates.coordinates;

        // Create a dot for each stop
        const dot = new mapboxgl.Marker({ color: route.color, scale: 0.5 })
          .setLngLat(stopCoords)
          .addTo(mapInstance);

        // Handle click event for dots
        // Handle click event for dots
dot.getElement().addEventListener('click', () => {
  // Reuse the same marker or check if the marker already exists
  let marker = dot.marker;

  if (!marker) {
    // Create a new marker only if it doesn't already exist
    marker = new mapboxgl.Marker({ color: route.color })
      .setLngLat(stopCoords)
      .setPopup(new mapboxgl.Popup().setHTML(`
        <h3>Route: ${route.routeNumber}</h3>
        <p>Stop: ${stop.name}</p>
        <p>Time: ${stop.time}</p>
      `))
      .addTo(mapInstance);

    // Store the marker in the dot object to reuse later
    dot.marker = marker;
  }

  // Show the popup when marker is clicked
  marker.togglePopup();

  // Handle popup close event without removing the marker
  marker.getPopup().on('close', () => {
    // Just hide the popup without removing the marker
    dot.setLngLat(stopCoords); // Reset to dot position if needed
  });
});


        // Connect route with Directions API to the next stop
        if (stopIndex < stops.length - 1) {
          const nextStopCoords = stops[stopIndex + 1].coordinates.coordinates;
          getDirections(stopCoords, nextStopCoords, route.color, routeIndex);
        } else {
          // Connect to VIT Chennai if it's the last stop
          getDirections(stopCoords, vitChennaiCoords, route.color, routeIndex);
        }
      });
    });

    // Clean up resources on unmount
    return () => {
      mapInstance.remove();
    };
  }, [busRoutes]);

  return (
    <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }}></div>
  );
};

export default Track;
