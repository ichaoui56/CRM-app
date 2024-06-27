import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = (page, perPage) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    params: {
                        page: page,
                        per_page: perPage
                    }
                });
                setUsers(response.data.data);
                setTotalPages(response.data.last_page); // Assuming Laravel pagination response
                console.log("Response:", response.data.data); // Log response data
            } catch (error) {
                console.log("Error:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, perPage]);

    return { users, loading, error,setUsers, totalPages };
};

export default useUsers;
