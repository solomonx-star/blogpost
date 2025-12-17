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
  // const formData = new FormData();
  // formData.append("title", postData.title);
  // formData.append("content", postData.content);
  // formData.append("category", postData.category);

  // if (postData.blogPhoto) {
  //   formData.append("blogPhoto", postData.blogPhoto);
  // }

  try {
    console.log("Sending request to:", apiClient.defaults.baseURL + "/posts/blog-post");
    console.log("Request data:", {
      title: postData.title,
      content: postData.content,
      category: postData.category,
      hasPhoto: !!postData.blogPhoto
    });

    // Send formData (not postData)
    const response = await apiClient.post("/posts/blog-post", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
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
