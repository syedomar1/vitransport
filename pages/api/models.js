// pages/api/models.js
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { StopModel, BusRouteModel } from '../../models/models'; // Adjust path as per your project structure
import { DataExtraction } from '../../data_routes/data'; // Adjust path as per your project structure

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default async function handler(req, res) {
    try {
        const filePath2 = '../../data_routes/bus_timings2.xlsx';
        const filePath = '../../data_routes/bus_locations.xlsx';

        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.NEXT_PUBLIC_ATLASDB_URL);
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