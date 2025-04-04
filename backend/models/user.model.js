import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
    library: {
        type: [{
            id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    role: {
        type: String,
        default: "traveler"
    }

}, {
    timestamps: true,
});


export const User = mongoose.model("User", userSchema);