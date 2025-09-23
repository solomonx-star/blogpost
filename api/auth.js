
import axiosClient from "./axiosClient";

export const login = async (email, password) => {
    try {
        const response = await axiosClient.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (email, password) => {
    try {
        const response = await axiosClient.post('/auth/signup', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
