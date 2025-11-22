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

export const postData = async (post) => {
  try {
    const response = await apiClient.post("/posts/blog-post", post);
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
