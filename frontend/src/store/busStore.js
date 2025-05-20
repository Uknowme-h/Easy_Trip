import { create } from 'zustand';
import axios from 'axios';

axios.defaults.baseURL = 'https://hcbg9s40-5000.inc1.devtunnels.ms'; // Set your API base URL here

const useBusStore = create((set) => ({
    buses: [],
    bus: null,
    error: null,
    loading: false,

    // Fetch all buses
    fetchAllBuses: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/api/buses', { withCredentials: true });
            set({ buses: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    // Fetch bus by ID
    fetchBusById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/buses/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    // Create a new bus
    createBus: async (busData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('/api/buses', busData, { withCredentials: true });
            set((state) => ({ buses: [...state.buses, response.data], loading: false }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    // Update a bus
    updateBus: async (id, busData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`/api/buses/${id}`, busData, { withCredentials: true });
            set((state) => ({
                buses: state.buses.map((bus) => (bus._id === id ? response.data : bus)),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    // Delete a bus
    deleteBus: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/buses/${id}`, { withCredentials: true });
            set((state) => ({
                buses: state.buses.filter((bus) => bus._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    // Fetch buses by operator
    fetchBusesByOperator: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/api/buses/operators', { withCredentials: true });
            if (response.status === 200) {
                set({ buses: response.data, loading: false });
            } else {
                set({ error: 'Unexpected response from server', loading: false });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },
}));

export default useBusStore;