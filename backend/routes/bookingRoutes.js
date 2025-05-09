import express from "express";
import {
    createBooking,
    getUserBookings,
    getOwnerBookings,
    cancelBooking,
    createCheckoutSession,
    stripeWebhook,
    getSession
} from "../controllers/booking.controller.js";

const bookingrouter = express.Router();

bookingrouter.post("/", createBooking);
bookingrouter.get("/user/:userId", getUserBookings);
bookingrouter.get("/owner/:ownerId", getOwnerBookings);
bookingrouter.patch("/cancel/:bookingId", cancelBooking);
bookingrouter.get("/session/:sessionId", getSession);



bookingrouter.post("/create-checkout-session", createCheckoutSession);
bookingrouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default bookingrouter;

