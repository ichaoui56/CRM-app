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
                email: email,
                password: password,
            });

            const { token } = response.data;
            console.log(response.data);
            localStorage.setItem('token', token);
            if (token) {
                console.log('test1');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            console.log('test2');

            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed');
            setLoading(false);
            return false;
        }
    };

    return { login, loading, error };
};

export default useAuth;
