import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    guesthouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guesthouse",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed"
    },
    guests: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const Booking = mongoose.model("Booking", bookingSchema);
