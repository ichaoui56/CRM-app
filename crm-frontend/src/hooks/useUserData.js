import { useState, useEffect } from "react";
import axios from "axios";

const UserData = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            try {
            const response = await fetch("http://127.0.0.1:8000/api/authUser", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const userData = await response.json();
            setUser(userData);
            } catch (error) {
            console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
      }, []);
      return { user, setUser };
};

export default UserData;