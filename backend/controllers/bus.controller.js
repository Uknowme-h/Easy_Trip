import { BusOperator } from '../models/BusOperator.model.js';
import { Bus } from '../models/Bus.model.js';
import user from '../routes/adminRoute.js';
import mongoose from 'mongoose';

// Create a new bus (Operator only)
export const createBus = async (req, res) => {
    try {
        const { busName, busNumber, totalSeats, pricePerSeat, route, departureTime, arrivalTime, seats } = req.body;

        // Find the operator associated with the logged-in user
        const operator = await BusOperator.findOne({ user: req.userId });
        if (!operator) {
            return res.status(403).json({ message: 'Not authorized as a bus operator' });
        }
        // handle dublicate bus number
        const existingBus = await Bus.findOne({ busNumber });
        if (existingBus) {
            return res.status(400).json({ message: 'Bus number already exists' });
        }


        // Create a new bus with the embedded route details
        const newBus = await Bus.create({
            operator: operator._id,
            name: busName,
            busNumber,
            totalSeats,
            pricePerSeat,
            route, // Embedded route details
            departureTime,
            arrivalTime,
            seats
        });

        res.status(201).json(newBus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all buses
export const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find()
            .populate({ path: 'operator', populate: { path: 'user', select: 'name email' } });

        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bus by ID
export const getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id)
            .populate({ path: 'operator', populate: { path: 'user', select: 'name email' } });

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a bus (Operator only)
export const updateBus = async (req, res) => {
    try {
        const operator = await BusOperator.findOne({ user: req.userId });
        if (!operator) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const bus = await Bus.findOneAndUpdate(
            { _id: req.params.id, operator: operator._id },
            req.body,
            { new: true }
        );

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found or unauthorized' });
        }

        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a bus (Operator only)
export const deleteBus = async (req, res) => {
    try {
        const operator = await BusOperator.findOne({ user: req.userId });
        if (!operator) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const deleted = await Bus.findOneAndDelete({ _id: req.params.id, operator: operator._id });

        if (!deleted) {
            return res.status(404).json({ message: 'Bus not found or unauthorized' });
        }

        res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all buses created by the logged-in operator
export const getBusesByOperator = async (req, res) => {
    // Check if the user is logged in and is a bus operator
    if (!req.userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        // Find the operator associated with the logged-in user
        const operator = await BusOperator.findOne({ user: req.userId });

        if (!operator) {
            return res.status(403).json({ message: 'Not authorized as a bus operator' });
        }

        // Validate that operator._id is an ObjectId
        if (!operator._id || !operator._id instanceof mongoose.Types.ObjectId) {
            return res.status(400).json({ message: 'Invalid operator ID' });
        }

        // Find buses associated with the operator
        const buses = await Bus.find({ operator: operator._id })


        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

