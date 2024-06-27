import { useState, useEffect } from "react";
import axios from "axios";

const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cities");
        console.log(response.data); // Log the response to check the data
        setCities(response.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading, error, setCities };
};

export default useCities;
