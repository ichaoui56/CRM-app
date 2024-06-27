import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setLoading(false);
                return true;
            } else {
                setError(`Login failed with status: ${response.status}`);
                setLoading(false);
                return false;
            }
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Login failed';
            setError(errorMessage);
            setLoading(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token; // Check if token exists and is valid in your application logic
    };

    return { login, logout, isAuthenticated, loading, error };
};

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default useAuth;
