import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "https://hcbg9s40-5000.inc1.devtunnels.ms/api/guesthouses" : "https://hcbg9s40-5000.inc1.devtunnels.ms/api/guesthouses";
axios.defaults.withCredentials = true;
export const useguesthouseStore = create((set, get) => ({
    guesthouses: [],
    myGuesthouses: [],
    loading: false,
    error: null,

    // Fetch all guesthouses (public/travelers)
    fetchGuesthouses: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(`${API_URL}/`);
            set({ guesthouses: res.data, error: null });
        } catch (err) {
            set({ error: err.response?.data?.error || "Failed to fetch guesthouses" });
        } finally {
            set({ loading: false });
        }
    },

    // Fetch guesthouses for the logged-in owner
    fetchMyGuesthouses: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(`${API_URL}/my`); // Ensure auth token is sent via interceptor or config
            set({ myGuesthouses: res.data, error: null });
        } catch (err) {
            set({ error: err.response?.data?.error || "Failed to fetch your guesthouses" });
        } finally {
            set({ loading: false });
        }
    },

    // Create new guesthouse
    createGuesthouse: async (data) => {
        set({ loading: true });
        try {
            const res = await axios.post(`${API_URL}`, data);
            set((state) => ({
                myGuesthouses: [...state.myGuesthouses, res.data.guesthouse],
                error: null
            }));
        } catch (err) {
            set({ error: err.response?.data?.error || "Failed to create guesthouse" });
        } finally {
            set({ loading: false });
        }
    },

    // Update guesthouse
    updateGuesthouse: async (id, data) => {
        set({ loading: true });
        try {
            const res = await axios.put(`${API_URL}/${id}`, data);
            set((state) => ({
                myGuesthouses: state.myGuesthouses.map((gh) =>
                    gh._id === id ? res.data.guesthouse : gh
                ),
                error: null
            }));
        } catch (err) {
            set({ error: err.response?.data?.error || "Failed to update guesthouse" });
        } finally {
            set({ loading: false });
        }
    },

    // Delete guesthouse
    deleteGuesthouse: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
                myGuesthouses: state.myGuesthouses.filter((gh) => gh._id !== id),
                error: null
            }));
        } catch (err) {
            set({ error: err.response?.data?.error || "Failed to delete guesthouse" });
        } finally {
            set({ loading: false });
        }
    }
}));
