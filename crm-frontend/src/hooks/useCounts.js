import { useState, useEffect } from "react";
import axios from "axios";

const useCounts = () => {
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/counts");
        console.log(response.data);
        setCounts(response.data);
      } catch {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);
  return { counts, loading, error, setCounts };
};

export default useCounts;
