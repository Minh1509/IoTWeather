import React, { useState, useEffect, useContext } from "react";
import { ROUTER } from "../../routes/router";
import "./style.scss";
import { Link } from "react-router-dom";
import LineChart from "../../components/LineChart";
import { AppContext } from "../../data/AppContext";
import ControlDevice from "../../components/ControlDevices";
import StatusSensor from "../../components/StatusSensor";
import axios from 'axios';

const HomePage = (props) => {
  const { setCurrentPage } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const [dataCountOn, setDataCountOn] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/countLedOn");
        setDataCountOn(Number(response.data.data));
      } catch (error) {}
    };

    fetchData();
    setInterval(fetchData, 3000);
  }, []);
 

  return (
    <>
      <div className="main-header" >
        <div className="main-header-left">
          <h1>Dashboard</h1>

          <ul className="breadcrumb">
            <li>
              <Link
                to={ROUTER.USER.STATICS}
                onClick={() => setCurrentPage("/statics")}
              >
                Data Sensor
              </Link>
            </li>
            /
            <li>
              <Link
                to={ROUTER.USER.HISTORY}
                onClick={() => setCurrentPage("/history")}
                className="active"
              >
                Action History
              </Link>
            </li>
          </ul>
        </div>
        <div className="main-header-right" style={{fontSize: '30px', fontWeight: '700'}}>
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      <StatusSensor data={props.dataSensor} />
      <div className="main-bottom">
        <LineChart data={props.dataSensor} />
        <ControlDevice
          data={props.dataHistory}
          dataSmoke={props.dataSensor[props.dataSensor.length - 1].smoke}
          dataCountOn = {dataCountOn}
        />
      </div>
    </>
  );
};

export default HomePage;
