const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  
  // Transaction endpoints
  TRANSACTIONS: `${API_BASE_URL}/transactions`,
  TRANSACTION_STATS: `${API_BASE_URL}/transactions/stats`,
  TRANSACTION_BY_ID: (id) => `${API_BASE_URL}/transactions/${id}`,
};