import { create } from 'zustand';
import axios from 'axios';
axios.defaults.baseURL = 'https://hcbg9s40-5000.inc1.devtunnels.ms'; // Set your API base URL here
const useBusOperatorStore = create((set) => ({
    busOperators: [],
    busOperator: [],
    loading: false,
    error: null,

    // Fetch all Bus Operators
    fetchBusOperators: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/api/busops');
            set({ busOperators: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching Bus Operators', loading: false });
        }
    },

    // Create a new Bus Operator
    createBusOperator: async (busOperatorData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('/api/busops', busOperatorData);
            set((state) => ({
                busOperators: [...state.busOperators, response.data],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error creating Bus Operator', loading: false });
        }
    },

    // Update a Bus Operator
    updateBusOperator: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`/api/busops/${id}`, updatedData);
            set((state) => ({
                busOperators: state.busOperators.map((busOperator) =>
                    busOperator._id === id ? response.data : busOperator
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error updating Bus Operator', loading: false });
        }
    },

    // Delete a Bus Operator
    deleteBusOperator: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/busops/${id}`);
            set((state) => ({
                busOperators: state.busOperators.filter((busOperator) => busOperator._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error deleting Bus Operator', loading: false });
        }
    },
    // Fetch a single Bus Operator by ID
    fetchBusOperatorById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/busops/${id}`, { withCredentials: true });
            set({ busOperator: response.data, loading: false });

        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching Bus Operator', loading: false });
        }
    },
}));

export default useBusOperatorStore;