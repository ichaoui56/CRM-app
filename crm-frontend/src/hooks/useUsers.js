import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = (searchParams) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("SearchParams:", searchParams); // Log searchParams
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    params: searchParams,
                });
                setUsers(response.data.data);
                console.log("Response:", response.data.data); // Log response data
            } catch (error) {
                console.log("Error:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [searchParams]);

    return { users, loading, error };
};

export default useUsers;
