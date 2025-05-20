import { create } from "zustand";
import axios from "axios";

const baseURL = "https://hcbg9s40-5000.inc1.devtunnels.ms"; // Set your API base URL here

const useBookingStore = create((set, get) => ({
    bookings: [],
    userBookings: [],
    ownerBookings: [],
    loading: false,
    error: null,

    // Create a checkout session
    createCheckoutSession: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.post(baseURL + "/api/checkout-session", data);
            return response.data.url; // Return the checkout session URL
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Retrieve a Stripe session
    getSession: async (sessionId) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.get(`${baseURL}/api/checkout-session/${sessionId}`);
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Create a booking
    createBooking: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.post(baseURL + "/api/booking", data);
            set((state) => ({
                bookings: [...state.bookings, response.data],
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Get bookings for a specific user
    getUserBookings: async (userId) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.get(`${baseURL}/api/booking/user/${userId}`);
            set({ userBookings: response.data });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Get bookings for an owner's guesthouses
    getOwnerBookings: async (ownerId) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.get(`${baseURL}/api/booking/owner/${ownerId}`);
            set({ ownerBookings: response.data });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Cancel a booking
    cancelBooking: async (bookingId) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.patch(`${baseURL}/api/booking/cancel/${bookingId}`);
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking._id === bookingId ? response.data.booking : booking
                ),
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useBookingStore;