import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useOrders = () => {
    const { getToken } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data); // assuming API returns orders directly
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
{}
        fetchOrders();
    }, [getToken]);

    return { orders, loading, error, setOrders };
};

export default useOrders;
