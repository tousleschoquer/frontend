import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(`http://localhost:4000/api/user/signup`, {
                username,
                email,
                password
            });

            if (response.status === 200) {
                const { email, token, _id } = response.data;
                localStorage.setItem('user', JSON.stringify({ email, token, _id }));
                const user = { email, _id };
                dispatch({ type: 'LOGIN', payload: user });
                setSuccess(true);
                return true;
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || "An error occurred. Please try again.");
            } else {
                setError("An error occurred. Please try again.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error, success };
}


