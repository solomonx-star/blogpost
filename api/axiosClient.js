// api/apiClient.js or utils/apiClient.js
import axios from 'axios';
import Cookies from 'js-cookie';

// IMPORTANT: Make sure this matches your backend URL
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
});

// Add request interceptor to include auth token
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', {
      method: config.method,
      url: config.baseURL + config.url,
      hasToken: !!token
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });

    // Handle HTML responses (common when endpoint doesn't exist)
    if (error.response?.headers['content-type']?.includes('text/html')) {
      console.error('Server returned HTML. Check if:');
      console.error('1. Backend is running');
      console.error('2. API URL is correct');
      console.error('3. Endpoint exists');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
