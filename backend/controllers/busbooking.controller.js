import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { Bus } from '../models/Bus.model.js';
import { BusBooking } from '../models/busbooking.model.js';


// Controller to create a new bus booking
export const createBusBooking = async (req, res) => {
    try {
        const booking = new BusBooking(req.body);
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Controller to get all bus bookings
export const getAllBusBookings = async (_, res) => {
    try {
        const bookings = await BusBooking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Controller to get a single bus booking by ID
export const getBusBookingById = async (req, res) => {
    try {
        const booking = await BusBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

// Controller to update a bus booking by ID
export const updateBusBooking = async (req, res) => {
    try {
        const updatedBooking = await BusBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

// Controller to delete a bus booking by ID
export const deleteBusBooking = async (req, res) => {
    try {
        const deletedBooking = await BusBooking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};
// controller to get all bookings by operator id
export const getBookingsByOperator = async (req, res) => {
    try {
        const operatorId = req.params.id; // Assuming the operator ID is passed in the request parameters

        // Get all buses associated with the operator
        const buses = await Bus.find({ operator: operatorId });


        // Extract the bus ID
        const busIds = buses.map(bus => bus._id);


        // Get all bookings for the extracted bus IDs
        const bookings = await BusBooking.find({ bus: { $in: busIds } });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// get  booking by bus id


export const getBookingByBusId = async (req, res) => {
    try {
        const busId = req.params.id; // Assuming the bus ID is passed in the request parameters

        // Get all bookings associated with the bus
        const bookings = await BusBooking.find({ bus: busId });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
}

// create checkout session for bus booking
export const createBusCheckoutSession = async (req, res) => {
    try {
        // Extract the nested structure from the request body
        const { busId, userId, amount, seatNumbers } = req.body.busId || req.body;



        // Ensure busId is a string
        if (typeof busId !== 'string') {
            console.error('Invalid busId format:', busId, 'Type:', typeof busId);
            return res.status(400).json({ message: 'Invalid busId format' });
        }

        // Get bus details from bus ID
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Check if any seat number in the array is already booked
        const existingBooking = await BusBooking.findOne({
            bus: busId,
            seatNumbers: { $in: seatNumbers }, // Check if any seatNumber exists in the seatNumbers array
        });
        if (existingBooking) {
            return res.status(400).json({ message: `One or more seat numbers in ${seatNumbers} are already booked` });
        }

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Bus Booking for ${bus.name}`,
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}busbooked?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}cancel`,
            metadata: {
                busId,
                userId,
                seatNumbers: JSON.stringify(seatNumbers), // Store seatNumbers as a string in metadata
                amount,
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating checkout session', error });
    }
};

// Get session details
export const getSession = async (req, res) => {
    try {
        res.set("Cache-Control", "no-store"); // prevent 304 caching
        const sessionId = req.params.sessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);


        if (!session) return res.status(404).json({ message: "Session not found" });

        res.status(200).json(session);
    } catch (err) {
        console.error("Error retrieving session:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Webhook to handle Stripe events
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody, // Use raw body here if using middleware like express.raw
            sig,
            process.env.STRIPE_WEBHOOK_SECRET_BUS
        );
    } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { busId, userId, seatNumbers, amount } = session.metadata;

        try {
            // Check if any seat number in the array is already booked
            const existingBooking = await BusBooking.findOne({
                bus: busId,
                seatNumbers: { $in: JSON.parse(seatNumbers) }, // Parse seatNumbers back to an array
            });

            if (existingBooking) {
                console.error("❌ One or more seat numbers are already booked.");
                return res.status(409).json({ message: "One or more seat numbers are already booked." });
            }

            // Add the booking to the database
            const booking = new BusBooking({
                bus: busId,
                user: userId,
                totalAmount: amount,
                seatNumbers: JSON.parse(seatNumbers), // Parse seatNumbers back to an array
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

//get booking by userID
export const getBookingByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the request parameters

        // Get all bookings associated with the user
        const bookings = await BusBooking.find({ user: userId });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};