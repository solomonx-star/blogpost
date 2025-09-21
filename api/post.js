import apiClient from "./apiClient";


export const fetchPosts = async () => {
    try {
        const response = await apiClient.get('/all-posts');
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const fetchPostById = async (id) => {
    try {
        const response = await apiClient.get(`/${id}`); 
        return response.data;
    } catch (error) {
        throw error;
    }   
}

export const createPost = async (postData) => {
    try {
        const response = await apiClient.post('/blog-post', postData);   
        return response.data;
    } catch (error) {
        throw error;
    }   
}

export const updatePost = async (id, postData) => {
    try {
        const response = await apiClient.put(`/${id}`, postData); 
        return response.data;
    } catch (error) {
        throw error;
    }   
}