import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useParts = () => {
    const { getToken } = useAuth();
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchParts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/parts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },  
                });
                setParts(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, [getToken]);

    return { parts, loading, error, setParts }; // Include setParts here
};

export default useParts;
