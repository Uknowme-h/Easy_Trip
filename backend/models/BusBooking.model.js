import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatNumbers: [String], // ["A1", "A2"]
    totalAmount: Number,
    bookingTime: { type: Date, default: Date.now },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

export const BusBooking = mongoose.model('BusBooking', BookingSchema);
