import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { AuthActionType } from '../context/AuthContext';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/user/login', { email, password });

      // No need to parse JSON manually, axios does it for you
      const data = response.data;

      // Save user and token to localStorage
      localStorage.setItem('user', JSON.stringify({ email: data.email, _id: data._id }));
      localStorage.setItem('token', data.token);

      // Dispatch login action
      dispatch({ type: AuthActionType.LOGIN, payload: { user: { email: data.email, _id: data._id }, token: data.token } });

      return true; // Login successful
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      return false; // Login failed
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
