import { useEffect, useState } from "react";
import axios from "axios";

const useTicketDetails = (id) => {
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ticket/${id}`);
        console.log(response);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTicket();
    }
  }, [id]);

  return { ticket, loading, error };
};

export default useTicketDetails;
