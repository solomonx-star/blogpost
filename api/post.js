import apiClient from "./axiosClient";

export const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/all-posts", {
      cache: "no-store",
      next: { revalidate: 3600 },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
