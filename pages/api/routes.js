// pages/api/routes.js

import mongoose from 'mongoose';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { BusRouteModel, StopModel } from '../../models/models'; // Adjust path as per your project structure
import { DataExtraction } from '../../data'; // Adjust path as per your project structure

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const geocodingClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY });
const chennaiBoundingBox = [79.7833, 12.3333, 80.8333, 13.6667];

async function main() {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_ATLASDB_URLL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');

        await BusRouteModel.deleteMany({});

        const filePath2 = path.join(__dirname, '../../data_routes', 'bus_timings2.xlsx'); // Adjust path
        const filePath = path.join(__dirname, '../../data_routes', 'bus_locations.xlsx'); // Adjust path
        const data = DataExtraction(filePath, filePath2);
        const busRoutesData = data[5];

        await geocodeAllBusRoutes(busRoutesData);

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function geocodeLocation(locationName) {
    try {
        const response = await geocodingClient.forwardGeocode({
            query: locationName,
            limit: 1,
            bbox: chennaiBoundingBox
        }).send();

        if (response && response.body && response.body.features && response.body.features.length > 0) {
            const coordinates = response.body.features[0].geometry.coordinates;
            console.log(`Geocoding successful for location: ${locationName}`);
            return coordinates;
        } else {
            console.error(`Geocoding failed for location: ${locationName}`);
            return null;
        }
    } catch (error) {
        console.error(`Error geocoding location ${locationName}:`, error.message);
        return null;
    }
}

async function geocodeBusRoute(busRouteData) {
    let prevTimeInMinutes = 8 * 60; // Initial time set to 8:00 AM in minutes
    let prevCoordinates = [80.0772106, 12.840641]; // Initial coordinates set to [80.0772106, 12.840641]

    for (let i = busRouteData.length - 1; i >= 0; i--) {
        if (busRouteData[i]['NAME OF THE STOPPING'] !== 'VIT') {
            const stop = busRouteData[i];
            const locationName = stop['NAME OF THE STOPPING'];
            const time = stop['TIME A.M'];

            const hours = parseInt(time.substring(0, 2));
            const minutes = parseInt(time.substring(3, 5));
            const currentTimeInMinutes = hours * 60 + minutes;

            const timeDifference = prevTimeInMinutes - currentTimeInMinutes;

            const coordinates = await geocodeLocation(locationName);
            if (coordinates) {
                stop.coordinates = { type: 'Point', coordinates: coordinates };
                prevCoordinates = coordinates;
            } else {
                delete stop.coordinates;
            }
            prevTimeInMinutes = currentTimeInMinutes;
        }
    }
}

function calculateBoundingBox(coordinates, timeDiffMinutes) {
    const latAdjustment = timeDiffMinutes * 0.005;
    const lngAdjustment = timeDiffMinutes * 0.005;

    const bbox = [
        coordinates[0] - lngAdjustment,
        coordinates[1] - latAdjustment,
        coordinates[0] + lngAdjustment,
        coordinates[1] + latAdjustment
    ];
    return bbox;
}

async function geocodeAllBusRoutes(busRoutesData) {
    for (const routeName in busRoutesData) {
        const busRouteData = busRoutesData[routeName];
        await geocodeBusRoute(busRouteData);
    }
}

export default async function handler(req, res) {
    await main();
    res.send("Backend works");
}
