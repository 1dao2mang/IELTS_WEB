import apiClient from './apiClient';

export const testService = {
  getTests: async (params?: any) => {
    return apiClient.get('/tests', { params });
  },
  getTestDetails: async (testId: string) => {
    return apiClient.get(`/tests/${testId}`);
  },
  startTest: async (testId: string) => {
    return apiClient.post(`/tests/${testId}/start`);
  },
  submitAttempt: async (attemptId: string, payload: any) => {
    return apiClient.post(`/tests/attempts/${attemptId}/submit`, payload);
  },
  getAttemptResult: async (attemptId: string) => {
    return apiClient.get(`/tests/attempts/${attemptId}`);
  }
};
