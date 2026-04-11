import axios from 'axios';

// Create central axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: attach token
apiClient.interceptors.request.use(
  (config) => {
    // In actual implementation, we'd grab this from authStore or localStorage
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401s, error format
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handling standard authentication error (Unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      // Window redirect if needed, or emit event
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
