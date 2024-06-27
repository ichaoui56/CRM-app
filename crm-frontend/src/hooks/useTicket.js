// src/hooks/useTickets.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tickets');
                setTickets(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);
console.log(tickets);
    return { tickets, loading, error };
};

export default useTickets;
