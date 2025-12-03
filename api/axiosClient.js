
import axios from 'axios';
import Cookies from 'js-cookie';


// const token = Cookies.get('token');



export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// const getAccessToken = () => {
//     try {
//         return Cookies.get("token");
//     } catch (error) {
//         console.error('GET_ACCESS_TOKEN_ERROR: ', error)
//         return null
//     }
// }


    // Add a request interceptor to attach the token
    apiClient.interceptors.request.use(
        (config) => {
            const token = Cookies.get('authToken'); // Or wherever you store your token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    

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
