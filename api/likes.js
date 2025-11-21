import apiClient from "./axiosClient";

export const addLike = async (postId) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComment = async (postId, comment) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/comment`, { comment });
    return response.data;
  } catch (error) {
    throw error;
  }
};
