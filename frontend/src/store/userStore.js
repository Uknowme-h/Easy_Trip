import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/user" : "http://localhost:5000/api/user";

axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
    users: [],
    loading: false,
    error: null,

    // Fetch all users
    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}`);
            set({ users: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new user
    createUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/users`, userData);
            set((state) => ({ users: [...state.users, response.data], loading: false }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update a user by ID
    updateUser: async (id, userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/users/${id}`, userData);
            set((state) => ({
                users: state.users.map((user) => (user._id === id ? response.data : user)),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a user by ID
    deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/users/${id}`);
            set((state) => ({
                users: state.users.filter((user) => user._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));