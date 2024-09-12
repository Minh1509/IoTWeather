import React from "react";
import { ROUTER } from "../../routes/router";
import "./style.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import LineChart from "../../components/LineChart";
import getColorTemperature from "../../data/SetColorTemperature";
import getColorHumidity from "../../data/SetColorHumidity";
import getColorLight from "../../data/SetColorLight";
import { AppContext } from "../../data/AppContext";
import ControlDevice from "../../components/ControlDevices";

const HomePage = (props) => {
  const { setCurrentPage } = useContext(AppContext);
  const temperature = props.dataSensor[props.dataSensor.length - 1].temperature;
  const humidity = props.dataSensor[props.dataSensor.length - 1].humidity;
  // const humidity = 30;
  // const light = 100;
  const light = props.dataSensor[props.dataSensor.length - 1].light;
  const { color: colorTem, backgroundColor: backgroundColorTem } =
    getColorTemperature(temperature);
  const { color: colorHum, backgroundColor: backgroundColorHum } =
    getColorHumidity(humidity);
  const { color: colorLight, backgroundColor: backgroundColorLight } =
    getColorLight(light);

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
              History
            </Link>
          </li>
        </ul>
      </div>
      <ul className="insights">
        <li>
          <FaTemperatureHalf
            style={{ color: colorTem, backgroundColor: backgroundColorTem }}
          />
          <span className="inf">
            <h3>Temperature</h3>
            <p>{temperature}°C</p>
          </span>
        </li>
        <li>
          <WiHumidity
            style={{ color: colorHum, backgroundColor: backgroundColorHum }}
          />
          <span className="inf">
            <h3>Humidity</h3>
            <p>{humidity}%</p>
          </span>
        </li>
        <li>
          <CiLight
            style={{ color: colorLight, backgroundColor: backgroundColorLight }}
          />
          <span className="inf">
            <h3>Light</h3>
            <p>{light} LUX</p>
          </span>
        </li>
      </ul>
      <div className="main-bottom">
        <LineChart data={props.dataSensor} />
        <ControlDevice data={props.dataHistory} />
      </div>
    </>
  );
};
export default HomePage;
