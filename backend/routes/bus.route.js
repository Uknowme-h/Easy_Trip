import express from 'express';
import {
    createBus,
    getAllBuses,
    getBusById,
    updateBus,
    deleteBus,
    getBusesByOperator,

} from '../controllers/bus.controller.js';

import { verifyToken } from '../middleware/verifyToken.js';

const busRoutes = express.Router();

// Public routes
busRoutes.get('/', getAllBuses);

// Protected routes (operator only)
busRoutes.get('/operators', verifyToken, getBusesByOperator); // Place this before the dynamic route
busRoutes.get('/:id', getBusById); // Dynamic route should come after specific routes
busRoutes.post('/', verifyToken, createBus);
busRoutes.put('/:id', verifyToken, updateBus);
busRoutes.delete('/:id', verifyToken, deleteBus);

export default busRoutes;
