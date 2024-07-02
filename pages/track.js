import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useData } from '../context/DataContext';

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

  useEffect(() => {
    if (busRoutes && busRoutes.length > 0) {
      busRoutes.forEach(route => {
        route.color = getRandomColor();
      });
    }
  }, [busRoutes]);

  useEffect(() => {
    if (!busRoutes || busRoutes.length === 0) {
      return;
    }

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

    // Ensure map is fully loaded before adding data
    map.on('load', function () {
      // Object to keep track of added layers
      const addedLayers = {};

      // Add markers and circles for each bus route and its stops
      busRoutes.forEach((route, routeIndex) => {
        route.stops.forEach((stop, stopIndex) => {
          const layerId = `route-${routeIndex}-stop-${stopIndex}`;

          if (stopIndex === 0) { // First stop in the route, add a marker
            new mapboxgl.Marker({
              color: route.color // Set marker color
            })
              .setLngLat(stop.coordinates.coordinates) // Extract coordinates
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>Route: ${route.routeNumber}</h3><p>Stop: ${stop.name}</p>`))
              .addTo(map);
          } else { // Not the first stop, add a circle
            const circleLayerId = stop.name + '-circle';
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
                      coordinates: stop.coordinates.coordinates // Extract coordinates
                    }
                  }
                },
                paint: {
                  'circle-color': route.color, // Set circle color
                  'circle-radius': 5 // Adjust circle radius
                }
              });

              // Set the layer as added
              addedLayers[circleLayerId] = true;
            }
          }
        });
      });
    });

    // Clean up resources on unmount
    return () => map.remove();

  }, [busRoutes]); // Include busRoutes in dependency array to rerender on data change


  return (
    <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }}></div>
  );
}

export default Track;
