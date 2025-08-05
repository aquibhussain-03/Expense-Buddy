import axios from 'axios';
import { API_ENDPOINTS } from '../utils/apiPath';
import { getAuthToken } from '../utils/helper';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Transaction API
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  create: (data) => api.post('/transactions', data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  getStats: () => api.get('/transactions/stats'),
};

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  uploadProfilePicture: (formData) => api.post('/profile/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};