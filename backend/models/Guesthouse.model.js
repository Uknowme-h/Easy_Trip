import mongoose from "mongoose";

const guesthouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    images: [{
        type: String // Array of image URLs
    }],
    description: {
        type: String
    },
    amenities: [{
        type: String
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GuesthouseOwner",
        required: true
    }
}, {
    timestamps: true
});

export const Guesthouse = mongoose.model("Guesthouse", guesthouseSchema);
