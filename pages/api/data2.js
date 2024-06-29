// pages/api/data2.js
import { createReadStream } from 'fs';
import express from 'express';
import csv from 'csv-parser';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BusRouteModel, StopModel } from '../../models/models'; // Adjust path as necessary
import mapbox from '@mapbox/mapbox-sdk/services/geocoding';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const geocodingClient = mapbox({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN });

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filePath = '../../data_routes/bus_locations.csv'; 

        await mongoose.connect(process.env.NEXT_PUBLIC_ATLASDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB Atlas');

        const stops = [];
        const busRoutes = await BusRouteModel.find().lean();

        createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                stops.push({
                    stop_id: data['stop_id'],
                    stop_name: data['stop_name'],
                    stop_lat: data['stop_lat'],
                    stop_lon: data['stop_lon'],
                });
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');
                for (const stop of stops) {
                    const existingStop = await StopModel.findOne({ stop_id: stop.stop_id });
                    if (!existingStop) {
                        const newStop = new StopModel(stop);
                        await newStop.save();
                    }
                }

                const geocodeData = await Promise.all(
                    stops.map(async (stop) => {
                        const response = await geocodingClient
                            .forwardGeocode({
                                query: stop.stop_name,
                                limit: 1,
                            })
                            .send();
                        const match = response.body.features[0];
                        return {
                            stop_id: stop.stop_id,
                            stop_name: stop.stop_name,
                            coordinates: match.geometry.coordinates,
                        };
                    })
                );

                res.status(200).json({ stops: geocodeData, busRoutes });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        mongoose.connection.close(); // Close the connection
    }
});

export default router;