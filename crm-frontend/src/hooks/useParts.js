import { useState, useEffect } from 'react';
import axios from 'axios';

const useParts = (searchParams) => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/parts', {
                    params: searchParams,
                });
                setParts(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, [searchParams]);

    return { parts, loading, error };
};

export default useParts;
