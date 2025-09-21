import apiClient from "./apiClient";

export const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/all-posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async ({ title, content }) => {
  try {
    const postdata = {
      title,
      content,
    };
    const response = await apiClient.post("/blog-post", postdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (id, { title, content }) => {
  try {
    const postData = {
      title,
      content,
    };
    const response = await apiClient.put(`/update/${id}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
