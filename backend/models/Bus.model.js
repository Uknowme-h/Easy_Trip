import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    seatNumber: String,
    isBooked: { type: Boolean, default: false }
});

const RouteSchema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    stops: [String], // Array of stop names
    distance: { type: Number, required: true } // Distance in kilometers or miles
});

const BusSchema = new mongoose.Schema({
    operator: { type: mongoose.Schema.Types.ObjectId, ref: 'BusOperator', required: true },
    name: String,
    busNumber: { type: String, required: true, unique: true },
    totalSeats: Number,
    pricePerSeat: Number,
    route: { type: RouteSchema, required: true }, // Embedded route schema
    departureTime: Date,
    arrivalTime: Date,
    seats: [SeatSchema]
}, { timestamps: true });


export const Bus = mongoose.model('Bus', BusSchema);
