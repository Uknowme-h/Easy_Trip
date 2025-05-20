import { create } from 'zustand';
import axios from 'axios';

axios.defaults.baseURL = 'https://hcbg9s40-5000.inc1.devtunnels.ms'; // Set your API base URL here

const useBusBookingStore = create((set) => ({
    bookings: [],
    booking: null,
    loading: false,
    error: null,
    stripebook: null,

    // Fetch all bookings
    fetchAllBookings: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/api/busbookings');
            set({ bookings: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching bookings', loading: false });
        }
    },

    // Fetch a single booking by ID
    fetchBookingById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/busbookings/${id}`);
            set({ booking: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching booking', loading: false });
        }
    },

    // Create a new booking
    createBooking: async (bookingData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('/api/busbookings', bookingData);
            set((state) => ({ bookings: [...state.bookings, response.data], loading: false }));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error creating booking', loading: false });
        }
    },

    // Update a booking by ID
    updateBooking: async (id, bookingData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`/api/busbookings/${id}`, bookingData);
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking._id === id ? response.data : booking
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error updating booking', loading: false });
        }
    },

    // Delete a booking by ID
    deleteBooking: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/busbookings/${id}`);
            set((state) => ({
                bookings: state.bookings.filter((booking) => booking._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error deleting booking', loading: false });
        }
    },

    // Fetch bookings by operator ID
    fetchBookingsByOperator: async (operatorId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/busbookings/operators/${operatorId}`);
            set({ bookings: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching bookings by operator', loading: false });
        }
    },

    // Fetch bookings by bus ID
    fetchBookingsByBusId: async (busId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/busbookings/bus/${busId}`);
            set({ bookings: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching bookings by bus ID', loading: false });
        }
    },
    // Fetch Stripe session by session ID
    fetchStripeSession: async (sessionId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/busbookings/checkout/stripesession/${sessionId}`);
            return response.data; // Return the session data
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching Stripe session', loading: false });
        }
    },
    // Create a Stripe checkout session
    createStripeCheckoutSession: async (busId, userId, amount, seatNumbers) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('/api/busbookings/checkout/stripesession', {
                busId,
                userId,
                amount,
                seatNumbers,
            });
            return response.data.url; // Return the session URL
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error creating Stripe checkout session', loading: false });
            throw error; // Re-throw the error to handle it in the calling function
        } finally {
            set({ loading: false });
        }
    },
    // Fetch bookings by user ID
    fetchBookingsByUserId: async (userId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/busbookings/bus/user/${userId}`);
            set({ bookings: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching bookings by user ID', loading: false });
        }
    },
}));

export default useBusBookingStore;