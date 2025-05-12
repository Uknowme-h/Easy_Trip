import express from 'express';
import {
    createBusBooking,
    getAllBusBookings,
    getBusBookingById,
    updateBusBooking,
    deleteBusBooking, getBookingsByOperator,
    getBookingByBusId,
    createBusCheckoutSession,
    getSession,
    getBookingByUserId
} from '../controllers/busbooking.controller.js';

const busbookingRoutes = express.Router();

// Public or authenticated as needed
busbookingRoutes.post('/', createBusBooking);
busbookingRoutes.get('/', getAllBusBookings);
busbookingRoutes.post('/checkout/stripesession', createBusCheckoutSession);
busbookingRoutes.get('/checkout/stripesession/:sessionId', getSession);
busbookingRoutes.get('/operators/:id', getBookingsByOperator); // Place this before the dynamic route
busbookingRoutes.get('/bus/user/:id', getBookingByUserId); // Place this before the dynamic route
busbookingRoutes.get('/:id', getBusBookingById);
busbookingRoutes.get('/bus/:id', getBookingByBusId);
busbookingRoutes.put('/:id', updateBusBooking);
busbookingRoutes.delete('/:id', deleteBusBooking);


export default busbookingRoutes;
