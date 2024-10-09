import { useState, useEffect } from "react";
import axios from "axios";

const useDataHistory = () => {
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/action_history"
        );
        setDataHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setInterval(fetchData, 3000);
  }, []);
  return dataHistory
};

export default useDataHistory;
