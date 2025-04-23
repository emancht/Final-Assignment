import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    toast.success('Registration successful!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed');
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials, {
      withCredentials: true,
    });
    toast.success('Login successful!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
    toast.success('Logged out successfully');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Logout failed');
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
