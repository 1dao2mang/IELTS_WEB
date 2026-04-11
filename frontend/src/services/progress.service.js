import apiClient from './apiClient';

export const progressService = {
  getOverallProgress: async () => {
    return apiClient.get('/users/progress');
  },
  getAttempts: async () => {
    return apiClient.get('/users/attempts');
  }
};
