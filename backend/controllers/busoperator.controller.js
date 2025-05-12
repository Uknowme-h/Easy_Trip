import { BusOperator } from "../models/BusOperator.model.js";


// Create a new Bus Operator
export const createBusOperator = async (req, res) => {
    try {
        const { user, companyName, licenseNumber, contactNumber, address } = req.body;

        const newBusOperator = new BusOperator({
            user,
            companyName,
            licenseNumber,
            contactNumber,
            address
        });

        const savedBusOperator = await newBusOperator.save();
        res.status(201).json(savedBusOperator);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Bus Operator', error });
    }
};

// Get all Bus Operators
export const getAllBusOperators = async (req, res) => {
    try {
        const busOperators = await BusOperator.find().populate('user');
        res.status(200).json(busOperators);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Bus Operators', error });
    }
};

// Get a single Bus Operator by ID
export const getBusOperatorById = async (req, res) => {
    try {
        const { userId } = req.params;

        const busOperator = await BusOperator.findOne({ user: userId }).populate('user');

        if (!busOperator) {
            return res.status(404).json({ message: 'Bus Operator not found' });
        }

        res.status(200).json(busOperator);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Bus Operator', error });
    }
};

// Update a Bus Operator
export const updateBusOperator = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;


        const updatedBusOperator = await BusOperator.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBusOperator) {
            return res.status(404).json({ message: 'Bus Operator not found' });
        }

        res.status(200).json(updatedBusOperator);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Bus Operator', error });
    }
};

// Delete a Bus Operator
export const deleteBusOperator = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBusOperator = await BusOperator.findByIdAndDelete(id);

        if (!deletedBusOperator) {
            return res.status(404).json({ message: 'Bus Operator not found' });
        }

        res.status(200).json({ message: 'Bus Operator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Bus Operator', error });
    }
};

