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

            if (response.status === 204) {
                // No Content response (204) typically means successful login without data
                const token = localStorage.getItem('token');
                console.log(token);
                if (token) {
                    console.log(token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setLoading(false);
                    return true;
                } else {
                    console.log(token);
                    setError('Token not found in local storage');
                    setLoading(false);
                    return false;
                }
            } else if (response.status === 200) {
                // Successful login with data (typically a token)
                const { token } = response.data;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setLoading(false);
                return true;
            } else {
                // Handle other status codes if needed
                setError(`Login failed with status: ${response.status}`);
                setLoading(false);
                return false;
            }
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed');
            setLoading(false);
            return false;
        }
    };

    return { login, loading, error };
};

export default useAuth;
