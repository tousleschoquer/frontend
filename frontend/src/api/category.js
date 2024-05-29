// src/api/category.js

import axios from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/categories'); // Remplacez par l'URL de votre API
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
