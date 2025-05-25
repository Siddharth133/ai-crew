// import axios from 'axios';

// // Get environment variables with fallback values
// const getEnvVar = (key, defaultValue) => {
//   // Check if we're in a browser environment
//   if (typeof window !== 'undefined') {
//     // In Create React App, environment variables are exposed through window._env_
//     return window._env_?.[key] || process.env[key] || defaultValue;
//   }
//   return defaultValue;
// };

// const API_URL = getEnvVar('REACT_APP_API_URL', 'http://localhost:3001/api');

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests if it exists
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle token expiration
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// Simple mock user data
const MOCK_USERS = {
  'testing@gmail.com': {
    id: 1,
    name: 'Test User',
    email: 'testing@gmail.com',
    role: 'customer',
    credits: 1000,
    usedCredits: 250
  },
  'admin@gmail.com': {
    id: 2,
    name: 'Admin User',
    email: 'admin@gmail.com',
    role: 'admin',
    credits: 9999,
    usedCredits: 0
  }
};

class AuthService {
  constructor() {
    this.currentUser = null;
    this.token = null;
    // Clear any existing auth state on initialization
    this.clearAll();
  }

  clearAll() {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  async login(email, password) {
    // Simple validation - in real app, this would be an API call
    if (email in MOCK_USERS && password === '1234') {
      const user = MOCK_USERS[email];
      this.currentUser = user;
      this.token = 'mock-token-' + Math.random();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', this.token);
      return user;
    }
    throw new Error('Invalid email or password');
  }

  async signup(name, email, password) {
    // In a real app, this would create a new user
    // For now, we'll just check if the email exists
    if (email in MOCK_USERS) {
      throw new Error('Email already exists');
    }
    // For demo, we'll just log in with the test account
    return this.login('testing@gmail.com', '1234');
  }

  logout() {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.currentUser = JSON.parse(userStr);
        this.token = localStorage.getItem('token');
      }
    }
    return this.currentUser;
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Commented out API-related methods since we're using mock data
  /*
  // Password reset
  async requestPasswordReset(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(token, password) {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Google OAuth
  async googleAuth(credential) {
    try {
      const response = await api.post('/auth/google', { credential });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  handleError(error) {
    if (error.response) {
      // Server responded with an error
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data.message || 'Invalid request. Please check your input.');
        case 401:
          return new Error('Invalid credentials. Please try again.');
        case 403:
          return new Error('You do not have permission to perform this action.');
        case 404:
          return new Error('The requested resource was not found.');
        case 409:
          return new Error('An account with this email already exists.');
        case 422:
          return new Error(data.message || 'Validation failed. Please check your input.');
        case 429:
          return new Error('Too many requests. Please try again later.');
        case 500:
          return new Error('An unexpected error occurred. Please try again later.');
        default:
          return new Error(data.message || 'Something went wrong. Please try again.');
      }
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Unable to reach the server. Please check your internet connection.');
    } else {
      // Something else happened
      return new Error('An unexpected error occurred. Please try again.');
    }
  }
  */
}

export default new AuthService(); 