import axios from 'axios';

// API configuration
const BASE_URL = 'https://139.59.75.96';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// User API functions - converted from React Native to React
export const userApi = {
  // Admin Login
  login: async (phone_no, otp) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_no, otp })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to login');
    }
  },

  // Get All Users
  getAllUsers: async (token) => {
    try {
      console.log("Token being used inside userApi.getAllUsers:", token);
      const response = await fetch(`${BASE_URL}/manage-users/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  },

  // Get Users by City
  getUsersByCity: async (city, token) => {
    try {
      const response = await fetch(`${BASE_URL}/manage-users/city?city=${encodeURIComponent(city)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users by city');
    }
  },

  // Get User by Phone Number
  getUserByPhone: async (phone_no, token) => {
    try {
      const response = await fetch(`${BASE_URL}/manage-users/phone/${phone_no}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user by phone');
    }
  },

  // Update User Role by Phone Number
  updateUserRole: async (phone_no, role, token) => {
    try {
      const response = await fetch(`${BASE_URL}/manage-users/phone/${phone_no}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to update user role');
    }
  },

  // Delete User by Phone Number
  deleteUserByPhone: async (phone_no, token) => {
    try {
      const response = await fetch(`${BASE_URL}/manage-users/phone/${phone_no}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  },
};

// Alternative axios-based implementation (if you prefer axios)
export const userApiAxios = {
  // Admin Login
  login: async (phone_no, otp) => {
    try {
      const response = await apiClient.post('/auth/login', { phone_no, otp });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  // Get All Users
  getAllUsers: async (token) => {
    try {
      const response = await apiClient.get('/manage-users/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // Get Users by City
  getUsersByCity: async (city, token) => {
    try {
      const response = await apiClient.get(`/manage-users/city?city=${encodeURIComponent(city)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users by city');
    }
  },

  // Get User by Phone Number
  getUserByPhone: async (phone_no, token) => {
    try {
      const response = await apiClient.get(`/manage-users/phone/${phone_no}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user by phone');
    }
  },

  // Update User Role by Phone Number
  updateUserRole: async (phone_no, role, token) => {
    try {
      const response = await apiClient.put(`/manage-users/phone/${phone_no}/role`, 
        { role },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  },

  // Delete User by Phone Number
  deleteUserByPhone: async (phone_no, token) => {
    try {
      const response = await apiClient.delete(`/manage-users/phone/${phone_no}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },
};

export default userApi; 