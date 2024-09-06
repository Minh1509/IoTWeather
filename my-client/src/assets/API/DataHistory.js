import React from "react";
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
  }, []);
  return dataHistory
};

export default useDataHistory;
