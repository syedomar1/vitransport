// pages/api/data.js
import path from 'path';
import mongoose from 'mongoose';
import { BusRouteModel } from '../../models/models'; // Adjust the path as necessary
import { DataExtraction } from '../../data_routes/data'; // Adjust the path as necessary

export default async function handler(req, res) {
    try {
        const filePath2 = path.join(process.cwd(), 'data_routes', 'bus_timings2.xlsx'); // Correct the path
        const filePath = path.join(process.cwd(), 'data_routes', 'bus_locations.xlsx'); // Correct the path

        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.NEXT_PUBLIC_ATLASDB_URL);

        // Fetch all bus routes from MongoDB
        const busRoutes = await BusRouteModel.find().lean();

        // Extract data from files
        const data = DataExtraction(filePath, filePath2);

        // Send both data and bus routes
        res.status(200).json({ data, busRoutes });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        mongoose.connection.close(); // Close the connection
    }
}