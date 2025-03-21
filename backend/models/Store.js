import mongoose from "mongoose";

var storeSchema = new mongoose.Schema({
    file_urls: {
        type: [String],
        required: true,
        default: []
    },
    user_id: {
        type: String,
        required: true
    }
});

export const Store = mongoose.model('Store', storeSchema);