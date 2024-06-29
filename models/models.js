// models/models.js
import mongoose from 'mongoose';

const StopSchema = new mongoose.Schema({
    stop_id: String,
    stop_name: String,
    stop_lat: Number,
    stop_lon: Number,
});

const BusRouteSchema = new mongoose.Schema({
    route_id: String,
    route_name: String,
    stops: [String],
});

const StopModel = mongoose.models.Stop || mongoose.model('Stop', StopSchema);
const BusRouteModel = mongoose.models.BusRoute || mongoose.model('BusRoute', BusRouteSchema);

export { StopModel, BusRouteModel };