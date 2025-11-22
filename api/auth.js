
import axiosClient from "./axiosClient";

export const signin = async (email, password) => {
    try {
        const data = { email, password };
        const response = await axiosClient.post('/auth/login', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (username, email, password) => {
    try {
        const data = { username, email, password };
        const response = await axiosClient.post('/auth/register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (userId) => {
    try {
        const response = await axiosClient.get(`/auth/getProfile/${userId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


export const logoutUser = async () => {
    try {
        const response = await axiosClient.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadProfilePicture = async (userId, image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axiosClient.post(`/auth/uploadProfilePicture/${userId}`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
