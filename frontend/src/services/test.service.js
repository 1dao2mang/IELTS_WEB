import apiClient from './apiClient';

export const testService = {
  getTests: async (params) => {
    return apiClient.get('/tests', { params });
  },
  getTestDetails: async (testId) => {
    return apiClient.get(`/tests/${testId}`);
  },
  startTest: async (testId) => {
    return apiClient.post(`/tests/${testId}/start`);
  },
  submitAttempt: async (attemptId, payload) => {
    return apiClient.post(`/tests/attempts/${attemptId}/submit`, payload);
  },
  getAttemptResult: async (attemptId) => {
    return apiClient.get(`/tests/attempts/${attemptId}`);
  }
};
