import mongoose from "mongoose";

const guesthouseOwnerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    address: {
        type: String
    },
    guesthouses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guesthouse"
    }]
}, {
    timestamps: true
});

export const GuesthouseOwner = mongoose.model("GuesthouseOwner", guesthouseOwnerSchema);
