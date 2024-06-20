// src/hooks/useTickets.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth'; // Import useAuth hook to get token

const useTickets = () => {
    const { getToken } = useAuth(); // Get getToken function from useAuth hook
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token');  // Get token from useAuth hook
console.log(token);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tickets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTickets(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchTickets();
    }, [getToken]); // Include getToken in dependencies to re-fetch tickets when token changes

    return { tickets, loading, error };
};

export default useTickets;
