import apiClient from './apiClient';

export const authService = {
  login: async (credentials: any) => {
    return apiClient.post('/auth/login', credentials);
  },
  register: async (userData: any) => {
    return apiClient.post('/auth/register', userData);
  },
  getMe: async () => {
    return apiClient.get('/auth/me');
  },
  logout: async () => {
    return apiClient.post('/auth/logout');
  }
};
