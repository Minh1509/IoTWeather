import React from "react";
import { ROUTER } from "../../routes/router";
import "./style.scss";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import LineChart from "../../data/LineChart";
import { FaFan } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaRegLightbulb } from "react-icons/fa";
import getColorTemperature from "../../data/SetColorTemperature";
import getColorHumidity from "../../data/SetColorHumidity";
import getColorLight from "../../data/SetColorLight";
import { AppContext } from "../../data/AppContext";

const HomePage = (props) => {
  const { setCurrentPage } = useContext(AppContext);
  const temperature =  props.dataSensor[props.dataSensor.length-1].temperature;
  const humidity= props.dataSensor[props.dataSensor.length-1].humidity;;
  const light =props.dataSensor[props.dataSensor.length-1].light;
  const {color:colorTem, backgroundColor:backgroundColorTem} = getColorTemperature(temperature);
  const {color:colorHum, backgroundColor:backgroundColorHum} = getColorHumidity(humidity);
  const {color:colorLight, backgroundColor:backgroundColorLight} = getColorLight(light);
  const [isFanOn, setFanIsOn] = useState(true);
  const [isLedOn, setLedIsOn] = useState(true);
  const [isConditionerOn, setConditionerIsOn] = useState(true);
  const handleToggle = (status) => {
    setFanIsOn(status);
  };
  const handleToggleLed = (status) => {
    setLedIsOn(status);
  };
  const handleToggleConditioner = (status) => {
    setConditionerIsOn(status);
  };
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
          <WiHumidity  style={{color: colorHum, backgroundColor: backgroundColorHum}}/>
          <span className="inf">
            <h3>Humidity</h3>
            <p>{humidity}%</p>
          </span>
        </li>
        <li>
          <CiLight style={{color: colorLight, backgroundColor: backgroundColorLight}}/>
          <span className="inf">
            <h3>Light</h3>
            <p>{light}LUX</p>
          </span>
        </li>
      </ul>
      <div className="main-bottom">
        <div className="chart">
          <LineChart data = {props.dataSensor}/>
        </div>
        <div className="device">
          <h3>Control Device</h3>
          <ul className="device-item">
            <li>
              <FaFan className={isFanOn ? "fan-icon-spin" : ""} />
              <span className="inf">
                <h4>Quạt</h4>
                <div className="active">
                  <button
                    className={`btn-on ${isFanOn ? "activate" : ""}`}
                    onClick={() => handleToggle(true)}
                  >
                    On
                  </button>
                  <button
                    className={`btn-off ${!isFanOn ? "notactivate" : ""}`}
                    onClick={() => handleToggle(false)}
                  >
                    Off
                  </button>
                </div>
              </span>
            </li>
            <li>
              <TbAirConditioning
                className={isConditionerOn ? "conditioner-on" : ""}
              />
              <span className="inf">
                <h4>Điều hòa</h4>
                <div className="active">
                  <button
                    className={`btn-on ${isConditionerOn ? "activate" : ""}`}
                    onClick={()=>handleToggleConditioner(true)}
                  >
                    On
                  </button>
                  <button
                    className={`btn-off ${
                      !isConditionerOn ? "notactivate" : ""
                    }`}
                    onClick={()=>handleToggleConditioner(false)}
                  >
                    Off
                  </button>
                </div>
              </span>
            </li>
            <li>
              <FaRegLightbulb className={isLedOn ? "blink" : ""} />
              <span className="inf">
                <h4>Đèn LED</h4>
                <div className="active">
                  <button
                    className={`btn-on ${isLedOn ? "activate" : ""}`}
                    onClick={() => handleToggleLed(true)}
                  >
                    On
                  </button>
                  <button
                    className={`btn-off ${!isLedOn ? "notactivate" : ""}`}
                    onClick={() => handleToggleLed(false)}
                  >
                    Off
                  </button>
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default HomePage;
