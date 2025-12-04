// API Configuration
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://greenvue-8qb2.onrender.com'  // Production backend URL
  : 'http://localhost:5000';               // Development backend URL

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
  },
  FUNDS: {
    GREEN_FUNDS: '/api/green-funds',
    RECOMMENDATIONS: '/api/recommendations',
  },
  PAYMENT: {
    NAV: '/api/payment/nav',
    TRANSACTIONS: '/api/payment/transactions',
    PORTFOLIO: '/api/payment/portfolio',
    CREATE_ORDER: '/api/payment/create-order',
    VERIFY_PAYMENT: '/api/payment/verify-payment',
  },
  NEWS: '/api/news',
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;