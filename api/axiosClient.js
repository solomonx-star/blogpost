
import axios from 'axios';


export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const getAccessToken = async () => {
    try {
        return localStorage.getItem("token");
    } catch (error) {
        console.error('GET_ACCESS_TOKEN_ERROR: ', error)
        return null
    }
}

apiClient.interceptors.request.use( async (config) => {
  const token = await getAccessToken(); // Example: Auth token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiMethods = {
  async get(url, params = {}) {
    try {
      const response = await apiClient.get(url, { params });
      return { data: response.data };
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Unknown error',
      };
    }
  },
  async post(url, body) {
    try {
      const response = await apiClient.post(url, body);
      return { data: response.data };
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Unknown error',
      };
    }
  },
  // Add put, delete, etc., if needed
};

export default apiMethods;
