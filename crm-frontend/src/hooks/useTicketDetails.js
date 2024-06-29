import { useEffect, useState } from "react";
import axios from "axios";

const useTicketDetails = (id) => {
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/ticket/${id}`
      );
      setTicket(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    setLoading(true);
    fetchTicketDetails();
  };

  useEffect(() => {
    if (id) {
      fetchTicketDetails();
    }
  }, [id]);

  return { ticket, loading, error, refetch };
};

export default useTicketDetails;
