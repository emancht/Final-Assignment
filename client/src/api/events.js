import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/event`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch events');
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/event/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch event details');
    throw error;
  }
};

export const getEventsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/event/category/${category}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch events by category');
    throw error;
  }
};

export const searchEvents = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/event/keyword/${keyword}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to search events');
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/event`, eventData, {
      withCredentials: true,
    });
    toast.success('Event created successfully!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create event');
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/event/${id}`, eventData, {
      withCredentials: true,
    });
    toast.success('Event updated successfully!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update event');
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await axios.delete(`${API_URL}/event/${id}`, {
      withCredentials: true,
    });
    toast.success('Event deleted successfully!');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete event');
    throw error;
  }
};
