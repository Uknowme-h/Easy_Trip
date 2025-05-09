import { Booking } from "../models/Booking.model.js";
import { Guesthouse } from "../models/Guesthouse.model.js";

import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { guesthouseId, userId, checkInDate, checkOutDate, guests } = req.body;

        // Validate guesthouse exists
        const guesthouse = await Guesthouse.findById(guesthouseId);
        if (!guesthouse) {
            return res.status(404).json({ message: "Guesthouse not found" });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // Overlap check: no booking should exist where (existing.checkIn < newCheckOut && existing.checkOut > newCheckIn)
        const overlap = await Booking.findOne({
            guesthouse: guesthouseId,
            status: "confirmed",
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gt: checkIn }
        });

        if (overlap) {
            return res.status(409).json({ message: "Guesthouse is already booked for the selected dates." });
        }

        // Calculate total price
        const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        const totalPrice = guesthouse.pricePerNight * days;

        console.log("Total Price:", totalPrice);

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(totalPrice * 100),
                        product_data: {
                            name: guesthouse.name,
                            description: guesthouse.description,
                            images: [guesthouse.images?.[0] || ""]
                        }
                    },
                    quantity: 1
                }
            ],
            success_url: `${process.env.CLIENT_URL}success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                guesthouseId,
                userId,
                checkInDate,
                checkOutDate,
                guests: JSON.stringify(guests)
            }
        });


        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("❌ Error creating checkout session:", err);
        res.status(500).json({ message: err.message });
    }
};


export const getSession = async (req, res) => {
    try {
        res.set("Cache-Control", "no-store"); // prevent 304 caching
        console.log("Fetching session with ID:", req.params.sessionId);
        const sessionId = req.params.sessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session) return res.status(404).json({ message: "Session not found" });

        res.status(200).json(session);
    } catch (err) {
        console.error("Error retrieving session:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body, // Use raw body here if using middleware like express.raw
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const {
            guesthouseId,
            userId,
            checkInDate,
            checkOutDate,
            guests
        } = session.metadata;

        try {
            // Convert to Date objects
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);

            // Find overlapping confirmed bookings
            const overlap = await Booking.findOne({
                guesthouse: guesthouseId,
                status: "confirmed",
                checkInDate: { $lt: checkOut },
                checkOutDate: { $gt: checkIn }
            });

            if (overlap) {
                return res
                    .status(409)
                    .json({ message: "Guesthouse is already booked for the selected dates." });
            }

            // Find guesthouse price
            const gh = await Guesthouse.findById(guesthouseId);
            if (!gh) {
                return res.status(404).json({ message: "Guesthouse not found" });
            }

            const booking = new Booking({
                guesthouse: guesthouseId,
                user: userId,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                guests: JSON.parse(guests),
                totalPrice: session.amount_total / 100,
                status: "confirmed"
            });

            await booking.save();
            console.log("✅ Booking saved to DB");
        } catch (err) {
            console.error("❌ Failed to save booking", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    res.status(200).json({ received: true });
};


// 1. Create Booking with overlap check
export const createBooking = async (req, res) => {
    try {
        const { guesthouse, user, checkInDate, checkOutDate, guests } = req.body;

        // Check for existing overlapping bookings
        const overlap = await Booking.findOne({
            guesthouse,
            status: "confirmed",
            $or: [
                {
                    checkInDate: { $lt: new Date(checkOutDate) },
                    checkOutDate: { $gt: new Date(checkInDate) }
                }
            ]
        });

        if (overlap) {
            return res.status(409).json({ message: "Guesthouse is already booked for the selected dates." });
        }

        // Get guesthouse price
        const gh = await Guesthouse.findById(guesthouse);
        if (!gh) return res.status(404).json({ message: "Guesthouse not found" });

        const days = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
        const totalPrice = days * gh.pricePerNight;

        const booking = new Booking({
            guesthouse,
            user,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests
        });

        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get all bookings for a specific user
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({ user: userId })
            .populate("guesthouse", "name location pricePerNight images")
            .sort({ checkInDate: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Get all bookings for an owner's guesthouses
export const getOwnerBookings = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const guesthouses = await Guesthouse.find({ owner: ownerId });
        const guesthouseIds = guesthouses.map(g => g._id);

        const bookings = await Booking.find({ guesthouse: { $in: guesthouseIds } })
            .populate("user", "name email")
            .populate("guesthouse", "name location");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: "cancelled" },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking cancelled", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
