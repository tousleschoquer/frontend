// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/manga',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMangaById = async (id) => {
  try {
    const response = await api.get(`/manga/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching manga with ID ${id}:`, error);
    throw error;
  }
};

export default api;
