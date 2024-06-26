// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages/api/data.js

import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BusRouteModel } from '../../models/models'; // Adjust path as per your project structure
import { DataExtraction } from '../../data_routes/data'; // Adjust path as per your project structure

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default async function handler(req, res) {
    console.log("Data.js ",process.env.NEXT_PUBLIC_ATLASDB_URL);
    try {
        const filePath2 = path.join(__dirname, '../../data_routes', 'bus_timings2.xlsx'); // Adjust path
        const filePath = path.join(__dirname, '../../data_routes', 'bus_locations.xlsx'); // Adjust path

        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.NEXT_PUBLIC_ATLASDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');

        // Fetch all bus routes from MongoDB
        const busRoutes = await BusRouteModel.find().lean();
        console.log('Fetched all bus routes from MongoDB:', busRoutes);

        // Extract data from files
        const data = DataExtraction(filePath, filePath2);

        // Send both data and bus routes
        res.json({ data, busRoutes });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
