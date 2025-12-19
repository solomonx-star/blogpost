import next from "next";
import { unstable_cache } from "next/cache";
import apiClient from "./axiosClient";

export const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/posts/all-posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (postData) => {


  try {

    const response = await apiClient.post("/posts/blog-post", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;

  } catch (error) {
    console.error("Post creation error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });

    if (error.response?.headers['content-type']?.includes('text/html')) {
      throw new Error('Server returned HTML instead of JSON. Check your API endpoint URL and ensure backend is running.');
    }

    throw error;
  }
};


export const updatePost = async (postId, post) => {
  try {
    const response = await apiClient.put(`/posts/${postId}`, post);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateViews = async (postId) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/view`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthorPosts = async (authorId) => {
  try {
    const response = await apiClient.get(`/posts/author/${authorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
