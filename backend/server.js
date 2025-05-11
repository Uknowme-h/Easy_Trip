import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import user from './routes/adminRoute.js';
import path from 'path';
import user_router from './routes/user.route.js';
import guesthouserouter from './routes/guesthouseRoutes.js';

import { stripeWebhook } from './controllers/booking.controller.js';
import busRoutes from './routes/bus.route.js';
import bookingRoutes from './routes/busBooking.route.js';
import busbookingRoutes from './routes/busBooking.route.js';
import busop from './routes/busOperator.route.js';
import { handleStripeWebhook } from './controllers/busbooking.controller.js';
const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();
dotenv.config();
// At the top of your server file (before app.use(express.json()))
app.post(
    "/webhook",
    express.raw({ type: "application/json" }), // Stripe requires raw body
    stripeWebhook
);

app.post("/webhook/bus", (req, res, next) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        req.rawBody = data; // Explicitly set req.rawBody
        next();
    });
}, (req, res, next) => {

    next();
}, handleStripeWebhook);

app.use(cors({
    origin: ["http://localhost:5173", "https://easy-trip-smoky.vercel.app"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use('/api/upload', user);
app.use('/api/user', user_router);
app.use("/api/guesthouses", guesthouserouter);
app.use("/api/booking", bookingRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/busbookings', busbookingRoutes);
app.use('/api/busops', busop);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.use("/", (req, res) => {
    res.json("Api started");
});

app.listen(PORT, '0.0.0.0', () => {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});