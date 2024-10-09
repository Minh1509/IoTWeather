import { useState, useEffect } from "react";
import axios from "axios";


const useDataSensor = () => {
  const [dataSensor, setDataSensor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/datasensor"
        );
        setDataSensor(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setInterval(fetchData, 3000);
  }, []);
  return dataSensor;
};

export default useDataSensor;
