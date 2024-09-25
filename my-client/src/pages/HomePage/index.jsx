import React from "react";
import { ROUTER } from "../../routes/router";
import "./style.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../components/LineChart";
import { AppContext } from "../../data/AppContext";
import ControlDevice from "../../components/ControlDevices";
import StatusSensor from "../../components/StatusSensor";

const HomePage = (props) => {
  const { setCurrentPage } = useContext(AppContext);

  return (
    <>
      <div className="main-header">
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

      <StatusSensor data = {props.dataSensor}/>
      <div className="main-bottom">
        <LineChart data={props.dataSensor} />
        <ControlDevice data={props.dataHistory} />
      </div>
    </>
  );
};
export default HomePage;
