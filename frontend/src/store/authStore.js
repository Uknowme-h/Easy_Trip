import { create } from "zustand";
import axios from "axios";


const API_URL = import.meta.env.MODE === "development" ? "http://20.55.20.86:5000/api/auth" : "http://20.55.20.86:5000/api/auth";
const CLOUD_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/upload" : "/api/upload";


axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    audioSrc: null,

    signup: async (email, password, name, userType) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name, userType });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.msg || "Error signing up", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.msg || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.msg || "Error verifying email", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.msg || "Error sending reset password email",
            });
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.msg || "Error resetting password",
            });
            throw error;
        }
    },
    addBook: async (user_id, url) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/library`, { user_id, url });
            set({ user: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.msg || "Error adding book to library", isLoading: false });
            throw error;
        }
    },

    uploadFile: async (user_id, file) => {
        set({ isLoading: true, error: null });
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('file', file);

        try {
            const response = await axios.post(`${CLOUD_URL}/upload-file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            set({ audioSrc: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.msg || "Error uploading file", isLoading: false });
            throw error;
        }
    },
    getFiles: async (user_id) => {
        set({ isLoading: true, error: null });
        console.log("user_id", user_id);
        try {
            const response = await axios.get(`${CLOUD_URL}/get-file`, { params: { user_id } });
            set({ audioSrc: response, isLoading: false });
            return response;
        } catch (error) {
            set({ error: error.response.data.msg || "Error getting files", isLoading: false });
            throw error;
        }
    }

}));