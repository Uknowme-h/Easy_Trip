import mongoose from "mongoose";

const BusOperatorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true, default: '' },
    licenseNumber: { type: String, default: '' },
    contactNumber: { type: String, default: '' },
    address: { type: String, default: '' },
}, { timestamps: true });

export const BusOperator = mongoose.model('BusOperator', BusOperatorSchema);
