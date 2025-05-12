import express from 'express';
import {
    createBusOperator,
    deleteBusOperator,
    getAllBusOperators,
    getBusOperatorById,
    updateBusOperator
} from '../controllers/busoperator.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const busop = express.Router();

// Route to create a new Bus Operator
busop.post('/', createBusOperator);

// Route to get all Bus Operators
busop.get('/', getAllBusOperators);

// Route to get a single Bus Operator by ID
busop.get('/:userId', verifyToken, getBusOperatorById);

// Route to update a Bus Operator
busop.put('/:id', updateBusOperator);

// Route to delete a Bus Operator
busop.delete('/:id', deleteBusOperator);

export default busop;